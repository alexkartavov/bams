pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }
    stage('Resolve Dependencies') {
        steps {
            sh 'npm install'
        }
    }
    stage('Build') {
        steps {
            sh 'npm run ng build -- --prod'
        }
    }
    stage("Deploy"){
        when { branch 'master' }
        steps {
            azureWebAppPublish ([
                appName: "anettool", 
                azureCredentialsId: "bams-cep-jenkins-nonProd-ue-sp", 
                resourceGroup: "BAMSCEP-SupportTool-App",
                slotName: 'anettool-dev',
                filePath: "**/*.*",
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
