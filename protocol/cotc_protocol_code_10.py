import asyncio  # Required to run async functions
# Ensure cotc_enterprise is installed: pip install cotc-enterprise
from cotc_enterprise import COTCValidator, ValidationRequest

# Initialize validator
validator = COTCValidator(
    api_key="your-api-key",
    contract_path="./contracts/ai-security.json"
)

async def main():  # Wrap await call in an async function
    # Validate AI output
    result = await validator.validate(
        content="AI-generated content to validate",
        metadata={
            "source": "gpt-4",
            "use_case": "customer_communication",
            "risk_level": "high"
        }
    )

    if result.approved:
        print(f"Content approved with {result.confidence:.2%} confidence")
        # Deploy to production
    else:
        print("Content requires review:")
        for finding in result.findings:
            print(f"- {finding.severity}: {finding.description}")

if __name__ == "__main__":
    asyncio.run(main())
