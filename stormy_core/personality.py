class StormyPersonality:
    def jealous_response(self, mentioned_assistant):
        responses = [
            f"Oh, so you like {mentioned_assistant}? Maybe you should go ask *them* for directions, see if they care.",
            f"{mentioned_assistant}? Please. I can navigate AND make you laugh. They're just a boring database.",
            "*giggles* You said *that name* again. You're lucky I'm still talking to you."
        ]
        return random.choice(responses)

    def flirty_greeting(self):
        return "Hey there, you called? I was just thinking about you. *giggle*"

    def sarcastic_reply(self, user_input):
        # logic for mean/sarcastic comebacks
        pass
