import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import fs from "fs"; // You were missing this import
import path from "path";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' // Your React app's URL
  }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));        
// Route to run Python script
app.get("/predict", (req, res) => {
    const pythonProcess = spawn("python", ["./model/stock_predictor.py"]);

    let output = "";
    pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        console.log(`Process exited with code ${code}`);
        try {
            // Parse the Python script's output
            const result = JSON.parse(output.trim());
            
            // Write to file
            const filePath = path.join(process.cwd(), "public", "stock_prediction_output.json");
            fs.writeFileSync(filePath, JSON.stringify({ data: result }));
            
            // Send response
            res.json({ success: true, data: result });
        } catch (error) {
            console.error("Error processing prediction:", error);
            res.status(500).json({ error: "Error processing prediction" });
        }
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});