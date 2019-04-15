pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }
    stage('Build') {
        steps {
            sh 'npm install'
            sh 'npm run ng build -- --prod'
        }
    }
    stage("Deploy"){
        when { branch 'master' }
        steps {
            azureWebAppPublish
                appName: "anettool",
                azureCredentialsId: 'bams-cep-jenkins-sp',
                resourceGroup: "BAMSCEP-SupportTool-App",
                slotName "anettool-dev"
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
