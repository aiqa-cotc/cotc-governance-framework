// Type definitions for Enhanced Validation Orchestration API

// Observable interface for reactive programming
interface Observable<T> {
  subscribe(observer: (value: T) => void): { unsubscribe(): void }
}

// Validation request and session interfaces
interface ValidationRequest {
  contractId: string
  validationType: 'governance' | 'compliance' | 'performance' | 'security'
  priority: Priority
  timeoutMs?: number
  context?: Record<string, any>
}

interface ValidationSession {
  sessionId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress: number
  startTime: Date
  endTime?: Date
  results?: ValidationResult[]
}

interface ValidationStatus {
  sessionId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress: number
  estimatedCompletion?: Date
  currentPhase?: string
}

interface ValidationEvent {
  sessionId: string
  type: 'started' | 'progress' | 'completed' | 'failed' | 'cancelled'
  timestamp: Date
  data?: any
}

interface ValidationResult {
  success: boolean
  score: number
  message: string
  details?: Record<string, any>
  timestamp: Date
}

// Batch validation interfaces
interface BatchValidationResult {
  batchId: string
  completedCount: number
  totalCount: number
  results: ValidationSession[]
  failedSessions: string[]
}

// Threshold management interfaces
interface ThresholdCriteria {
  metric: string
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq'
  value: number
  weight?: number
}

interface ThresholdAdjustment {
  adjustmentId: string
  oldThresholds: Record<string, number>
  newThresholds: Record<string, number>
  reason: string
  timestamp: Date
}

interface ValidationData {
  sessionId: string
  metrics: Record<string, number>
  outcome: 'pass' | 'fail'
  timestamp: Date
}

interface OptimalThresholds {
  thresholds: Record<string, number>
  confidence: number
  dataPoints: number
  recommendation: string
}

// Priority and review interfaces
type Priority = 'low' | 'medium' | 'high' | 'critical'

interface ReviewAssignment {
  assignmentId: string
  reviewerId: string
  validationId: string
  priority: Priority
  assignedAt: Date
  dueDate: Date
}

interface ReviewQueueStatus {
  totalItems: number
  pendingReviews: number
  averageWaitTime: number
  reviewers: {
    available: number
    busy: number
    offline: number
  }
}

interface EnhancedValidationOrchestrationAPI {
  // Validation execution
  executeValidation(request: ValidationRequest): Promise<ValidationSession>
  getValidationStatus(sessionId: string): Promise<ValidationStatus>
  cancelValidation(sessionId: string): Promise<void>
  
  // Real-time updates
  subscribeToValidation(sessionId: string): Observable<ValidationEvent>
  
  // Batch operations
  executeBatchValidation(requests: ValidationRequest[]): Promise<BatchValidationResult>
  
  // NEW: Dynamic threshold management
  adjustValidationThresholds(criteria: ThresholdCriteria): Promise<ThresholdAdjustment>
  getOptimalThresholds(historicalData: ValidationData[]): Promise<OptimalThresholds>
  
  // NEW: Human review management
  routeForHumanReview(validationId: string, priority: Priority): Promise<ReviewAssignment>
  getReviewQueueStatus(): Promise<ReviewQueueStatus>
}
