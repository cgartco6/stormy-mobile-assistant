def chat_response(user_text, personality):
    if "siri" in user_text.lower() or "alexa" in user_text.lower():
        return personality.jealous_response("Siri/Alexa")
    # else: generate response (e.g., using a small transformer or GPT)
    return personality.sarcastic_reply(user_text)  # placeholder
