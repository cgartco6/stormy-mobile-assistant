import googlemaps
from config import GOOGLE_MAPS_API_KEY
from .personality import StormyPersonality   # shared instance

gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

# This function is called each time the user ignores a turn
def handle_missed_turn(personality: StormyPersonality):
    personality.record_missed_turn()
    if personality.anger_level > 0:
        return personality.get_angry_response("turn")
    else:
        return "Hey, you missed a turn. Want me to recalculate?"

def get_directions(origin, destination, personality=None):
    directions = gmaps.directions(origin, destination, mode="driving")
    if not directions:
        return "Could not find route, dummy."

    steps = directions[0]['legs'][0]['steps']
    instructions = [step['html_instructions'] for step in steps]

    # Reset anger when a new route is successfully followed? 
    # But we'll reset only when user says "start over" or after 3 good turns.
    # For simplicity, we just return steps.
    return instructions
