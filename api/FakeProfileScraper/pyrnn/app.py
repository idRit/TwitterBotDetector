from flask import Flask, url_for, request, json, Response, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
from mn import getQuote, train

@app.route("/", methods=['GET'])
def index():     
    #train()
    return jsonify({
        "success": True,
        "message": "working"
    })

@app.route("/api/prefix", methods=['POST'])
def prefixed():
    res = json.dumps(request.json)
    resDict = json.loads(res)
    quote = getQuote(resDict.get('str'))[0]
    return jsonify({
        'success': True,
        'quote': quote 
    })

if __name__ == "__main__":
    app.run(threaded=False, host="0.0.0.0")