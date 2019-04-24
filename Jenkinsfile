pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Checkout Source') {
        steps {
            checkout scm
        }
    }
    stage('Resolve npm Dependencies') {
        steps {
            sh 'npm install'
        }
    }
    stage('Build') {
        steps {
            sh 'npm run ng build -- --prod'
        }
    }
    stage('Unit Tests') {
        steps {
            sh 'npm run ng test -- --no-watch'
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
}
