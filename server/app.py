import os
from flask import Flask, jsonify, request
from main import response
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    text = data['text']
    bot_response = response(text)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
