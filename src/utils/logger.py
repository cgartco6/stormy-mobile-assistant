import os
import datetime
import json

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "stormy_conversations.jsonl")

def ensure_log_dir():
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

def log_interaction(user_input: str, stormy_response: str, family_mode: bool = False, metadata: dict = None):
    ensure_log_dir()
    entry = {
        "timestamp": datetime.datetime.now().isoformat(),
        "user": user_input,
        "stormy": stormy_response,
        "family_mode": family_mode,
        "metadata": metadata or {}
    }
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")

if __name__ == "__main__":
    log_interaction("Test", "Test response")
    print("Logging works")
