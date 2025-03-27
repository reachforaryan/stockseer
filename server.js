import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
        res.json({ result: output.trim() });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
