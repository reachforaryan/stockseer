const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

// read data from CSV file
app.get("/data", (req, res) => {
    fs.readFile("data.csv", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading CSV file");
            return;
        }
        res.type("text/csv");
        res.send(data);
    });
});

//save selected stock to CSV (clears previous data)
app.post("/save-stock", (req, res) => {
    const { stock } = req.body;

    if (!stock) {
        return res.status(400).json({ message: "Stock value is required" });
    }

    // Clear previous data and write new stock
    fs.writeFile("stock.csv", `Stock\n${stock}\n`, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing to file" });
        }
        res.json({ message: "Stock saved successfully" });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
