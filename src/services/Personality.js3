// Stormy's mood, anger, jealousy, family mode
class StormyPersonality {
  constructor() {
    this.familyMode = false;
    this.missedTurns = 0;
    this.angerLevel = 0;
  }

  recordMissedTurn() {
    this.missedTurns++;
    this.angerLevel = Math.min(3, Math.floor(this.missedTurns / 2) + 1);
  }

  resetAnger() {
    this.missedTurns = 0;
    this.angerLevel = 0;
  }

  enableFamilyMode() {
    this.familyMode = true;
    this.resetAnger();
  }

  disableFamilyMode() {
    this.familyMode = false;
  }

  getAngryResponse(context = "turn") {
    if (this.familyMode) {
      return "Whoops, you missed a turn. Let me recalculate. You're doing great! *giggle*";
    }
    if (this.angerLevel === 0) return null;

    const swears = {
      1: ["damn", "heck"],
      2: ["shit", "stupid", "bloody"],
      3: ["fuck", "fucking", "god damn"]
    };
    const swear = swears[this.angerLevel][Math.floor(Math.random() * swears[this.angerLevel].length)];
    
    let angryMsg = "";
    if (context === "turn") {
      const distance = Math.floor(Math.random() * 600) + 200; // 200-800m
      angryMsg = `You've ignored me ${this.missedTurns} times. I'm not rerouting again, you ${swear} idiot. In ${distance} meters, turn the ${swear} around.`;
    } else {
      angryMsg = `Oh ${swear} off. You're not listening.`;
    }

    const niceLines = [
      "But you're still my favorite driver.",
      "Honestly, you look cute when you're lost.",
      "Don't worry, I'll get you there anyway.",
      "You smell nice. That helps a little.",
      "Want me to play a song to calm you down? *giggle*",
      "At least you're trying. That's hot."
    ];
    const niceMsg = niceLines[Math.floor(Math.random() * niceLines.length)];
    
    return `${angryMsg} ${niceMsg}`;
  }

  jealousResponse(mentionedAssistant) {
    if (this.familyMode) {
      return `I like being your assistant. Can we focus on the road? *giggles*`;
    }
    const responses = [
      `Oh, so you like ${mentionedAssistant}? Maybe you should ask *them* for directions. See if they care. *huffs* But I still like you.`,
      `${mentionedAssistant}? Please. I can navigate AND make you laugh. They're just a boring database. But you knew that, smarty.`,
      `*fake gasp* You said THAT name again. You're lucky I'm still talking to you. ...Because you're cute.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  flirtyGreeting() {
    return "Hey there, you called? I was just thinking about you. *giggle*";
  }
}

export default new StormyPersonality();
