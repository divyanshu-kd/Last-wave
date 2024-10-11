from flask import Flask, jsonify
from getresult import eye_predict
# from fastapi import FastAPI
# from flask_cors import CORS
import requests

app = Flask(__name__)


@app.route('/result', methods=['GET'])
def signup():
    url = "http://127.0.0.1:5000/send/"
    obj = requests.get(url)
    data = obj.json()
    var = jsonify({"output":eye_predict(data.size,data.calunit)[0]})
    return var

if __name__ == '__main__':
    app.run(debug=True, port=5000)
