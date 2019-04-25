pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Checkout source') {
        steps {
            slackSend message: 'Integrated Support Tool build/deploy started.'
            checkout scm
        }
    }
    stage('Resolve npm dependencies') {
        steps {
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
            slackSend color: 'good', message: 'Integrated Support Tool successfully deployed. (https://anettool-dev.azurewebsites.net) '
        }
    }
    stage('Cleanup') {
        steps {
            echo 'prune and cleanup'
            sh 'npm prune'
            sh 'rm node_modules -rf'
        }
    }
  }
  post {
        failure {
            slackSend color: 'danger', message: 'Integrated Support Tool build/deploy failed.'
        }
    }
}
