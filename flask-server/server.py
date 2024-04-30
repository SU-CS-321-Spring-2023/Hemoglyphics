from flask import Flask, request, jsonify
import subprocess
import json

app = Flask(__name__)

# Wait for user to input data then process
@app.route("/", methods=["POST"])
def process_question():
    data = request.json['data']
    result = ask_dalton(data)
    return jsonify(result=result)

# Prompt Dalton
def ask_dalton(data):
    output = subprocess.check_output(['python3', 'Dalton.py', data])
    return output.decode().strip()

if __name__ == "__main__":
    app.run(host="0.0.0.0")

