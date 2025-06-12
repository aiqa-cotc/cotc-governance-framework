// 
// 🔙 Return to main document: [COTC Protocol Documentation](./cotc-protocol.md)
// 📍 This file contains: Intelligent Agent Pool Manager Interface
//

// Import common types
import type {
  AgentInfo,
  ValidatorInfo,
  PerformanceRequirements,
  PerformanceMetrics,
  HealthMetrics,
  Alert,
  DiversityViolation,
  DiversityRequirements,
  ValidatorEnsemble,
  SelectionCriteria,
  AgentHealthEvent,
  DiversityComplianceResult
} from './cotc_protocol_common_types'

// Additional types specific to Agent Pool Manager
interface DriftAnalysis {
  agentId: string
  drift_detected: boolean
  drift_type: 'performance' | 'behavioral' | 'security'
  severity: 'low' | 'medium' | 'high' | 'critical'
  recommended_action: string
}

interface RebalancingResult {
  success: boolean
  validators_added: ValidatorInfo[]
  validators_removed: ValidatorInfo[]
  new_diversity_score: number
  performance_impact: string
}

interface CircuitBreakerStatus {
  agentId: string
  state: 'closed' | 'open' | 'half_open'
  failure_count: number
  last_failure_time?: Date
  next_attempt_time?: Date
}

interface RecoveryResult {
  agentId: string
  recovery_successful: boolean
  recovery_strategy: string
  time_to_recovery: number
  performance_restored: boolean
}

// IntelligentAgentPoolManager Interface for COTC Protocol
interface IntelligentAgentPoolManager {
  // auto-scaling with diversity considerations
  scaleAgentPool(agentType: string, targetCount: number, diversityRequirements: DiversityRequirements): Promise<void>
  
  // Intelligent load balancing with diversity weighting
  selectOptimalValidatorEnsemble(criteria: SelectionCriteria): Promise<ValidatorEnsemble>
  
  // health monitoring
  monitorAgentHealth(): Observable<AgentHealthEvent>
  detectPerformanceDrift(agentId: string): Promise<DriftAnalysis>
  
  // NEW: Diversity management
  ensureDiversityCompliance(domain: string): Promise<DiversityComplianceResult>
  rebalanceForOptimalDiversity(): Promise<RebalancingResult>
  
  // Circuit breaker with intelligent recovery
  getCircuitBreakerStatus(agentId: string): CircuitBreakerStatus
  implementIntelligentRecovery(agentId: string): Promise<RecoveryResult>
}

// Observable type (simplified for this interface)
interface Observable<T> {
  subscribe(observer: (value: T) => void): { unsubscribe(): void }
}
