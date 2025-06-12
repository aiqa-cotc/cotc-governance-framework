
// Type definitions for COTC Contract Management API
interface COTCContract {
  contract_id: string;
  version: string;
  metadata: {
    name: string;
    description: string;
    created_by: string;
    created_at: string;
    last_modified?: string;
    tags?: string[];
    security_classification: 'public' | 'internal' | 'confidential' | 'restricted';
  };
  governance: {
    contract_type: 'security' | 'compliance' | 'feature' | 'domain' | 'meta';
    severity: 'low' | 'medium' | 'high' | 'critical';
    compliance_requirements?: string[];
    stakeholders: Array<{
      role: string;
      contact: string;
      notification_required?: boolean;
      approval_required?: boolean;
      escalation_level?: string;
      expertise_level?: string;
    }>;
    sla_requirements?: {
      resolution_time?: string;
      escalation_after?: string;
      business_hours_priority?: boolean;
    };
  };
  validation: {
    validation_chain: Array<{
      step_id: string;
      agent_type: string;
      agent_name: string;
      required?: boolean;
      timeout_ms?: number;
      retry_count?: number;
      failure_action?: 'fail' | 'warn' | 'continue';
      human_review_required?: boolean;
      diversity_requirements?: {
        architecture_diversity?: boolean;
        vendor_diversity?: boolean;
        training_data_independence?: boolean;
        architecture_types?: string[];
      };
    }>;
    confidence_requirements: {
      minimum_threshold: number;
      escalation_threshold?: number;
      learning_threshold?: number;
      human_review_threshold?: number;
      diversity_bonus?: number;
    };
    enhanced_security?: {
      supply_chain_verification?: {
        required?: boolean;
        cryptographic_signatures?: boolean;
        source_auditing?: string;
        dependency_scanning?: string;
      };
      adversarial_testing?: {
        frequency?: string;
        sophisticated_attack_simulation?: boolean;
        meta_deception_testing?: boolean;
        coordinated_attack_simulation?: boolean;
      };
      validator_isolation?: {
        containerized_execution?: boolean;
        network_isolation?: boolean;
        resource_limits?: boolean;
      };
    };
  };
  enhanced_governance?: {
    regulatory_alignment?: {
      nist_ai_rmf_mapping?: {
        govern_controls?: string[];
        map_controls?: string[];
        measure_controls?: string[];
        manage_controls?: string[];
      };
      iso_42001_compliance?: {
        leadership_commitment?: string;
        risk_assessment?: string;
        operational_controls?: string;
        performance_evaluation?: string;
      };
      gdpr_compliance?: {
        privacy_by_design?: boolean;
        human_intervention?: boolean;
        explainability?: boolean;
        data_minimization?: boolean;
        lawful_basis_documentation?: boolean;
      };
    };
    human_review_optimization?: {
      dynamic_thresholds?: boolean;
      intelligent_routing?: boolean;
      workload_balancing?: boolean;
      fatigue_prevention?: boolean;
      priority_scoring?: boolean;
      expert_routing?: boolean;
    };
  };
}

interface ContractResponse {
  contract_id: string;
  status: 'created' | 'updated' | 'validated' | 'deployed' | 'failed';
  message: string;
  validation_results?: ValidationResult[];
  created_at: string;
  updated_at?: string;
}

interface ContractFilters {
  contract_type?: string;
  severity?: string;
  security_classification?: string;
  compliance_framework?: string;
  created_by?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

interface ContractList {
  contracts: Array<{
    contract_id: string;
    name: string;
    contract_type: string;
    severity: string;
    created_at: string;
    last_modified?: string;
    status: string;
  }>;
  total_count: number;
  limit: number;
  offset: number;
}

interface ValidationResult {
  validation_id: string;
  contract_id: string;
  status: 'passed' | 'failed' | 'warning' | 'requires_review';
  confidence_score: number;
  validation_steps: Array<{
    step_id: string;
    validator_name: string;
    result: 'pass' | 'fail' | 'warning';
    confidence: number;
    details: string;
    execution_time_ms: number;
  }>;
  overall_result: string;
  requires_human_review: boolean;
  audit_trail_hash: string;
  created_at: string;
  completed_at?: string;
}

interface TestResult {
  test_id: string;
  contract_id: string;
  test_status: 'passed' | 'failed' | 'error';
  test_data_used: any;
  validation_results: ValidationResult;
  performance_metrics: {
    execution_time_ms: number;
    memory_usage_mb: number;
    cpu_utilization_percent: number;
  };
  error_details?: string;
  executed_at: string;
}

interface IntegrityResult {
  contract_id: string;
  integrity_status: 'verified' | 'compromised' | 'unknown';
  integrity_score: number;
  verification_method: 'hash_verification' | 'signature_verification' | 'blockchain_verification';
  verification_timestamp: string;
  issues_found: Array<{
    issue_type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
  }>;
  verification_details: {
    original_hash?: string;
    current_hash?: string;
    signature_valid?: boolean;
    blockchain_confirmed?: boolean;
  };
}

interface AuditTrail {
  contract_id: string;
  audit_entries: Array<{
    entry_id: string;
    timestamp: string;
    event_type: 'created' | 'updated' | 'validated' | 'deployed' | 'accessed' | 'deleted';
    actor: string;
    actor_type: 'user' | 'system' | 'service';
    changes_made: Record<string, any>;
    previous_hash?: string;
    current_hash: string;
    signature?: string;
    ip_address?: string;
    user_agent?: string;
  }>;
  total_entries: number;
  integrity_verified: boolean;
  generated_at: string;
}

interface EnhancedContractManagementAPI {
  // Contract CRUD operations
  createContract(contract: COTCContract): Promise<ContractResponse>
  updateContract(id: string, contract: Partial<COTCContract>): Promise<ContractResponse>
  getContract(id: string): Promise<COTCContract>
  listContracts(filters: ContractFilters): Promise<ContractList>
  deleteContract(id: string): Promise<void>
  
  // Contract validation
  validateContractSchema(contract: COTCContract): Promise<ValidationResult>
  testContract(contractId: string, testData: any): Promise<TestResult>
  
  // NEW: security operations
  validateContractIntegrity(contractId: string): Promise<IntegrityResult>
  auditContractChanges(contractId: string): Promise<AuditTrail>
}
