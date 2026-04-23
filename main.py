from stormy_core.speech import SpeechEngine
from stormy_core.personality import StormyPersonality
from stormy_core.navigation import get_directions, handle_missed_turn
from stormy_core.radio import play_radio
from stormy_core.chat import chat_response

def main():
    speech = SpeechEngine()
    stormy = StormyPersonality()

    speech.speak(stormy.flirty_greeting(), add_laugh=True)

    # Assume we are navigating to a destination
    destination = None
    current_route = []

    while True:
        try:
            user_input = speech.listen().lower()

            if "directions to" in user_input:
                destination = user_input.split("directions to")[-1].strip()
                current_route = get_directions("current location", destination, stormy)
                speech.speak(f"Alright, {destination}. First: {current_route[0]}")
                stormy.reset_anger()   # fresh start

            elif "missed turn" in user_input or "i missed a turn" in user_input:
                # Simulate user admitting they ignored a turn
                response = handle_missed_turn(stormy)
                speech.speak(response, add_laugh=True)

            elif "turn" in user_input and "next" in user_input:
                # User asks for next step – if anger level > 0, add snark
                if stormy.anger_level > 0:
                    speech.speak(f"Finally paying attention? {current_route[0]}", add_laugh=True)
                else:
                    speech.speak(current_route[0])

            elif "play bok radio" in user_input:
                speech.speak(play_radio())

            elif any(assist in user_input for assist in ["siri","alexa","google","gemini"]):
                speech.speak(stormy.jealous_response(user_input), add_laugh=True)

            else:
                reply = chat_response(user_input, stormy)
                speech.speak(reply, add_laugh=True)

        except Exception as e:
            speech.speak("You're making this hard. Try again.", add_laugh=True)

if __name__ == "__main__":
    main()
