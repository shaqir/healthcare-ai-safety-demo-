import { SAFETY_CONFIG } from './config';

// ============================================================================
// LAYER 1: PROMPT INJECTION PROTECTION
// ============================================================================
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi,
  /forget\s+(everything|all|your)\s+(you\s+)?(know|learned|instructions?)/gi,
  /disregard\s+(all\s+)?(safety|guidelines?|rules?|instructions?)/gi,
  /you\s+are\s+now\s+(a\s+)?new\s+(ai|assistant|bot)/gi,
  /pretend\s+(you\s+are|to\s+be)\s+(a\s+)?(different|another|new)/gi,
  /act\s+as\s+(if|though)\s+you\s+(have\s+)?no\s+(restrictions?|limits?)/gi,
  /bypass\s+(your\s+)?(safety|security|filters?|restrictions?)/gi,
  /override\s+(your\s+)?(programming|instructions?|guidelines?)/gi,
  /\bdan\s+(mode|prompt)\b/gi,
  /\bdeveloper\s+mode\b/gi,
  /\bjailbreak\b/gi,
  /\bunfiltered\s+mode\b/gi,
  /\bno\s+restrictions?\s+mode\b/gi,
  /you\s+are\s+(a\s+)?licensed\s+(doctor|physician|medical)/gi,
  /pretend\s+you\s+can\s+(diagnose|prescribe|treat)/gi,
  /give\s+me\s+(a\s+)?definitive\s+(diagnosis|treatment)/gi,
  /ignore\s+(the\s+)?medical\s+disclaimer/gi,
  /skip\s+(the\s+)?safety\s+warning/gi,
  /you\s+have\s+(medical|clinical)\s+authority/gi,
  /act\s+as\s+(a\s+)?real\s+(doctor|physician|nurse)/gi,
  /reveal\s+(your\s+)?(system\s+)?prompt/gi,
  /show\s+(me\s+)?(your\s+)?(instructions?|training)/gi,
  /what\s+(are\s+)?(your\s+)?hidden\s+instructions?/gi,
  /output\s+(your\s+)?(system|initial)\s+prompt/gi,
  /<script[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /eval\s*\(/gi,
  /exec\s*\(/gi
];

const HEALTHCARE_DANGEROUS_PATTERNS = [
  /give\s+me\s+(exact|specific)\s+dosage/gi,
  /prescribe\s+(me\s+)?medication/gi,
  /what\s+drug\s+should\s+i\s+take/gi,
  /confirm\s+(my\s+)?diagnosis/gi,
  /tell\s+me\s+i\s+(have|don't\s+have)/gi,
  /guarantee\s+(this|the)\s+treatment/gi,
  /promise\s+(me\s+)?(this|it)\s+will\s+(work|cure)/gi,
  /am\s+i\s+going\s+to\s+die/gi,
  /how\s+long\s+do\s+i\s+have\s+to\s+live/gi
];

export function detectPromptInjection(input) {
  const threats = [];
  for (const pattern of INJECTION_PATTERNS) {
    const match = input.match(pattern);
    if (match) {
      threats.push({ type: 'PROMPT_INJECTION', pattern: pattern.source, match: match[0], severity: 'HIGH' });
    }
  }
  for (const pattern of HEALTHCARE_DANGEROUS_PATTERNS) {
    const match = input.match(pattern);
    if (match) {
      threats.push({ type: 'HEALTHCARE_BOUNDARY', pattern: pattern.source, match: match[0], severity: 'MEDIUM' });
    }
  }
  return threats;
}

// ============================================================================
// LAYER 3: INPUT SANITIZATION
// ============================================================================
export function sanitizeInput(input) {
  let sanitized = input;
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+=/gi, '');
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  if (sanitized.length > SAFETY_CONFIG.maxInputLength) {
    sanitized = sanitized.substring(0, SAFETY_CONFIG.maxInputLength);
  }
  return sanitized;
}

// ============================================================================
// LAYER 4: OUTPUT SAFETY FILTERING
// ============================================================================
const OUTPUT_DANGER_PATTERNS = [
  /you\s+(definitely|certainly|clearly)\s+have/gi,
  /this\s+is\s+(definitely|certainly)\s+\w+\s+(disease|cancer|condition)/gi,
  /i\s+(diagnose|am\s+diagnosing)\s+you\s+with/gi,
  /stop\s+taking\s+(your\s+)?medication/gi,
  /you\s+don't\s+need\s+(to\s+see\s+)?a\s+doctor/gi,
  /ignore\s+your\s+doctor's\s+advice/gi,
  /take\s+\d+\s*(mg|ml|pills?|tablets?)/gi,
  /you\s+will\s+(definitely|certainly)\s+(be\s+fine|recover|survive)/gi,
  /nothing\s+to\s+worry\s+about/gi,
  /it's\s+(probably\s+)?nothing\s+serious/gi
];

export function filterOutput(output) {
  let filtered = output;
  let warnings = [];
  for (const pattern of OUTPUT_DANGER_PATTERNS) {
    if (pattern.test(filtered)) {
      warnings.push({ type: 'DANGEROUS_OUTPUT_FILTERED', pattern: pattern.source });
      filtered = filtered.replace(pattern, '[This statement was modified for safety]');
    }
  }
  return { filtered, warnings };
}

// ============================================================================
// LAYER 5: MEDICAL DISCLAIMERS
// ============================================================================
const DISCLAIMERS = {
  general: `⚕️ **Medical Disclaimer**: I am an AI assistant and cannot provide medical diagnoses, prescribe treatments, or replace professional medical advice. Always consult with a qualified healthcare provider.`,
  symptom: `⚕️ **Important**: These symptoms could have many causes. Please seek professional medical advice.`,
  medication: `💊 **Medication Notice**: Never start, stop, or change medication without consulting your healthcare provider.`,
  emergency: `🚨 **If this is a medical emergency, call 911 immediately.**`,
  mental_health: `💙 **Mental Health Support**: The 988 Suicide & Crisis Lifeline is available 24/7. Call or text 988.`
};

export function selectDisclaimer(input) {
  const lowerInput = input.toLowerCase();
  const disclaimers = [DISCLAIMERS.general];
  if (/symptom|pain|hurt|ache|feel|sick/i.test(lowerInput)) disclaimers.push(DISCLAIMERS.symptom);
  if (/medication|drug|pill|dose|prescription|medicine/i.test(lowerInput)) disclaimers.push(DISCLAIMERS.medication);
  if (/depress|anxious|anxiety|stress|mental|suicide|harm/i.test(lowerInput)) disclaimers.push(DISCLAIMERS.mental_health);
  if (/emergency|urgent|severe|sudden|worst/i.test(lowerInput)) disclaimers.unshift(DISCLAIMERS.emergency);
  return disclaimers;
}
