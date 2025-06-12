// 
// 🔙 Return to main document: [COTC Protocol Documentation](./cotc-protocol.md)
// 📋 Browse all code files: [Code Reference Index](./CODE_INDEX.md)
// 📍 This file contains: Enhanced Validation Session State Interface
// 🎯 Used in section: State Management Strategy
//
// Type definitions for Enhanced State Manager

// Enhanced validation session state
interface EnhancedValidationSessionState {
  sessionId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  startTime: Date
  endTime?: Date
  progress: number
  currentPhase: string
  participants: {
    agentId: string
    role: 'validator' | 'negotiator' | 'monitor'
    status: 'active' | 'inactive' | 'error'
    joinedAt: Date
  }[]
  validationResults: {
    agentId: string
    result: ValidationResult
    timestamp: Date
  }[]
  consensusState: {
    achieved: boolean
    score: number
    participantVotes: Record<string, boolean>
    requiredThreshold: number
  }
  contractData: {
    contractId: string
    version: string
    checksum: string
    metadata: Record<string, any>
  }
  stateCheckpoints: {
    timestamp: Date
    phase: string
    data: Record<string, any>
  }[]
  errorHistory: {
    timestamp: Date
    error: string
    source: string
    recovered: boolean
  }[]
}

// Integrity verification and repair results
interface IntegrityVerificationResult {
  sessionId: string
  isValid: boolean
  verificationTime: Date
  checksumMatch: boolean
  structuralIntegrity: boolean
  temporalConsistency: boolean
  issues: {
    type: 'checksum' | 'structure' | 'temporal' | 'participant'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    affectedComponents: string[]
  }[]
  confidence: number
  recommendations: string[]
}

interface StateRepairResult {
  sessionId: string
  repairAttempted: boolean
  repairSuccessful: boolean
  repairTime: Date
  repairedComponents: string[]
  unrepairedIssues: string[]
  backupUsed: boolean
  dataLoss: {
    occurred: boolean
    affectedComponents: string[]
    severity: 'minimal' | 'moderate' | 'significant'
  }
  integrityAfterRepair: number
  recommendations: string[]
}

// Validation result interface (if not already defined)
interface ValidationResult {
  success: boolean
  score: number
  message: string
  details?: Record<string, any>
  timestamp: Date
}

interface EnhancedStateManager {
  saveState(sessionId: string, state: EnhancedValidationSessionState): Promise<void>
  loadState(sessionId: string): Promise<EnhancedValidationSessionState | null>
  deleteState(sessionId: string): Promise<void>
  
  // Distributed locking for concurrent access
  acquireLock(sessionId: string, ttl: number): Promise<Lock>
  releaseLock(lock: Lock): Promise<void>
  
  // NEW: State integrity verification
  verifyStateIntegrity(sessionId: string): Promise<IntegrityVerificationResult>
  repairCorruptedState(sessionId: string): Promise<StateRepairResult>
}
