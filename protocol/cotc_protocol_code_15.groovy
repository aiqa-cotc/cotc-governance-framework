pipeline {
    agent any
    
    stages {
        stage('AI Content Validation') {
            steps {
                script {
                    sh '''
                        cotc validate-enterprise \
                            --contract contracts/production.json \
                            --content-dir ./ai-output \
                            --stakeholder-notify \
                            --audit-blockchain
                    '''
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cotc-audit-*.json'
                    publishTestResults testResultsPattern: 'cotc-junit.xml'
                }
            }
        }
    }
}
