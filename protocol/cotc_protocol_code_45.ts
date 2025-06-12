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

interface ValidatorFallback {
  validatorId: string
  priority: number
  capabilities: string[]
  performance_tier: 'premium' | 'standard' | 'basic'
  diversity_contribution: DiversityMetrics
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
