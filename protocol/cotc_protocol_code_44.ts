// ValidatorIntegrityFramework Interface for COTC Protocol
interface ValidatorIntegrityFramework {
  // Supply chain security
  verifyValidatorSupplyChain(validatorId: string): Promise<SupplyChainVerification>
  auditValidatorDependencies(validatorId: string): Promise<DependencyAudit>
  validateCryptographicSignatures(validatorPackage: ValidatorPackage): Promise<SignatureVerification>
  
  // Continuous monitoring
  monitorValidatorBehavior(validatorId: string): Observable<BehaviorMetrics>
  detectValidatorAnomaly(behaviorMetrics: BehaviorMetrics): Promise<AnomalyAssessment>
  isolateCompromisedValidator(validatorId: string): Promise<IsolationResult>
  
  // Adversarial testing
  executeAdversarialTests(validatorId: string): Promise<AdversarialTestResult>
  simulateCoordinatedAttack(validatorIds: string[]): Promise<AttackSimulationResult>
  testMetaDeceptionResistance(validatorEnsemble: ValidatorEnsemble): Promise<MetaDeceptionTestResult>
}

// Supporting interfaces
interface SupplyChainVerification {
  validatorId: string
  verified: boolean
  supply_chain_integrity: 'verified' | 'compromised' | 'unknown'
  certificate_chain: Certificate[]
  vulnerability_scan_results: VulnerabilityResult[]
  last_verification: Date
  issues: SupplyChainIssue[]
}

interface DependencyAudit {
  validatorId: string
  dependencies: Dependency[]
  vulnerabilities: Vulnerability[]
  compliance_status: 'compliant' | 'non_compliant' | 'unknown'
  audit_timestamp: Date
  recommendations: string[]
}

interface ValidatorPackage {
  validatorId: string
  version: string
  package_hash: string
  digital_signature: string
  certificate: Certificate
  metadata: PackageMetadata
}

interface SignatureVerification {
  valid: boolean
  certificate_valid: boolean
  chain_of_trust_verified: boolean
  timestamp_valid: boolean
  issues: string[]
}

interface BehaviorMetrics {
  validatorId: string
  timestamp: Date
  response_times: number[]
  accuracy_metrics: AccuracyMetric[]
  confidence_distributions: ConfidenceDistribution[]
  pattern_analysis: PatternAnalysis
  anomaly_scores: AnomalyScore[]
}

interface AnomalyAssessment {
  validatorId: string
  anomaly_detected: boolean
  anomaly_type: 'performance' | 'behavioral' | 'security' | 'confidence'
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence_score: number
  details: string
  recommended_actions: string[]
}

interface IsolationResult {
  validatorId: string
  isolation_successful: boolean
  isolation_timestamp: Date
  isolation_reason: string
  backup_validators_deployed: ValidatorInfo[]
  estimated_recovery_time: number
}

interface AdversarialTestResult {
  validatorId: string
  test_suite: string
  overall_score: number
  individual_test_results: TestResult[]
  vulnerabilities_detected: Vulnerability[]
  resistance_rating: 'low' | 'medium' | 'high' | 'excellent'
  recommendations: string[]
}

interface AttackSimulationResult {
  simulation_id: string
  target_validators: string[]
  attack_scenarios: AttackScenario[]
  success_rate: number
  detected_weaknesses: Weakness[]
  mitigation_strategies: MitigationStrategy[]
}

interface MetaDeceptionTestResult {
  ensemble_id: string
  deception_tests: DeceptionTest[]
  overall_resistance: number
  weakest_validators: ValidatorWeakness[]
  ensemble_improvements: string[]
  certification_level: 'basic' | 'intermediate' | 'advanced' | 'expert'
}
