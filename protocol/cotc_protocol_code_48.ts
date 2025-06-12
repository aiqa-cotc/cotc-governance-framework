// Enhanced Validation Session State Interface
// Extracted from COTC Protocol Documentation

interface StepResult {
  stepNumber: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  timestamp: string;
  validatorUsed?: string;
}

interface ValidatorInfo {
  id: string;
  type: string;
  version: string;
  status: 'active' | 'inactive' | 'degraded';
  capabilities: string[];
  performance: {
    averageResponseTime: number;
    successRate: number;
    lastUpdated: string;
  };
}

interface DiversityMetrics {
  architecturalDiversity: number;
  vendorDiversity: number;
  trainingDataDiversity: number;
  overallDiversityScore: number;
  diversityThreshold: number;
  lastCalculated: string;
}

interface ThresholdAdjustment {
  type: 'confidence' | 'consensus' | 'diversity';
  originalValue: number;
  adjustedValue: number;
  reason: string;
  timestamp: string;
  approvedBy?: string;
}

interface HumanReviewStatus {
  required: boolean;
  assigned: boolean;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'escalated';
  deadline?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  reviewNotes?: string;
}

interface SecurityCheckResult {
  checkType: string;
  status: 'passed' | 'failed' | 'warning';
  details: string;
  timestamp: string;
  remediationRequired: boolean;
  remediationSteps?: string[];
}

interface EnhancedValidationSessionState {
  sessionId: string;
  contractId: string;
  currentStep: number;
  stepResults: StepResult[];
  overallStatus: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  contextData: Record<string, any>;
  
  // NEW: state tracking
  validatorEnsemble: ValidatorInfo[];
  diversityMetrics: DiversityMetrics;
  thresholdAdjustments: ThresholdAdjustment[];
  humanReviewStatus: HumanReviewStatus;
  securityChecks: SecurityCheckResult[];
  
  // State persistence
  persistTo: 'memory' | 'redis' | 'database';
  ttl?: number;
  
  // NEW: Integrity verification
  stateHash: string;
  integrityVerified: boolean;
}

export {
  EnhancedValidationSessionState,
  StepResult,
  ValidatorInfo,
  DiversityMetrics,
  ThresholdAdjustment,
  HumanReviewStatus,
  SecurityCheckResult
};
