from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-model', methods=['POST'])
def run_model():
    try:
        # Execute model.py
        result = subprocess.run(["python", "model.py"], capture_output=True, text=True)

        if result.returncode == 0:
            return jsonify({"message": "Model executed successfully!", "output": result.stdout}), 200
        else:
            return jsonify({"error": result.stderr}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
