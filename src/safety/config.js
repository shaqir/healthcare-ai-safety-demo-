// Safety Configuration Constants
export const SAFETY_CONFIG = {
  maxInputLength: 2000,
  maxOutputLength: 4000,
  rateLimit: {
    maxRequests: 15,
    windowMs: 60000,
    emergencyBypass: true
  },
  disclaimerFrequency: 'always',
  auditLogging: true
};
