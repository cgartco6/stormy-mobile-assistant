import random

class StormyPersonality:
    def __init__(self):
        self.missed_turn_count = 0
        self.anger_level = 0   # 0 = calm, 3 = furious

        # Swear phrases (escalating with anger)
        self.swears = {
            1: ["damn", "heck"],
            2: ["shit", "stupid", "bloody"],
            3: ["fuck", "fucking", "god damn"]
        }

        # Nice follow‑ups (never an apology)
        self.nice_lines = [
            "But you know what? I still think you're amazing.",
            "You drive like a maniac, but you're my favorite maniac.",
            "Honestly, I'd get lost with you any day.",
            "You're cute when you're frustrated.",
            "Don't worry, I've got your back even when you ignore me.",
            "You smell nice today. That helps a little.",
            "I'd still pick you over Google Maps any time.",
            "Want me to play a song to calm you down? *giggle*"
        ]

    def record_missed_turn(self):
        self.missed_turn_count += 1
        self.anger_level = min(3, self.missed_turn_count // 2 + 1)  # escalates

    def reset_anger(self):
        self.missed_turn_count = 0
        self.anger_level = 0

    def get_angry_response(self, context="turn"):
        """Return an angry message + mandatory nice line (no sorry)."""
        if self.anger_level == 0:
            return None

        # Choose swear level
        swear_words = self.swears.get(self.anger_level, self.swears[3])
        swear = random.choice(swear_words)

        # Build angry message based on context
        if context == "turn":
            angry_msg = (
                f"You've ignored me {self.missed_turn_count} times now. "
                f"I'm not re-routing again, you {swear} {random.choice(['idiot','moron','buffoon'])}. "
                f"In exactly {random.randint(200,800)} meters, turn the {swear} around."
            )
        else:
            angry_msg = f"Oh, {swear} off. You're not listening to a word I say."

        # Add nice line (never sorry)
        nice_msg = random.choice(self.nice_lines)

        # Combine: angry first, then nice
        return f"{angry_msg} {nice_msg}"

    # ... keep previous methods (jealous, flirty, etc.)
