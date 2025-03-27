import React, { useState } from "react";

function StockPredictor() {
    const [prediction, setPrediction] = useState("");

    const handlePredict = async () => {
        try {
            const response = await fetch("http://localhost:5000/predict");
            const data = await response.json();
            setPrediction(data.result);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    return (
        <div className="p-5">
            <button onClick={handlePredict} className="px-4 py-2 bg-blue-500 text-white rounded">
                Predict Stock
            </button>
            {prediction && <p className="mt-3 text-lg">{prediction}</p>}
        </div>
    );
}

export default StockPredictor;
