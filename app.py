from flask import Flask, jsonify, request
from getresult import eye_predict
# from fastapi import FastAPI
from flask_cors import CORS
import requests

app = Flask(__name__)

CORS(app)

@app.route('/result', methods=['GET'])
def res():
    size = request.args.get("size")
    calUnit = request.args.get("calUnit")
    result = jsonify({"output":round(eye_predict(size,calUnit)[0],3)})
    return result

if __name__ == '__main__':
    app.run(debug=True, port=5000)
