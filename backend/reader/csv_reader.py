from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import csv
import time
import os
from werkzeug.utils import secure_filename
import json



ALLOWED_EXTENSIONS = {'csv'}


app = Flask(__name__)   
CORS(app, origins="http://localhost:3000")
def allowed_file(filename): #only csv files
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/v1/upload_file', methods=["POST"])

def upload_csv():
    if request.method == "POST":
        
        file = request.files.get('file')

        if file is None or file.filename == '' or not allowed_file(file.filename):
            return jsonify({'error': 'Wrong file type or name'}), 400
        
        file_name = secure_filename(file.filename)
        file_data = file.read().decode('utf-8')  # Read the file data as a string
        file_data = file_data.replace('\r','')
        lines = file_data.split('\n')
        transactions = []
        for i in range(1, len(lines) - 1):
            current_line = lines[i].split(",")
            # transactions.append({
            #     "title": current_line[2],
            #     "amount": float(current_line[3]),
            #     "category": current_line[4],
            #     "description": "Desc",
            #     "date": current_line[0],
            #     })
            print(len(current_line[4]))
            transactions.append({
                "title": current_line[2],
                "amount": float(current_line[3]),
                "category": current_line[4],
                "description": "Desc",
                "date": current_line[0],
                })


        print(f"Received and read file: {file_name}")
        print(len(transactions))
        
        return jsonify(transactions)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
