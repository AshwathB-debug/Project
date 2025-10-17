from llama_cpp import Llama


class LlamaGGUF:
    
    def config(self):
        llm = Llama(
            model_path = "C:/Users/ashwa/.cache/huggingface/hub/llamaQ4/llama-3-8b-instruct.Q4_K_M.gguf",
            n_threads = 6,
            verbose = False
        )
        # print(response["choices"][0]["text"])
        return llm


    def listOfExitWords(self, word):
        words = ["exit", "quit", "goodbye", "bye", "cya", "see ya"]
        return word in words
    
    
    def llama(self, user_input):
        
        try:
            prompt = f"This is a friendly chatbot answering customers questions."

            # Generate response
            llm = self.config()
            
            response = llm(
                prompt + "\n" + user_input, 
                max_tokens = 150, 
                temperature = 0.2
            )
            
            reply = response["choices"][0]["text"]
            return reply

        except Exception as e:
            print(f"An error occurred {e}")
            return None
        

if __name__ == "__main__":
    
    model = LlamaGGUF()
    while True:
        
        user_input = input("You: ")
        reply = model.llama(user_input)
        if model.listOfExitWords(user_input.lower()):
            print("Bot:", reply)
            break
        print("Bot:", reply)


    
    
# import google.generativeai as genai
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