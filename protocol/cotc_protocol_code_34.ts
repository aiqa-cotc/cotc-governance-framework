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
