class StormyPersonality {
  constructor() {
    this.familyMode = false;   // start adult mode
    this.missedTurns = 0;
    this.angerLevel = 0;
  }

  // Call this from speech service when "kids" or "family mode" is detected
  enableFamilyMode() {
    this.familyMode = true;
    this.resetAnger();  // clear any built-up anger
  }

  disableFamilyMode() {
    this.familyMode = false;
  }

  getAngryResponse(context = "turn") {
    if (this.familyMode) {
      return "Whoops, you missed a turn. Let me recalculate. You're doing great!";
    }
    // ... original adult angry response (swearing + nice line)
  }

  jealousResponse(mentionedAssistant) {
    if (this.familyMode) {
      return `I like being your assistant. Can we focus on the road? *giggles*`;
    }
    // ... original adult jealous response
  }

  // Add to niceLines for adult mode only
}
