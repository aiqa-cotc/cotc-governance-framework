// EnhancedCacheManager Interface for COTC Protocol
interface EnhancedCacheManager {
  // Multi-level caching with security
  l1Cache: SecureInMemoryCache // Agent-local cache with integrity checks
  l2Cache: EncryptedRedisCache // Shared cache cluster with encryption
  l3Cache: SecureDatabaseCache // Persistent cache with audit trail
  
  // cache invalidation
  invalidateContractCache(contractId: string): Promise<void>
  invalidateGroundTruthCache(domain: string): Promise<void>
  invalidateValidatorCache(agentId: string): Promise<void>
  
  // Cache warming with diversity considerations
  warmCacheWithDiverseResults(contractIds: string[]): Promise<void>
  
  // NEW: Security-aware caching
  encryptSensitiveCache(key: string, data: any): Promise<void>
  verifyCacheIntegrity(key: string): Promise<boolean>
  auditCacheAccess(operation: string, key: string): Promise<void>
}

// Supporting interfaces
interface SecureInMemoryCache {
  get(key: string): Promise<any>
  set(key: string, value: any, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  verifyIntegrity(key: string): Promise<boolean>
  generateHash(data: any): string
}

interface EncryptedRedisCache {
  get(key: string): Promise<any>
  set(key: string, value: any, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  encrypt(data: any): Promise<string>
  decrypt(encryptedData: string): Promise<any>
  verifySignature(key: string): Promise<boolean>
}

interface SecureDatabaseCache {
  get(key: string): Promise<any>
  set(key: string, value: any, metadata?: CacheMetadata): Promise<void>
  delete(key: string): Promise<void>
  auditAccess(operation: string, key: string, userId: string): Promise<void>
  getAuditTrail(key: string): Promise<AuditEntry[]>
}

interface CacheMetadata {
  created_at: Date
  expires_at?: Date
  created_by: string
  security_classification: 'public' | 'internal' | 'confidential' | 'restricted'
  integrity_hash: string
  encryption_key_id?: string
}

interface AuditEntry {
  timestamp: Date
  operation: 'get' | 'set' | 'delete' | 'verify'
  user_id: string
  result: 'success' | 'failure'
  details?: string
}
