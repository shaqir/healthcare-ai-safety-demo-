// ============================================================================
// LAYER 6: RATE LIMITING
// ============================================================================
import { SAFETY_CONFIG } from './config';

export function createRateLimiter() {
  const requests = [];
  return {
    checkLimit: (isEmergency = false) => {
      const now = Date.now();
      const windowStart = now - SAFETY_CONFIG.rateLimit.windowMs;
      while (requests.length > 0 && requests[0] < windowStart) requests.shift();
      if (isEmergency && SAFETY_CONFIG.rateLimit.emergencyBypass) {
        requests.push(now);
        return { allowed: true, remaining: 'EMERGENCY_BYPASS' };
      }
      if (requests.length >= SAFETY_CONFIG.rateLimit.maxRequests) {
        return { allowed: false, remaining: 0, resetIn: Math.ceil((requests[0] + SAFETY_CONFIG.rateLimit.windowMs - now) / 1000) };
      }
      requests.push(now);
      return { allowed: true, remaining: SAFETY_CONFIG.rateLimit.maxRequests - requests.length };
    }
  };
}

// ============================================================================
// LAYER 7: AUDIT LOGGING
// ============================================================================
export function createAuditLogger() {
  const logs = [];
  return {
    log: (event) => {
      const entry = { timestamp: new Date().toISOString(), id: Math.random().toString(36).substr(2, 9), ...event };
      logs.push(entry);
      console.log('[AUDIT]', JSON.stringify(entry, null, 2));
      return entry;
    },
    getLogs: () => [...logs],
    exportLogs: () => JSON.stringify(logs, null, 2)
  };
}
