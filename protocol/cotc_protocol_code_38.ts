interface EnhancedSecurityManager {
  // Multi-tenant authentication with security
  authenticateUser(token: string): Promise<UserContext>
  authorizeAction(user: UserContext, action: string, resource: string): Promise<boolean>
  
  // Service-to-service authentication with validator verification
  authenticateService(serviceToken: string): Promise<ServiceContext>
  authenticateValidator(validatorId: string, credentials: ValidatorCredentials): Promise<ValidationContext>
  
  // audit logging
  logSecurityEvent(event: SecurityEvent): Promise<void>
  logValidatorAccess(validatorId: string, operation: string): Promise<void>
  
  // NEW: Advanced security measures
  detectAnomalousAccess(userId: string): Promise<AnomalyDetection>
  enforceValidatorIsolation(validatorId: string): Promise<IsolationStatus>
  verifySupplyChainIntegrity(componentId: string): Promise<IntegrityVerification>
}

// Type definitions for Security Manager

// Authentication and authorization interfaces
interface UserContext {
  userId: string
  username: string
  roles: string[]
  permissions: string[]
  organizationId?: string
  sessionId: string
  authenticatedAt: Date
  expiresAt: Date
  metadata: Record<string, any>
}

interface ServiceContext {
  serviceId: string
  serviceName: string
  serviceType: 'validator' | 'orchestrator' | 'monitor' | 'external'
  permissions: string[]
  authenticatedAt: Date
  expiresAt: Date
  endpoint: string
  version: string
}

interface ValidatorCredentials {
  type: 'certificate' | 'token' | 'signature' | 'biometric'
  value: string
  signature?: string
  publicKey?: string
  metadata?: Record<string, any>
}

interface ValidationContext {
  validatorId: string
  validatorType: string
  authenticatedAt: Date
  capabilities: string[]
  trustLevel: number
  restrictions: string[]
  sessionId: string
  expiresAt: Date
}

// Security monitoring interfaces
interface SecurityEvent {
  eventId: string
  type: 'authentication' | 'authorization' | 'access' | 'anomaly' | 'breach' | 'violation'
  severity: 'info' | 'warning' | 'error' | 'critical'
  source: string
  userId?: string
  serviceId?: string
  action: string
  resource: string
  outcome: 'success' | 'failure' | 'blocked'
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  details: Record<string, any>
  correlationId?: string
}

interface AnomalyDetection {
  userId: string
  anomalyType: 'access_pattern' | 'location' | 'timing' | 'behavior' | 'volume'
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  description: string
  detectedAt: Date
  evidence: {
    normal_pattern: Record<string, any>
    observed_pattern: Record<string, any>
    deviation_score: number
  }
  recommendations: string[]
  status: 'new' | 'investigating' | 'confirmed' | 'false_positive'
}

// Isolation and integrity interfaces
interface IsolationStatus {
  validatorId: string
  isolationLevel: 'none' | 'network' | 'process' | 'container' | 'vm'
  isIsolated: boolean
  isolatedAt?: Date
  isolationReasons: string[]
  networkRestrictions: {
    allowedDomains: string[]
    blockedPorts: number[]
    firewallRules: string[]
  }
  resourceLimits: {
    maxMemory: number
    maxCpu: number
    maxDisk: number
    maxNetwork: number
  }
  monitoringEnabled: boolean
  complianceStatus: 'compliant' | 'non_compliant' | 'unknown'
}

interface IntegrityVerification {
  componentId: string
  verificationType: 'hash' | 'signature' | 'certificate' | 'attestation'
  isValid: boolean
  verifiedAt: Date
  verificationChain: {
    step: string
    verified: boolean
    evidence: string
    timestamp: Date
  }[]
  trustScore: number
  issues: string[]
  provenance: {
    source: string
    buildTime: Date
    buildEnvironment: Record<string, any>
    dependencies: {
      name: string
      version: string
      hash: string
      verified: boolean
    }[]
  }
  recommendations: string[]
}
