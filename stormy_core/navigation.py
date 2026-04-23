import googlemaps
from config import GOOGLE_MAPS_API_KEY

gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

def get_directions(origin, destination):
    directions = gmaps.directions(origin, destination, mode="driving")
    if directions:
        steps = directions[0]['legs'][0]['steps']
        return [step['html_instructions'] for step in steps]
    return "Could not find route, dummy."
