import speech_recognition as sr
import pyttsx3
import random

class SpeechEngine:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.tts_engine = pyttsx3.init()
        self.laughs = ["*giggles*", "*laughs*", "*chuckles*"]

    def listen(self):
        with sr.Microphone() as source:
            audio = self.recognizer.listen(source)
            return self.recognizer.recognize_google(audio)

    def speak(self, text, add_laugh=False):
        if add_laugh and random.random() > 0.5:
            text += " " + random.choice(self.laughs)
        self.tts_engine.say(text)
        self.tts_engine.runAndWait()
