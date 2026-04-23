import unittest
from unittest.mock import patch, MagicMock
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from services.NavigationService import get_directions, report_missed_turn
from services.Personality import StormyPersonality

class TestNavigation(unittest.TestCase):
    @patch('services.NavigationService.axios.get')
    @patch('services.NavigationService.getCurrentLocation')
    def test_get_directions_success(self, mock_get_location, mock_axios_get):
        mock_get_location.return_value = {"coords": {"latitude": -33.9, "longitude": 18.4}}
        mock_axios_get.return_value = MagicMock(
            data={
                "routes": [{
                    "legs": [{
                        "steps": [{"html_instructions": "Go <b>straight</b>"}]
                    }]
                }]
            }
        )
        steps = get_directions("Cape Town")
        self.assertEqual(steps, ["Go straight"])

    def test_family_mode_swears(self):
        personality = StormyPersonality()
        personality.family_mode = True
        personality.anger_level = 3
        response = personality.get_angry_response("turn")
        self.assertNotIn("fuck", response.lower())
        self.assertIn("Whoops", response)

if __name__ == '__main__':
    unittest.main()
