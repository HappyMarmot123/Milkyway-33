import requests
import json
import sys

def main():
    stream_url = "http://localhost:8888/api/v1/chat"
    print("\033[94m=== Milkyway-33 LLM CLI Chat (Full Info) ===\033[0m")
    print("Type 'exit' or 'quit' to stop.\n")

    while True:
        try:
            user_input = input("\033[92mYou: \033[0m")
            
            if user_input.lower() in ['exit', 'quit']:
                print("\nBye!")
                break
            
            if not user_input.strip():
                continue

            with requests.post(stream_url, json={"message": user_input}, stream=True) as response:
                response.raise_for_status()
                
                full_response = ""
                model_used = ""
                
                for line in response.iter_lines():
                    if not line:
                        continue
                    
                    try:
                        event = json.loads(line.decode('utf-8'))
                        status = event.get("status")
                        
                        if status == "thinking":
                            model_used = event.get("model", "")
                            print(f"\033[90m[{model_used}] 🧠 Thinking...\033[0m", end="", flush=True)
                        
                        elif status == "generating":
                            print(f"\r\033[90m[{model_used}] ✍️  Generating...\033[0m", end="", flush=True)
                        
                        elif status == "streaming":
                            if full_response == "":
                                print(f"\r\033[K\033[95mGemini ({model_used}):\033[0m ", end="", flush=True)
                            chunk = event.get("chunk", "")
                            full_response += chunk
                            print(chunk, end="", flush=True)
                        
                        elif status == "complete":
                            print("\n")
                            print("\033[93m" + "="*50 + "\033[0m")
                            print("\033[93m[Final Summary & Metadata]\033[0m")
                            
                            # 1. Thought Process
                            thought = event.get("thought")
                            if thought:
                                print(f"\033[90m[Thought Process]:\n{thought}\033[0m\n")
                            
                            # 2. Safety Ratings
                            safety = event.get("safety_ratings")
                            if safety:
                                print(f"\033[36m[Safety Ratings]:\033[0m")
                                for s in safety:
                                    prob = s.get('probability', 'UNKNOWN')
                                    color = "\033[92m" if prob == "NEGLIGIBLE" else "\033[91m"
                                    print(f"  - {s.get('category')}: {color}{prob}\033[0m")
                            
                            # 3. Finish Reason
                            reason = event.get("finish_reason")
                            print(f"\n\033[36m[Finish Reason]:\033[0m {reason}")
                            
                            # 4. Token Usage
                            usage = event.get("usage_metadata")
                            if usage:
                                print(f"\033[36m[Token Usage]:\033[0m")
                                print(f"  - Prompt: {usage.get('prompt_token_count')}")
                                print(f"  - Response: {usage.get('candidates_token_count')}")
                                if usage.get('thoughts_token_count'):
                                    print(f"  - Thinking: {usage.get('thoughts_token_count')}")
                                print(f"  - Total: {usage.get('total_token_count')}")
                            
                            print("\033[93m" + "="*50 + "\033[0m\n")
                        
                        elif status == "error":
                            print(f"\n\033[91m[Error]: {event.get('message')}\033[0m")
                    
                    except json.JSONDecodeError:
                        continue

        except KeyboardInterrupt:
            print("\nBye!")
            break
        except Exception as e:
            print(f"\n\033[91mError:\033[0m {e}\n")

if __name__ == "__main__":
    main()
