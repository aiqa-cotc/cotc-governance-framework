//
// 🔙 Return to main document: [COTC Protocol Documentation](./cotc-protocol.md)
// 📍 This file contains: Enhanced Agent Management API Types
//

// Type definitions for Enhanced Agent Management API

// Core interfaces
interface ValidatorInfo {
  id: string
  type: string
  architecture: string
  vendor: string
  version: string
  capabilities: string[]
  performance_metrics?: PerformanceMetrics
  trust_score?: number
}

interface PerformanceMetrics {
  latency_ms: number
  throughput: number
  accuracy: number
  availability: number
  error_rate: number
}

// Basic agent and config interfaces
interface AgentDefinition {
  name: string
  type: 'validator' | 'negotiator' | 'monitor' | 'orchestrator'
  version: string
  capabilities: string[]
  requirements: {
    memory: number
    cpu: number
    storage: number
  }
  configuration: Record<string, any>
}

interface AgentRegistration {
  agentId: string
  status: 'registered' | 'pending' | 'failed'
  endpoint: string
  credentials: {
    token: string
    publicKey: string
  }
  registeredAt: Date
}

interface AgentConfig {
  parameters: Record<string, any>
  thresholds: Record<string, number>
  features: string[]
  resources: {
    maxMemory: number
    maxCpu: number
    timeoutMs: number
  }
}

interface AgentFilters {
  type?: string[]
  status?: string[]
  capabilities?: string[]
  tags?: string[]
  registeredAfter?: Date
  registeredBefore?: Date
}

interface AgentList {
  agents: AgentInfo[]
  totalCount: number
  page: number
  pageSize: number
}

interface AgentInfo {
  agentId: string
  name: string
  type: string
  status: 'active' | 'inactive' | 'error' | 'maintenance'
  version: string
  lastSeen: Date
  capabilities: string[]
  metadata: Record<string, any>
}

// Health and metrics interfaces
interface AgentHealthStatus {
  agentId: string
  status: 'healthy' | 'degraded' | 'unhealthy' | 'offline'
  uptime: number
  lastHealthCheck: Date
  issues: string[]
  resources: {
    memoryUsage: number
    cpuUsage: number
    diskUsage: number
  }
  performance: {
    responseTime: number
    throughput: number
    errorRate: number
  }
}

interface TimeRange {
  start: Date
  end: Date
  granularity?: 'minute' | 'hour' | 'day' | 'week'
}

interface AgentMetrics {
  agentId: string
  timeRange: TimeRange
  requestCount: number
  averageResponseTime: number
  errorRate: number
  throughput: number
  resourceUtilization: {
    memory: number[]
    cpu: number[]
    network: number[]
  }
  customMetrics: Record<string, number[]>
}

// Diversity and validation interfaces
interface DiversityAssessment {
  domain: string
  diversityScore: number
  recommendations: string[]
  currentValidators: {
    count: number
    types: Record<string, number>
    capabilities: Record<string, number>
  }
  gaps: string[]
  assessment: 'sufficient' | 'marginal' | 'insufficient'
}

interface DiversityRequirements {
  minValidators: number
  requiredTypes: string[]
  capabilities: string[]
  distributionStrategy: 'round_robin' | 'weighted' | 'random'
  avoidanceCriteria: string[]
}

interface ValidatorEnsemble {
  ensembleId: string
  validators: ValidatorInfo[]
  diversityScore: number
  confidence: number
  createdAt: Date
  expiresAt: Date
}

// Integrity and anomaly interfaces
interface IntegrityStatus {
  agentId: string
  status: 'verified' | 'suspicious' | 'compromised'
  lastCheck: Date
  verificationMethods: string[]
  confidence: number
  issues: string[]
  recommendations: string[]
}

interface AnomalyReport {
  reportId: string
  agentId: string
  anomalyType: 'behavior' | 'performance' | 'security' | 'integrity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  detectedAt: Date
  evidence: Record<string, any>
  recommendations: string[]
  status: 'new' | 'investigating' | 'resolved' | 'false_positive'
}

interface EnhancedAgentManagementAPI {
  // Agent lifecycle
  registerAgent(agent: AgentDefinition): Promise<AgentRegistration>
  updateAgent(agentId: string, config: AgentConfig): Promise<void>
  deregisterAgent(agentId: string): Promise<void>
  
  // Agent discovery and health
  listAgents(filters: AgentFilters): Promise<AgentList>
  getAgentHealth(agentId: string): Promise<AgentHealthStatus>
  getAgentMetrics(agentId: string, timeRange: TimeRange): Promise<AgentMetrics>
  
  // NEW: Validator diversity management
  ensureValidatorDiversity(domain: string): Promise<DiversityAssessment>
  getValidatorEnsemble(requirements: DiversityRequirements): Promise<ValidatorEnsemble>
  
  // NEW: Security monitoring
  monitorAgentIntegrity(agentId: string): Promise<IntegrityStatus>
  detectAnomalousAgentBehavior(): Promise<AnomalyReport[]>
}
