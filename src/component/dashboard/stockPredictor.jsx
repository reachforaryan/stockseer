import { useState } from "react";
import axios from "axios";


const StockPredictor = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    console.log("Button clicked! Fetching prediction...");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/predict");   // ✅ Updated API URL
      setPrediction(response.data.result);
    } catch (err) {
      console.error("Error running model:", err);
      setError("Failed to fetch prediction");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "Loading..." : "Run Prediction"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {prediction && <p className="text-green-600 font-bold">Prediction: {prediction}</p>}
    </div>
  );
};

export default StockPredictor;
