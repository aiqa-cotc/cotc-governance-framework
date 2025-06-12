-- contracts table
CREATE TABLE contracts (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  version VARCHAR(50) NOT NULL,
  contract_type VARCHAR(50) NOT NULL,
  schema_version VARCHAR(20) NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  -- NEW: Security extensions
  content_hash VARCHAR(64) NOT NULL, -- SHA-256 hash for integrity
  signature VARCHAR(512), -- Cryptographic signature
  validator_requirements JSONB, -- Diversity requirements
  -- Indexing for performance
  INDEX idx_contracts_type (contract_type),
  INDEX idx_contracts_active (is_active),
  INDEX idx_contracts_created (created_at),
  INDEX idx_contracts_hash (content_hash)
);

-- validation sessions table
CREATE TABLE validation_sessions (
  id UUID PRIMARY KEY,
  contract_id UUID REFERENCES contracts(id),
  status VARCHAR(50) NOT NULL,
  input_data JSONB,
  results JSONB,
  confidence_score DECIMAL(3,2),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  -- NEW: tracking
  validator_ensemble JSONB, -- Which validators were used
  diversity_score DECIMAL(3,2), -- Validator diversity achieved
  human_review_required BOOLEAN DEFAULT false,
  review_priority INTEGER,
  threshold_adjustments JSONB, -- Any dynamic adjustments made
  -- Performance indexes
  INDEX idx_sessions_status (status),
  INDEX idx_sessions_contract (contract_id),
  INDEX idx_sessions_started (started_at),
  INDEX idx_sessions_review (human_review_required, review_priority)
);

-- NEW: agent registry table
CREATE TABLE agents (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  version VARCHAR(50) NOT NULL,
  capabilities JSONB NOT NULL,
  endpoint_url VARCHAR(500) NOT NULL,
  health_check_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- NEW: Security and diversity fields
  architecture_type VARCHAR(100), -- rule-based, ml, llm, hybrid
  training_data_source VARCHAR(255),
  vendor VARCHAR(100),
  security_clearance VARCHAR(50),
  integrity_hash VARCHAR(64),
  last_integrity_check TIMESTAMP WITH TIME ZONE,
  diversity_group VARCHAR(100), -- For ensuring diverse ensembles
  UNIQUE(name, version)
);

-- NEW: Cryptographic audit trail table
CREATE TABLE cryptographic_audit_trail (
  id UUID PRIMARY KEY,
  validation_session_id UUID REFERENCES validation_sessions(id),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  previous_hash VARCHAR(64), -- Hash of previous entry for chain integrity
  current_hash VARCHAR(64) NOT NULL, -- Hash of this entry
  signature VARCHAR(512), -- Cryptographic signature
  validator_id UUID REFERENCES agents(id),
  immutable BOOLEAN DEFAULT true,
  INDEX idx_audit_session (validation_session_id),
  INDEX idx_audit_type (event_type),
  INDEX idx_audit_timestamp (timestamp),
  INDEX idx_audit_hash (current_hash)
);
