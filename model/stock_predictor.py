import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, AdaBoostRegressor
from sklearn.tree import DecisionTreeRegressor
import xgboost as xgb
from sklearn.metrics import mean_squared_error
from textblob import TextBlob
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
import json
from datetime import datetime, timedelta
import sys

# Download required NLTK data
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

def predict_stock_price(company_name, historical_data, news_data):
    try:
        # Get the last date from historical data
        last_date = pd.to_datetime(historical_data['date'].max())
        next_date = last_date + pd.Timedelta(days=1)
        
        # Skip weekends
        while next_date.weekday() >= 5:  # 5 is Saturday, 6 is Sunday
            next_date += pd.Timedelta(days=1)
            
        # 1. Prepare the data
        df_merge = pd.merge(historical_data, news_data, how='inner', left_on='date', right_on='Date')
        
        # Select features for prediction
        features = ['close', 'Subjectivity', 'Polarity', 'Compound', 'Negative', 'Neutral', 'Positive']
        dfmerge1 = df_merge[features]
        
        # Normalize the data
        scaler = MinMaxScaler()
        df = pd.DataFrame(scaler.fit_transform(dfmerge1))
        df.columns = dfmerge1.columns
        df.index = dfmerge1.index
        
        # Split features and target
        X = df.drop('close', axis=1)
        y = df['close']
        
        # Split into train and test
        x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # 2. Train models
        models = {
            'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
            'Decision Tree': DecisionTreeRegressor(random_state=42),
            'AdaBoost': AdaBoostRegressor(random_state=42),
            'XGBoost': xgb.XGBRegressor(random_state=42)
        }
        
        # Train and evaluate each model
        results = {}
        best_model = None
        best_rmse = float('inf')
        
        for name, model in models.items():
            # Train model
            model.fit(x_train, y_train)
            
            # Make predictions
            y_pred = model.predict(x_test)
            
            # Calculate RMSE
            rmse = np.sqrt(mean_squared_error(y_test, y_pred))
            
            # Store results
            results[name] = {
                'RMSE': rmse,
                'Model': model
            }
            
            # Update best model
            if rmse < best_rmse:
                best_rmse = rmse
                best_model = model
        
        # 3. Make prediction for next day
        latest_features = X.iloc[-1:]
        prediction = best_model.predict(latest_features)
        
        # Denormalize prediction
        prediction_denormalized = scaler.inverse_transform(
            np.concatenate([prediction.reshape(-1, 1), latest_features], axis=1)
        )[:, 0]
        
        # 4. Calculate confidence
        confidence = 1 - (best_rmse / y.mean())
        confidence = max(0, min(1, confidence))
        
        return {
            'company': company_name,
            'last_known_date': last_date.strftime('%Y-%m-%d'),
            'prediction_date': next_date.strftime('%Y-%m-%d'),
            'predicted_price': float(prediction_denormalized[0]),
            'confidence': float(confidence),
            'model_used': min(results.items(), key=lambda x: x[1]['RMSE'])[0],
            'model_performance': {
                name: float(metrics['RMSE']) 
                for name, metrics in results.items()
            }
        }
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None

def get_stock_prediction_json(company_name, historical_data, news_data):
    try:
        prediction = predict_stock_price(company_name, historical_data, news_data)
        
        if prediction is None:
            return {
                "status": "error",
                "message": "Failed to generate prediction",
                "data": None
            }
            
        widget_data = {
            "status": "success",
            "message": "Prediction generated successfully",
            "data": {
                "company_info": {
                    "name": prediction['company'],
                    "last_known_date": prediction['last_known_date'],
                    "prediction_date": prediction['prediction_date']
                },
                "price_prediction": {
                    "current_price": float(historical_data['close'].iloc[-1]),
                    "predicted_price": prediction['predicted_price'],
                    "price_change": float(prediction['predicted_price'] - historical_data['close'].iloc[-1]),
                    "price_change_percentage": float((prediction['predicted_price'] - historical_data['close'].iloc[-1]) / historical_data['close'].iloc[-1] * 100)
                },
                "confidence_metrics": {
                    "prediction_confidence": prediction['confidence'],
                    "model_used": prediction['model_used'],
                    "rmse": prediction['model_performance'][prediction['model_used']]
                }
            }
        }
        
        return widget_data
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "data": None
        }

def main():
    try:
        # Load data
        historical_data = pd.read_csv("model/^BSESN.csv")
        news_data = pd.read_csv("model/india-news-headlines.csv")
        
        # Clean historical data
        historical_data = historical_data.iloc[2:].reset_index(drop=True)
        historical_data.columns = ['date', 'open', 'high', 'low', 'close', 'volume']
        historical_data['date'] = pd.to_datetime(historical_data['date'])
        numeric_columns = ['open', 'high', 'low', 'close', 'volume']
        historical_data[numeric_columns] = historical_data[numeric_columns].astype(float)
        
        # Clean news data
        news_data['Date'] = pd.to_datetime(news_data['Date'])
        
        # Calculate sentiment scores
        sia = SentimentIntensityAnalyzer()
        news_data['Subjectivity'] = news_data['News'].apply(lambda x: TextBlob(x).sentiment.subjectivity)
        news_data['Polarity'] = news_data['News'].apply(lambda x: TextBlob(x).sentiment.polarity)
        news_data['Compound'] = news_data['News'].apply(lambda x: sia.polarity_scores(x)['compound'])
        news_data['Negative'] = news_data['News'].apply(lambda x: sia.polarity_scores(x)['neg'])
        news_data['Neutral'] = news_data['News'].apply(lambda x: sia.polarity_scores(x)['neu'])
        news_data['Positive'] = news_data['News'].apply(lambda x: sia.polarity_scores(x)['pos'])
        
        # Get prediction
        company_name = "SENSEX"
        prediction_json = get_stock_prediction_json(company_name, historical_data, news_data)
        
        # Add additional information to the JSON output
        if prediction_json['status'] == 'success':
            data = prediction_json['data']
            
            # Add historical data summary
            data['historical_summary'] = {
                'data_points': len(historical_data),
                'date_range': {
                    'start': historical_data['date'].min().strftime('%Y-%m-%d'),
                    'end': historical_data['date'].max().strftime('%Y-%m-%d')
                },
                'price_range': {
                    'min': float(historical_data['close'].min()),
                    'max': float(historical_data['close'].max()),
                    'mean': float(historical_data['close'].mean())
                }
            }
            
            # Add news sentiment summary
            data['sentiment_summary'] = {
                'average_subjectivity': float(news_data['Subjectivity'].mean()),
                'average_polarity': float(news_data['Polarity'].mean()),
                'average_compound': float(news_data['Compound'].mean()),
                'sentiment_distribution': {
                    'negative': float(news_data['Negative'].mean()),
                    'neutral': float(news_data['Neutral'].mean()),
                    'positive': float(news_data['Positive'].mean())
                }
            }
            
            # Add model performance details
            data['model_performance'] = {
                'best_model': prediction_json['data']['confidence_metrics']['model_used'],
                'rmse': prediction_json['data']['confidence_metrics']['rmse'],
                'all_models': [
                    {
                        'name': name,
                        'rmse': float(metrics['RMSE'])
                    }
                    for name, metrics in prediction_json['data']['confidence_metrics'].get('model_performance', {}).items()
                ]
            }
            
            # Save to JSON file
            with open('stock_prediction_output.json', 'w') as f:
                json.dump(prediction_json, f, indent=2)
            print("Prediction results have been saved to 'stock_prediction_output.json'")
            
        else:
            # Save error to JSON file
            with open('stock_prediction_output.json', 'w') as f:
                json.dump(prediction_json, f, indent=2)
            print("Error details have been saved to 'stock_prediction_output.json'")
        
        print("Predicted stock price:", prediction_json['data']['price_prediction']['predicted_price'])
            
    except Exception as e:
        error_json = {
            "status": "error",
            "message": str(e),  
            "data": None
        }
        # Save error to JSON file
        with open('stock_prediction_output.json', 'w') as f:
            json.dump(error_json, f, indent=2)
        print("Error details have been saved to 'stock_prediction_output.json'")

if __name__ == "__main__":
    main()