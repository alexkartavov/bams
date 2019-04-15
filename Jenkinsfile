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
                azureCredentialsId: "jenkins-cep-sp", 
                resourceGroup: "BAMSCEP-SupportTool-App",
                slotName: 'dev',
                sourceDirectory: 'dist/ng-supporttool'
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
