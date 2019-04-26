pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Resolve npm dependencies') {
        steps {
            slackSend message: "Integrated Support Tool build/deploy #${env.BUILD_NUMBER} started."
            sh 'npm install'
        }
    }
    stage('Run unit tests') {
        steps {
            sh "npm run ng test -- --no-watch --browsers 'ChromeHeadless'"
        }
    }
    stage('Build') {
        steps {
            sh 'npm run ng build -- --prod'
        }
    }
    stage("Deploy to Azure App Service"){
        when { branch 'master' }
        steps {
            azureWebAppPublish ([
                appName: "anettool", 
                azureCredentialsId: "jenkins-cep-sp", 
                resourceGroup: "BAMSCEP-SupportTool-App",
                slotName: 'dev',
                sourceDirectory: 'dist/ng-supporttool',
                filePath: "**/*",
            ])
            slackSend color: 'good', message: "Integrated Support Tool #${env.BUILD_NUMBER} successfully deployed.\nhttps://anettool-dev.azurewebsites.net"
        }
    }
  }
  post {
        failure {
            slackSend color: 'danger', message: "Integrated Support Tool build/deploy #${env.BUILD_NUMBER} failed: (<${env.BUILD_URL}|Open>)"
        }
        always {
            cleanWs()
        }
    }
}
