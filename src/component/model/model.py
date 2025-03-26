import numpy as np
import pandas as pd
import yfinance as yf
import ta
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
from xgboost import XGBRegressor
import time

with open("src\component\model\stock.csv", "r") as file:
    lines = file.readlines()  
    stock_name = lines[1].strip() if len(lines) > 1 else None 




# Get historical data
ticker = stock_name
full_data = yf.Ticker(ticker).history(period="max")

# Function to prepare data up to a specified date
def preprocess_data(data, cutoff_date):
    """Filter data up to cutoff_date and recompute features"""
    # Ensure cutoff_date is timezone-aware
    if cutoff_date.tzinfo is None:
        cutoff_date = cutoff_date.tz_localize(data.index.tz)

    filtered_data = data[data.index < cutoff_date].copy()

    # Technical Indicators (recomputed on filtered data)
    filtered_data["MA_10"] = filtered_data["Close"].rolling(10).mean()
    filtered_data["MA_50"] = filtered_data["Close"].rolling(50).mean()
    filtered_data["Volatility"] = filtered_data["Close"].rolling(20).std()
    filtered_data["RSI"] = ta.momentum.RSIIndicator(filtered_data["Close"], window=14).rsi()

    # Lag Features (recomputed on filtered data)
    for lag in range(1, 6):
        filtered_data[f'Close_lag_{lag}'] = filtered_data['Close'].shift(lag)

    # Target (next day's close)
    filtered_data["Target"] = filtered_data["Close"].shift(-1)

    # Drop rows with NaN in features (keep rows with NaN in Target)
    required_features = ["MA_10", "MA_50", "Volatility", "RSI"] + [f'Close_lag_{lag}' for lag in range(1, 6)]
    filtered_data = filtered_data.dropna(subset=required_features)

    return filtered_data
 
# Function to train model on filtered data
def train_model(filtered_data):
    """Train model using walk-forward validation on filtered data"""
    predictors = ["Open", "High", "Low", "Volume", "MA_10", "MA_50",
                  "Volatility", "RSI"] + [f'Close_lag_{lag}' for lag in range(1, 6)]
    model = XGBRegressor(n_estimators=200, learning_rate=0.05, tree_method="hist")
    scaler = StandardScaler()
    window_size = 250
    test_size = 1

    total_steps = len(filtered_data) - window_size - test_size  # Total rows to process
    start_time = time.time()

    for t in range(window_size, len(filtered_data) - test_size):
        train = filtered_data.iloc[t-window_size:t]
        test_features = filtered_data.iloc[[t]]

        # Scale features
        scaler.fit(train[predictors])
        train_X = scaler.transform(train[predictors])
        test_X = scaler.transform(test_features[predictors])

        # Periodic training
        if t % 10 == 0:
            model.fit(train_X, train["Target"])

        # Progress tracking every 200 rows
        current_step = t - window_size
        if current_step % 200 == 0:
            progress_percent = (current_step / total_steps) * 100
            print(f"Completed {current_step} rows ({progress_percent:.1f}%)")

    print(f"\nTraining completed in {time.time() - start_time:.2f} seconds.")
    return model, scaler

# Function to predict for a specific date
def predict_for_date(target_date):
    """Predict closing price for a user-specified date"""
    # Step 1: Filter data up to the day before the target date
    cutoff_date = pd.to_datetime(target_date)

    # Ensure cutoff_date is timezone-aware
    if cutoff_date.tzinfo is None:
        cutoff_date = cutoff_date.tz_localize(full_data.index.tz)

    filtered_data = preprocess_data(full_data, cutoff_date)

    if len(filtered_data) == 0:
        raise ValueError("No data available before the specified date.")

    # Step 2: Train model on filtered data
    model, scaler = train_model(filtered_data)

    # Step 3: Prepare features for prediction
    # Get the latest available data (day before target_date)
    latest_day = filtered_data.index[-1]
    latest = filtered_data.loc[latest_day].copy()

    # Update features using filtered_data only
    latest["MA_10"] = filtered_data["Close"].rolling(10).mean().iloc[-1]
    latest["MA_50"] = filtered_data["Close"].rolling(50).mean().iloc[-1]
    latest["Volatility"] = filtered_data["Close"].rolling(20).std().iloc[-1]
    latest["RSI"] = ta.momentum.RSIIndicator(filtered_data["Close"], window=14).rsi().iloc[-1]

    # Update lag features
    for lag in range(1, 6):
        latest[f'Close_lag_{lag}'] = filtered_data['Close'].iloc[-lag-1]

    # Predict
    predictors = ["Open", "High", "Low", "Volume", "MA_10", "MA_50",
                  "Volatility", "RSI"] + [f'Close_lag_{lag}' for lag in range(1, 6)]
    today_features = latest[predictors].values.reshape(1, -1)
    scaled_features = scaler.transform(today_features)
    prediction = model.predict(scaled_features)[0]

    print(f"\nPredicted Close for {target_date}: {prediction:.2f}")
    print(f"Latest training data date: {latest_day.strftime('%Y-%m-%d')}")

# User input and execution
target_date = input("Enter date to predict (YYYY-MM-DD): ")
predict_for_date(target_date)