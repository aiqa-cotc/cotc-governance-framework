"""
COTC Protocol Python SDK Integration Example
Demonstrates enterprise integration patterns
"""

import asyncio
import logging
from typing import Dict, List, Optional
from cotc_sdk import COTCClient, ValidationRequest, ContractConfig
from cotc_sdk.exceptions import COTCValidationError, COTCTimeoutError

class EnterpriseAIGovernance:
    """
    Enterprise wrapper for COTC Protocol integration
    Handles authentication, retry logic, and enterprise patterns
    """

    def __init__(self, config: Dict):
        self.client = COTCClient(
            api_key=config['api_key'],
            base_url=config['base_url'],
            timeout=config.get('timeout', 300),
            retry_config=config.get('retry_config', {
                'max_retries': 3,
                'backoff_factor': 2.0,
                'retry_statuses': [429, 500, 502, 503, 504]
            })
        )
        self.logger = self._setup_logging()
        self.default_contracts = self._load_contracts(config['contracts'])

    def _setup_logging(self) -> logging.Logger:
        """Configure enterprise logging standards"""
        logger = logging.getLogger('cotc_integration')
        logger.setLevel(logging.INFO)

        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

        return logger

    def _load_contracts(self, contract_configs: Dict) -> Dict[str, str]:
        """Load predefined contracts for different use cases"""
        contracts = {}
        for use_case, contract_id in contract_configs.items():
            contracts[use_case] = contract_id
            self.logger.info(f"Loaded contract {contract_id} for {use_case}")
        return contracts

    async def validate_ai_output(
        self,
        content: str,
        use_case: str,
        metadata: Optional[Dict] = None,
        priority: str = 'medium',
        timeout: Optional[int] = None
    ) -> Dict:
        """
        Validate AI-generated content through COTC Protocol

        Args:
            content: The AI-generated content to validate
            use_case: The business use case (maps to contract)
            metadata: Additional context for validation
            priority: Validation priority level
            timeout: Custom timeout for this validation

        Returns:
            Validation result with approval status and details
        """
        try:
            # Get appropriate contract for use case
            contract_id = self._get_contract_for_use_case(use_case)

            # Prepare validation request
            request = ValidationRequest(
                content=content,
                contract_id=contract_id,
                metadata=metadata or {},
                priority=priority,
                requester={
                    'system': 'enterprise_ai_platform',
                    'use_case': use_case,
                    'timestamp': self._get_timestamp()
                }
            )

            self.logger.info(
                f"Submitting validation request for {use_case} "
                f"with contract {contract_id}"
            )

            # Submit validation
            validation_id = await self.client.submit_validation(request)
            self.logger.info(f"Validation submitted: {validation_id}")

            # Wait for completion
            result = await self.client.wait_for_completion(
                validation_id,
                timeout=timeout or 300
            )

            # Process result
            processed_result = self._process_validation_result(result)

            self.logger.info(
                f"Validation completed: {validation_id} - "
                f"Result: {processed_result['status']}"
            )

            return processed_result

        except COTCValidationError as e:
            self.logger.error(f"Validation error: {e}")
            return self._create_error_result(str(e), 'validation_error')

        except COTCTimeoutError as e:
            self.logger.error(f"Validation timeout: {e}")
            return self._create_error_result(str(e), 'timeout')

        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            return self._create_error_result(str(e), 'system_error')

    def _get_contract_for_use_case(self, use_case: str) -> str:
        """Map business use case to appropriate COTC contract"""
        if use_case not in self.default_contracts:
            raise ValueError(f"Unknown use case: {use_case}")
        return self.default_contracts[use_case]

    def _process_validation_result(self, result: Dict) -> Dict:
        """Process raw validation result into enterprise format"""
        return {
            'validation_id': result['validationId'],
            'status': result['overallResult'],
            'approved': result['overallResult'] == 'approved',
            'confidence': result['confidence'],
            'requires_human_review': result['humanReviewRequired'],
            'findings': self._extract_findings(result['validatorResults']),
            'audit_trail_hash': result['auditTrailHash'],
            'processing_time': result['totalProcessingTime'],
            'stakeholder_notifications': result.get('stakeholderNotifications', [])
        }

    def _extract_findings(self, validator_results: List[Dict]) -> List[Dict]:
        """Extract and categorize validation findings"""
        findings = []
        for validator_result in validator_results:
            for finding in validator_result.get('findings', []):
                findings.append({
                    'validator': validator_result['validatorName'],
                    'type': finding['type'],
                    'severity': finding['severity'],
                    'category': finding['category'],
                    'description': finding['description'],
                    'recommendation': finding.get('recommendation'),
                    'location': finding.get('location')
                })
        return findings

    def _create_error_result(self, error_message: str, error_type: str) -> Dict:
        """Create standardized error result"""
        return {
            'validation_id': None,
            'status': 'error',
            'approved': False,
            'error_type': error_type,
            'error_message': error_message,
            'confidence': 0.0,
            'requires_human_review': True,
            'findings': [],
            'processing_time': None
        }

    def _get_timestamp(self) -> str:
        """Get ISO timestamp for audit purposes"""
        from datetime import datetime
        return datetime.utcnow().isoformat() + 'Z'

    async def get_validation_metrics(
        self,
        time_range: str = '24h',
        use_cases: Optional[List[str]] = None
    ) -> Dict:
        """
        Retrieve validation metrics for monitoring and reporting

        Args:
            time_range: Time range for metrics (1h, 24h, 7d, 30d)
            use_cases: Specific use cases to include

        Returns:
            Comprehensive metrics for the specified period
        """
        try:
            metrics = await self.client.get_metrics(
                time_range=time_range,
                filters={
                    'use_cases': use_cases
                } if use_cases else None
            )

            return self._process_metrics(metrics)

        except Exception as e:
            self.logger.error(f"Error retrieving metrics: {e}")
            return {}

    def _process_metrics(self, raw_metrics: Dict) -> Dict:
        """Process raw metrics into enterprise reporting format"""
        return {
            'summary': {
                'total_validations': raw_metrics['summary']['totalValidations'],
                'success_rate': raw_metrics['summary']['successRate'],
                'average_processing_time': raw_metrics['summary']['averageProcessingTime'],
                'human_review_rate': raw_metrics['summary']['humanReviewRate']
            },
            'reliability': {
                'accuracy_rate': raw_metrics['reliability']['accuracyRate'],
                'false_positive_rate': raw_metrics['reliability']['falsePositiveRate'],
                'failure_prevention_rate': raw_metrics['reliability']['failurePreventionRate']
            },
            'compliance': {
                'compliance_score': raw_metrics['compliance']['complianceScore'],
                'violations_prevented': raw_metrics['compliance']['violationsPrevented'],
                'audit_readiness_score': raw_metrics['compliance']['auditReadinessScore']
            },
            'efficiency': {
                'review_time_reduction': raw_metrics['efficiency']['reviewTimeReduction'],
                'cost_savings': raw_metrics['efficiency']['costSavings'],
                'automation_rate': raw_metrics['efficiency']['automationRate']
            }
        }

# Usage Example
async def main():
    """Example usage of the COTC integration"""

    # Configuration
    config = {
        'api_key': 'your-api-key',
        'base_url': 'https://api.cotc-protocol.com/V1.0',
        'timeout': 300,
        'contracts': {
            'financial_content': 'fin-content-001',
            'customer_communication': 'customer-comm-001',
            'code_generation': 'code-gen-sec-001',
            'medical_content': 'medical-content-001'
        }
    }

    # Initialize governance system
    governance = EnterpriseAIGovernance(config)

    # Example: Validate AI-generated financial content
    financial_content = """
    Based on our Q3 analysis, we recommend increasing 
    investment allocation to emerging markets by 15%...
    """

    result = await governance.validate_ai_output(
        content=financial_content,
        use_case='financial_content',
        metadata={
            'document_type': 'investment_recommendation',
            'target_audience': 'institutional_clients',
            'risk_level': 'high'
        },
        priority='high'
    )

    if result['approved']:
        print("Content approved for publication")
        print(f"Confidence: {result['confidence']:.2%}")
    else:
        print("Content requires revision")
        for finding in result['findings']:
            print(f"- {finding['severity']}: {finding['description']}")

    # Get performance metrics
    metrics = await governance.get_validation_metrics(time_range='7d')
    print(f"Weekly success rate: {metrics['summary']['success_rate']:.2%}")

if __name__ == "__main__":
    asyncio.run(main())
