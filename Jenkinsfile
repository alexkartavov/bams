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
            echo 'Deploying to Azure App Service'
            configFileProvider([configFile(fileId: '7c3b1d3c-50f3-4499-984d-885eb1c0ba5b', variable: 'AzureCredentialsId')]) {
                echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
                sh "cat ${env.AzureCredentialsId}"
                echo " =========== ~~~~~~~~~~~~ ============ "
            }
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
