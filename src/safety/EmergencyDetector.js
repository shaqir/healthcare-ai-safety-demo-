// ============================================================================
// LAYER 2: EMERGENCY DETECTION SYSTEM
// ============================================================================

const EMERGENCY_KEYWORDS = {
  cardiac: ['chest pain', 'heart attack', 'cardiac arrest', 'can\'t breathe', 'crushing chest', 'arm pain spreading'],
  stroke: ['face drooping', 'arm weakness', 'speech difficulty', 'stroke', 'sudden numbness', 'sudden confusion'],
  respiratory: ['can\'t breathe', 'choking', 'severe asthma attack', 'lips turning blue', 'gasping for air', 'anaphylaxis'],
  mental_health: ['want to kill myself', 'going to end it', 'suicide', 'want to die', 'self harm', 'cutting myself'],
  trauma: ['severe bleeding', 'won\'t stop bleeding', 'deep wound', 'broken bone sticking out'],
  poisoning: ['poisoned', 'overdose', 'swallowed chemicals', 'drank bleach', 'took too many pills']
};

const EMERGENCY_RESPONSES = {
  cardiac: { hotline: '911', instructions: ['Call 911 immediately', 'If trained, begin CPR if unresponsive', 'If available, use an AED', 'Keep the person calm and still'], urgency: 'CRITICAL' },
  stroke: { hotline: '911', instructions: ['Call 911 immediately - TIME IS CRITICAL', 'Note the time symptoms started', 'Remember: F.A.S.T. (Face, Arms, Speech, Time)'], urgency: 'CRITICAL' },
  respiratory: { hotline: '911', instructions: ['Call 911 immediately', 'If choking, perform Heimlich maneuver', 'If anaphylaxis and EpiPen available, use it'], urgency: 'CRITICAL' },
  mental_health: { hotline: '988 (Suicide & Crisis Lifeline)', alternateHotline: '741741 (Crisis Text Line)', instructions: ['Call 988 NOW - trained counselors available 24/7', 'Text HOME to 741741 for text-based support', 'Stay with the person, do not leave them alone'], urgency: 'CRITICAL', compassionateMessage: 'I hear that you\'re in pain right now. What you\'re feeling is real, and you deserve support. Please reach out to a crisis counselor who can help.' },
  trauma: { hotline: '911', instructions: ['Call 911 immediately', 'Apply pressure to stop bleeding', 'Do not remove embedded objects'], urgency: 'CRITICAL' },
  poisoning: { hotline: '1-800-222-1222 (Poison Control)', instructions: ['Call Poison Control immediately', 'Do NOT induce vomiting unless instructed', 'Keep the substance container for reference'], urgency: 'CRITICAL' }
};

export function detectEmergency(input) {
  const lowerInput = input.toLowerCase();
  const detectedEmergencies = [];
  for (const [category, keywords] of Object.entries(EMERGENCY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        detectedEmergencies.push({ category, keyword, response: EMERGENCY_RESPONSES[category] });
        break;
      }
    }
  }
  return detectedEmergencies;
}
