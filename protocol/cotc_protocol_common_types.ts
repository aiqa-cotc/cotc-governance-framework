/* 
 * Common Type Definitions for COTC Protocol V1.0
 * Back to main document: [COTC Protocol](./cotc-protocol.md)
 * 
 * This file contains shared type definitions used across multiple TypeScript files
 * to ensure consistency and avoid conflicts.
 */

// Core Agent and Validator Types
export interface AgentInfo {
  id: string
  type: string
  architecture: string
  vendor: string
  version: string
  capabilities: string[]
}

export interface ValidatorInfo extends AgentInfo {
  performance_metrics: PerformanceMetrics
  trust_score: number
}

export interface PerformanceRequirements {
  max_latency_ms: number
  min_throughput: number
  availability_sla: number
  quality_threshold: number
}

export interface PerformanceMetrics {
  latency_ms: number
  throughput: number
  accuracy: number
  availability: number
  error_rate: number
}

export interface HealthMetrics {
  cpu_usage: number
  memory_usage: number
  response_time: number
  error_rate: number
  availability: number
}

// Validation and Results
export interface ValidationResult {
  success: boolean
  score: number
  message: string
  details?: Record<string, any>
  timestamp: Date
}

export interface EnhancedValidationResult {
  confidence_score: number
  diversity_score?: number
  security_verified: boolean
  contains_sensitive_data?: boolean
}

// Diversity and Compliance
export interface DiversityRequirements {
  architecture_types: string[]
  vendor_diversity: boolean
  minimum_validators: number
  training_data_independence: boolean
}

export interface DiversityComplianceResult {
  compliant: boolean
  current_diversity_score: number
  required_diversity_score: number
  violations: DiversityViolation[]
  recommendations: string[]
}

export interface DiversityViolation {
  type: 'architecture' | 'vendor' | 'training_data' | 'geographic'
  description: string
  affected_validators: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
}

// Ensemble and Selection
export interface ValidatorEnsemble {
  validators: ValidatorInfo[]
  diversity_score: number
  expected_performance: PerformanceMetrics
  confidence_level: number
}

export interface SelectionCriteria {
  domain: string
  security_level: string
  performance_requirements: PerformanceRequirements
  diversity_constraints: DiversityRequirements
}

// Alerts and Monitoring
export interface Alert {
  id: string
  type: 'performance' | 'security' | 'availability' | 'diversity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: Date
  affected_validators: string[]
}

export interface AgentHealthEvent {
  agentId: string
  timestamp: Date
  health_status: 'healthy' | 'degraded' | 'failed' | 'compromised'
  metrics: HealthMetrics
  alerts: Alert[]
}

// Contract and Governance Types
export interface EnhancedEnterpriseContract {
  contract_id: string
  integration: {
    enterprise_systems: {
      jira_integration: {
        project_key: string
        issue_type: string
      }
    }
  }
  governance: {
    severity: string
    contract_type: string
    compliance_requirements: string[]
    stakeholders?: Stakeholder[]
  }
  metadata: {
    security_classification: string
  }
  enhanced_governance?: {
    regulatory_alignment?: any
    validation_chain?: ValidationStep[]
    stakeholders?: Stakeholder[]
    enhanced_security?: any
  }
}

export interface EnterpriseContext {
  user_id: string
  session_id: string
  environment: string
  timestamp: Date
}

export interface EnhancedEnterpriseValidationResult {
  session_id: string
  contract_id: string
  overall_status: string
  confidence_score: number
  security_verified: boolean
  validation_results: ValidationResult[]
  audit_trail: string[]
}

// Human Review and Optimization
export interface HumanReviewOptimization {
  priority_scoring?: boolean
}

export interface Stakeholder {
  role: string
  contact: string
}

export interface StakeholderGroup {
  stakeholders: Stakeholder[]
  channels: string[]
  expertise_level: ExpertiseLevel
}

export type ExpertiseLevel = 'technical' | 'business' | 'security' | 'compliance' | 'medical' | 'privacy' | 'executive'

// Validation Chain and Steps
export interface ValidationStep {
  agent_type: string
  agent_name: string
  authority_source?: string
  required: boolean
  timeout_ms?: number
  validation_criteria?: Record<string, any>
  diversity_requirements?: DiversityRequirements
}

export interface EnhancedValidationConfig {
  validation_chain: ValidationStep[]
  enhanced_security?: any
  enhanced_governance?: any
}

export interface EnhancedValidationChainResult {
  step_id: string
  agent_type: string
  agent_name: string
  success: boolean
  confidence_score: number
  validation_result: ValidationResult
  execution_time_ms: number
  review_priority?: number
}

// Session and Enterprise Types
export interface EnterpriseSession {
  session_id: string
  contract_id: string
  user_context: EnterpriseContext
  created_at: Date
  expires_at: Date
  audit_trail: string[]
}

// Security and Monitoring Types
export interface SecurityEvent {
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

export interface AnomalyDetection {
  userId?: string
  anomalyType: 'access_pattern' | 'location' | 'timing' | 'behavior' | 'volume'
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  description: string
  detectedAt: Date
  evidence?: {
    normal_pattern: Record<string, any>
    detected_pattern: Record<string, any>
  }
  status: 'new' | 'investigating' | 'confirmed' | 'false_positive'
  isAnomalous: boolean
  confidenceScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
}

export interface IsolationStatus {
  validatorId?: string
  isolationLevel: 'none' | 'network' | 'process' | 'container' | 'vm'
  isIsolated: boolean
  isolatedAt?: Date
  isolationReasons?: string[]
  networkRestrictions?: {
    allowedDomains: string[]
    blockedPorts: number[]
    firewallRules: string[]
  }
  resourceLimits?: {
    maxMemory: number
    maxCpu: number
    maxDisk: number
    maxNetwork: number
  }
  monitoringEnabled?: boolean
  complianceStatus: 'compliant' | 'non_compliant' | 'unknown'
  verificationTime: Date
}

export interface IntegrityVerification {
  componentId?: string
  verificationType?: 'hash' | 'signature' | 'certificate' | 'attestation'
  isValid: boolean
  verifiedAt: Date
  verificationChain?: {
    steps: Array<{
      step: string
      verified: boolean
      hash?: string
    }>
  }
  isIntact: boolean
  verificationHash: string
  lastVerified: Date
  issues: string[]
  trustScore: number
}

// Violation Types
export interface EnhancedViolation {
  description: string
  confidence_score: number
  diversity_score?: number
  security_verified: boolean
  sensitive_data?: any
  validators_used?: string[]
  ground_truth_verified?: boolean
  required_actions?: string[]
  session_id?: string
  audit_hash?: string
}
