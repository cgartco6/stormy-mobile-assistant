import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
BOK_RADIO_URL = os.getenv("BOK_RADIO_STREAM_URL")
WAKE_WORD = "hey stormy"
