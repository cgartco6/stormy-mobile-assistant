
---

## 3. `utils/logger.py`

```python
"""
Stormy's conversation logger – writes all interactions to a local file.
Useful for debugging personality responses.
"""

import os
import datetime
import json

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "stormy_conversations.jsonl")

def ensure_log_dir():
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

def log_interaction(user_input: str, stormy_response: str, family_mode: bool = False, metadata: dict = None):
    """Log a single exchange with timestamp."""
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

def read_recent_logs(lines: int = 50):
    """Return last N lines of log for debugging."""
    if not os.path.exists(LOG_FILE):
        return []
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f.readlines()[-lines:]]

if __name__ == "__main__":
    # Test logger
    log_interaction("Test user", "Test stormy response", family_mode=False)
    print("Logged successfully. Last 5 entries:")
    for entry in read_recent_logs(5):
        print(entry)
