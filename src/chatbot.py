from model import GeminiAPI
from dotenv import load_dotenv
from flask import Flask as f, request as r, jsonify as j
from flask_cors import CORS
import os


load_dotenv()
API_KEY = os.getenv("API_KEY")


# Python decorator to fetch output from Gemini
app = f(__name__)
CORS(app)
@app.route('/chat', methods = ['POST'])
def callGemini():
    
    ai = GeminiAPI()
    data = r.get_json()
    userMessage = data.get("message")
    answer = ai.genAiModel(userMessage, API_KEY)
    return j({"reply": answer}) 
    # return answer
    
    
if __name__ == "__main__":

    app.run(debug = True)
    # inp = input("You: ")
    # print("Kolabot: ", callGemini(inp))