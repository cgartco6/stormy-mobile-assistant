import pygame
from config import BOK_RADIO_URL

pygame.mixer.init()
pygame.mixer.music.load(BOK_RADIO_URL)

def play_radio():
    pygame.mixer.music.play()
    return "Bok Radio is now playing. Try not to sing too badly."

def stop_radio():
    pygame.mixer.music.stop()
