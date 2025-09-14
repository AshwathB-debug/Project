# import google.generativeai as genai
from transformers import pipeline


def listOfExitWords(word):
    words = ["exit", "quit", "goodbye", "bye"]
    return word in words


chatbot = pipeline("text-generation", model = "EleutherAI/gpt-neo-1.3B")

chat_history = ""

while True:
    # Keep prompt simple to avoid repetition
    prompt = f"The following is a helpful assistant answering questions politely.\nBot:"

    # Generate response
    response = chatbot(
        prompt,
        max_new_tokens = 100,
        do_sample = True,
        temperature = 0.8,
        top_p = 0.9,
        truncation = True
    )
    
    
    user_input = input("You: ")
    if listOfExitWords(user_input.lower()):
        reply = response[0]["generated_text"].split("Bot:")[-1].strip()
        print("Bot:", reply)
        break

    reply = response[0]["generated_text"].split("Bot:")[-1].strip()
    print("Bot:", reply)

    # Update history (optional, keep small to avoid repetition loops)
    chat_history = f"{chat_history[-500:]}\nBot: {reply}"



    
    

# class GeminiAPI:
    
#     # Join words in the sentence from the generated output
#     def joinWordsInOutput(self, output):
    
#         arr = []
#         for word in output:
#             arr.append(word.text)
#         response = " ".join(arr)
#         return response


#     # Set up the model
#     def generationConfig(self):
        
#         generation_config = {
#             "temperature": 0.2,
#             "top_p": 0.95,
#             "top_k": 0,
#             "max_output_tokens": 8192
#         }
#         return generation_config


#     # Sets the settings to block explicit content
#     def safetySettings(self):
        
#         safety_settings = [
#             {
#                 "category": "HARM_CATEGORY_HARASSMENT",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },

#             {
#                 "category": "HARM_CATEGORY_HATE_SPEECH",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },

#             {
#                 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },

#             {
#                 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             }
#         ]
#         return safety_settings


#     def genAiModel(self, chat, apiKey):
        
#         try:
            
#             genai.configure(api_key=apiKey)
#             model = genai.GenerativeModel(model_name="gemini-1.5-flash-latest", generation_config = self.generationConfig(),
#                                         safety_settings = self.safetySettings())
#             convo = model.start_chat(history = [])
#             output = convo.send_message(chat, stream = True)
#             return self.joinWordsInOutput(output)  

#         except Exception as e:
#             print(f"An error occurred {e}")
#             return None