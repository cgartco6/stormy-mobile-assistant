from stormy_core.speech import SpeechEngine
from stormy_core.personality import StormyPersonality
from stormy_core.navigation import get_directions
from stormy_core.radio import play_radio
from stormy_core.chat import chat_response

def main():
    speech = SpeechEngine()
    stormy = StormyPersonality()

    speech.speak(stormy.flirty_greeting(), add_laugh=True)

    while True:
        try:
            user_input = speech.listen()
            if "directions to" in user_input:
                dest = user_input.split("directions to")[-1]
                steps = get_directions("current location", dest)
                speech.speak("Here are your stupid directions: " + str(steps))
            elif "play bok radio" in user_input:
                speech.speak(play_radio())
            elif any(assist in user_input.lower() for assist in ["siri","alexa","google"]):
                speech.speak(stormy.jealous_response(user_input))
            else:
                reply = chat_response(user_input, stormy)
                speech.speak(reply, add_laugh=True)
        except Exception as e:
            speech.speak("You're making this hard. Try again.", add_laugh=True)

if __name__ == "__main__":
    main()
