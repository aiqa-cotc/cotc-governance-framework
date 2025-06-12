// 
// 🔙 Return to main document: [COTC Protocol Documentation](./cotc-protocol.md)
// 📍 This file contains: Security Interfaces for COTC Protocol V1.0
//

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

interface EnhancedEncryptionManager {
  // Data encryption at rest with key rotation
  encryptSensitiveData(data: any): Promise<EncryptedData>
  decryptSensitiveData(encryptedData: EncryptedData): Promise<any>
  rotateEncryptionKeys(): Promise<KeyRotationResult>
  
  // Transport encryption with validator authentication
  establishSecureChannel(endpoint: string): Promise<SecureChannel>
  establishValidatorChannel(validatorId: string): Promise<SecureValidatorChannel>
  
  // NEW: Cryptographic audit protection
  generateAuditHash(auditEntry: AuditEntry): Promise<string>
  verifyAuditChainIntegrity(auditTrail: AuditEntry[]): Promise<IntegrityResult>
  signValidationResult(result: ValidationResult, validatorId: string): Promise<SignedResult>
}

// Type definitions for Security and Encryption

// Encryption interfaces
interface EncryptedData {
  encryptedPayload: string
  algorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305' | 'RSA-OAEP'
  keyId: string
  iv: string
  authTag: string
  timestamp: Date
  metadata?: Record<string, any>
}

interface KeyRotationResult {
  rotationId: string
  oldKeyId: string
  newKeyId: string
  rotatedAt: Date
  affectedServices: string[]
  rollbackPossible: boolean
  backupLocation: string
  verificationStatus: 'success' | 'partial' | 'failed'
  issues: string[]
}

// Secure channel interfaces
interface SecureChannel {
  channelId: string
  endpoint: string
  protocol: 'TLS' | 'mTLS' | 'QUIC' | 'WebSocket-Secure'
  establishedAt: Date
  expiresAt: Date
  certificates: {
    clientCert?: string
    serverCert: string
    caCert: string
  }
  encryptionLevel: 'standard' | 'enhanced' | 'quantum_resistant'
  isActive: boolean
  lastUsed: Date
}

interface SecureValidatorChannel extends SecureChannel {
  validatorId: string
  validatorPublicKey: string
  attestationToken: string
  isolationLevel: 'standard' | 'enhanced' | 'air_gapped'
  trustedExecutionEnvironment: boolean
  complianceLevel: 'basic' | 'enterprise' | 'government'
}

// Audit and integrity interfaces
interface AuditEntry {
  entryId: string
  timestamp: Date
  action: string
  actor: {
    type: 'user' | 'service' | 'validator' | 'system'
    id: string
    name: string
  }
  target: {
    type: 'contract' | 'validation' | 'data' | 'system'
    id: string
    name?: string
  }
  outcome: 'success' | 'failure' | 'error'
  details: Record<string, any>
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  compliance_tags: string[]
  hash?: string
  previousHash?: string
}

interface IntegrityResult {
  isValid: boolean
  confidence: number
  verifiedAt: Date
  hashChainValid: boolean
  timestampConsistent: boolean
  signatureValid: boolean
  issues: {
    type: 'hash_mismatch' | 'timestamp_error' | 'signature_invalid' | 'missing_entry'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    affectedEntries: string[]
  }[]
  recommendations: string[]
  trustScore: number
}

// Signing interfaces
interface SignedResult {
  originalResult: ValidationResult
  signature: string
  signatureAlgorithm: 'RSA-PSS' | 'ECDSA' | 'Ed25519'
  validatorId: string
  validatorPublicKey: string
  signedAt: Date
  certificateChain: string[]
  nonRepudiation: boolean
  verificationInstructions: {
    algorithm: string
    publicKeyFormat: string
    hashFunction: string
  }
}

// ValidationResult interface (if not already defined)
interface ValidationResult {
  success: boolean
  score: number
  message: string
  details?: Record<string, any>
  timestamp: Date
}

interface SecurityAndEncryption {
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
  
  // Data encryption at rest with key rotation
  encryptSensitiveData(data: any): Promise<EncryptedData>
  decryptSensitiveData(encryptedData: EncryptedData): Promise<any>
  rotateEncryptionKeys(): Promise<KeyRotationResult>
  
  // Transport encryption with validator authentication
  establishSecureChannel(endpoint: string): Promise<SecureChannel>
  establishValidatorChannel(validatorId: string): Promise<SecureValidatorChannel>
  
  // NEW: Cryptographic audit protection
  generateAuditHash(auditEntry: AuditEntry): Promise<string>
  verifyAuditChainIntegrity(auditTrail: AuditEntry[]): Promise<IntegrityResult>
  signValidationResult(result: ValidationResult, validatorId: string): Promise<SignedResult>
}

// Encryption interfaces
interface EncryptedData {
  encryptedPayload: string
  algorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305' | 'RSA-OAEP'
  keyId: string
  iv: string
  authTag: string
  timestamp: Date
  metadata?: Record<string, any>
}

interface KeyRotationResult {
  rotationId: string
  oldKeyId: string
  newKeyId: string
  rotatedAt: Date
  affectedServices: string[]
  rollbackPossible: boolean
  backupLocation: string
  verificationStatus: 'success' | 'partial' | 'failed'
  issues: string[]
}

// Secure channel interfaces
interface SecureChannel {
  channelId: string
  endpoint: string
  protocol: 'TLS' | 'mTLS' | 'QUIC' | 'WebSocket-Secure'
  establishedAt: Date
  expiresAt: Date
  certificates: {
    clientCert?: string
    serverCert: string
    caCert: string
  }
  encryptionLevel: 'standard' | 'enhanced' | 'quantum_resistant'
  isActive: boolean
  lastUsed: Date
}

interface SecureValidatorChannel extends SecureChannel {
  validatorId: string
  validatorPublicKey: string
  attestationToken: string
  isolationLevel: 'standard' | 'enhanced' | 'air_gapped'
  trustedExecutionEnvironment: boolean
  complianceLevel: 'basic' | 'enterprise' | 'government'
}

// Audit and integrity interfaces
interface AuditEntry {
  entryId: string
  timestamp: Date
  action: string
  actor: {
    type: 'user' | 'service' | 'validator' | 'system'
    id: string
    name: string
  }
  target: {
    type: 'contract' | 'validation' | 'data' | 'system'
    id: string
    name?: string
  }
  outcome: 'success' | 'failure' | 'error'
  details: Record<string, any>
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  compliance_tags: string[]
  hash?: string
  previousHash?: string
}

interface IntegrityResult {
  isValid: boolean
  confidence: number
  verifiedAt: Date
  hashChainValid: boolean
  timestampConsistent: boolean
  signatureValid: boolean
  issues: {
    type: 'hash_mismatch' | 'timestamp_error' | 'signature_invalid' | 'missing_entry'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    affectedEntries: string[]
  }[]
  recommendations: string[]
  trustScore: number
}

// Signing interfaces
interface SignedResult {
  originalResult: ValidationResult
  signature: string
  signatureAlgorithm: 'RSA-PSS' | 'ECDSA' | 'Ed25519'
  validatorId: string
  validatorPublicKey: string
  signedAt: Date
  certificateChain: string[]
  nonRepudiation: boolean
  verificationInstructions: {
    algorithm: string
    publicKeyFormat: string
    hashFunction: string
  }
}

// ValidationResult interface (if not already defined)
interface ValidationResult {
  success: boolean
  score: number
  message: string
  details?: Record<string, any>
  timestamp: Date
}
