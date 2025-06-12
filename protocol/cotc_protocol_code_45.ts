// 
// 🔙 Return to main document: [COTC Protocol Documentation](./cotc-protocol.md)
// 📍 This file contains: Enhanced Resilience Manager
//

// Import common types
import type {
  ValidatorInfo,
  ValidationStep
} from './cotc_protocol_common_types'

// Type definitions for Resilience Manager
interface RecoveryResult {
  success: boolean
  recovery_time_ms: number
  fallback_used: boolean
  validator_restored: boolean
}

interface RebalancingResult {
  success: boolean
  validators_added: ValidatorInfo[]
  validators_removed: ValidatorInfo[]
  new_diversity_score: number
  performance_impact: string
}

interface EscalationResult {
  escalated: boolean
  escalation_level: 'technical' | 'business' | 'executive'
  notification_sent: boolean
  incident_id: string
}

interface ValidatorFallback {
  validator_id: string
  priority: number
  capabilities: string[]
  estimated_quality: number
}

interface FailureType {
  category: 'network' | 'performance' | 'security' | 'validation' | 'timeout'
  severity: 'low' | 'medium' | 'high' | 'critical'
  recoverable: boolean
}

interface RecoveryIntegrityResult {
  integrity_maintained: boolean
  audit_trail_complete: boolean
  data_consistency: boolean
  validation_accuracy: number
}

interface CircuitBreakerState {
  state: 'closed' | 'open' | 'half_open'
  failure_count: number
  success_count: number
  last_failure_time?: Date
  next_attempt_time?: Date
}

interface DiversityMetrics {
  architecture_diversity: number
  vendor_diversity: number
  geographic_diversity: number
  training_data_diversity: number
  overall_score: number
}

interface BusinessImpact {
  revenue_impact: 'none' | 'low' | 'medium' | 'high' | 'critical'
  customer_impact: 'none' | 'low' | 'medium' | 'high' | 'critical'
  compliance_impact: 'none' | 'low' | 'medium' | 'high' | 'critical'
  operational_impact: 'none' | 'low' | 'medium' | 'high' | 'critical'
}

interface SecurityImplication {
  confidentiality_breach: boolean
  integrity_compromise: boolean
  availability_impact: boolean
  authentication_bypass: boolean
  authorization_escalation: boolean
}

interface RecoveryStep {
  step_name: string
  description: string
  estimated_time_ms: number
  success_probability: number
  dependencies: string[]
}

interface RiskAssessment {
  overall_risk: 'low' | 'medium' | 'high' | 'critical'
  business_impact: BusinessImpact
  security_implications: SecurityImplication
  likelihood: number
  mitigation_required: boolean
}

interface PartialRecovery {
  recovered_components: string[]
  remaining_failures: string[]
  recovery_percentage: number
  estimated_full_recovery_time: number
}

// EnhancedResilienceManager Interface for COTC Protocol
interface EnhancedResilienceManager {
  // Circuit breaker for external services with intelligent recovery
  circuitBreaker: IntelligentCircuitBreaker
  
  // Retry with exponential backoff and jitter
  retryWithBackoff<T>(
    operation: () => Promise<T>, 
    config: EnhancedRetryConfig
  ): Promise<T>
  
  // Bulkhead isolation with validator separation
  isolateFailure(operation: () => Promise<any>): Promise<any>
  isolateValidatorFailure(validatorId: string, operation: () => Promise<any>): Promise<any>
  
  // Graceful degradation with fallback validators
  degradeGracefully(
    primaryValidation: () => Promise<any>, 
    fallbackValidators: ValidatorFallback[]
  ): Promise<any>
  
  // NEW: failure recovery
  recoverFromValidatorFailure(failedValidatorId: string): Promise<RecoveryResult>
  rebalanceAfterFailure(failedComponents: string[]): Promise<RebalancingResult>
  escalateUnrecoverableFailure(failure: CriticalFailure): Promise<EscalationResult>
}

interface EnhancedErrorRecoveryStrategy {
  // Partial failure handling with validator diversity
  handlePartialValidationFailure(
    session: ValidationSession, 
    failedSteps: number[]
  ): Promise<RecoveryAction>
  
  // Agent failure recovery with automatic replacement
  handleAgentFailure(agentId: string, error: Error): Promise<void>
  replaceFailedValidator(validatorId: string, diversityRequirements: DiversityRequirements): Promise<ReplacementResult>
  
  // Data consistency recovery
  repairInconsistentState(sessionId: string): Promise<void>
  
  // NEW: Advanced recovery strategies
  implementFailoverProtocol(failureType: FailureType): Promise<FailoverResult>
  executeMassiveFailureRecovery(affectedSystems: string[]): Promise<MassRecoveryResult>
  validateRecoveryIntegrity(recoveryId: string): Promise<RecoveryIntegrityResult>
}

// Supporting interfaces
interface IntelligentCircuitBreaker {
  state: 'closed' | 'open' | 'half_open'
  failureThreshold: number
  recoveryTimeout: number
  successThreshold: number
  call<T>(operation: () => Promise<T>): Promise<T>
  getState(): CircuitBreakerState
  forceOpen(): void
  forceClose(): void
  reset(): void
}

interface EnhancedRetryConfig {
  maxAttempts: number
  baseDelay: number
  maxDelay: number
  exponentialBase: number
  jitter: boolean
  retryCondition: (error: Error) => boolean
  onRetry?: (attempt: number, error: Error) => void
}

interface CriticalFailure {
  failureId: string
  failureType: FailureType
  severity: 'high' | 'critical' | 'catastrophic'
  affectedSystems: string[]
  businessImpact: BusinessImpact
  securityImplications: SecurityImplication[]
  stakeholders: string[]
}

interface ValidationSession {
  sessionId: string
  contractId: string
  status: 'active' | 'paused' | 'failed' | 'completed'
  steps: ValidationStep[]
  currentStep: number
  startTime: Date
  estimatedCompletion?: Date
}

interface RecoveryAction {
  actionType: 'retry' | 'fallback' | 'escalate' | 'abort'
  steps: RecoveryStep[]
  estimatedTime: number
  riskAssessment: RiskAssessment
  requiredApprovals: string[]
}

interface ReplacementResult {
  originalValidatorId: string
  replacementValidatorId: string
  replacementSuccessful: boolean
  diversityMaintained: boolean
  performanceImpact: string
  integrationTime: number
}

interface FailoverResult {
  failoverSuccessful: boolean
  primarySystem: string
  failoverSystem: string
  switchoverTime: number
  dataLoss: boolean
  servicesAffected: string[]
}

interface MassRecoveryResult {
  recoveryId: string
  affectedSystems: string[]
  recoverySuccessful: boolean
  partialRecoveries: PartialRecovery[]
  totalRecoveryTime: number
  businessImpact: BusinessImpact
}
