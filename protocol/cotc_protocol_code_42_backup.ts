//
// 🔙 Return to main document: [COTC Protocol Documentation](./cotc-protocol.md)
// 📍 This file contains: Intelligent Agent Pool Manager Interface
//

// Type definitions
interface AgentInfo {
  id: string
  type: string
  architecture: string
  vendor: string
  version: string
  capabilities: string[]
}

interface PerformanceRequirements {
  max_latency_ms: number
  min_throughput: number
  availability_sla: number
  quality_threshold: number
}

interface ValidatorInfo extends AgentInfo {
  performance_metrics: PerformanceMetrics
  trust_score: number
}

interface PerformanceMetrics {
  latency_ms: number
  throughput: number
  accuracy: number
  availability: number
  error_rate: number
}

interface HealthMetrics {
  cpu_usage: number
  memory_usage: number
  response_time: number
  error_rate: number
  availability: number
}

interface Alert {
  id: string
  type: 'performance' | 'security' | 'availability' | 'diversity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: Date
  affected_validators: string[]
}

interface DiversityViolation {
  type: 'architecture' | 'vendor' | 'training_data' | 'geographic'
  description: string
  affected_validators: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
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

// Supporting interfaces
interface DiversityRequirements {
  architecture_types: string[]
  vendor_diversity: boolean
  minimum_validators: number
  training_data_independence: boolean
}

interface SelectionCriteria {
  domain: string
  security_level: string
  performance_requirements: PerformanceRequirements
  diversity_constraints: DiversityRequirements
}

interface ValidatorEnsemble {
  validators: ValidatorInfo[]
  diversity_score: number
  expected_performance: PerformanceMetrics
  confidence_level: number
}

interface AgentHealthEvent {
  agentId: string
  timestamp: Date
  health_status: 'healthy' | 'degraded' | 'failed' | 'compromised'
  metrics: HealthMetrics
  alerts: Alert[]
}

interface DriftAnalysis {
  agentId: string
  drift_detected: boolean
  drift_type: 'performance' | 'behavioral' | 'security'
  severity: 'low' | 'medium' | 'high' | 'critical'
  recommended_action: string
}

interface DiversityComplianceResult {
  compliant: boolean
  current_diversity_score: number
  required_diversity_score: number
  violations: DiversityViolation[]
  recommendations: string[]
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
