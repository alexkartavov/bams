pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
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
    stage("Deploy to Azure App Service (Dev)"){
        when { branch 'develop' }
        steps {
            azureWebAppPublish ([
                appName: "bams-cep-ist-dev-ue-app", 
                azureCredentialsId: "jenkins-cep-sp", 
                resourceGroup: "bams-cep-ist-dev-ue-rg",
                sourceDirectory: 'dist/ng-supporttool',
                filePath: "**/*",
            ])
            slackSend color: 'good', message: "Integrated Support Tool deployed (dev => ${env.BUILD_NUMBER})\nhttps://bams-cep-ist-dev-ue-app.azurewebsites.net/"
        }
    }
    stage("Deploy to Azure App Service (QA)"){
        when { branch 'test' }
        steps {
            azureWebAppPublish ([
                appName: "bams-cep-ist-qa-ue-app", 
                azureCredentialsId: "jenkins-cep-sp", 
                resourceGroup: "bams-cep-ist-qa-ue-rg",
                sourceDirectory: 'dist/ng-supporttool',
                filePath: "**/*",
            ])
            slackSend color: 'good', message: "Integrated Support Tool deployed (qa => ${env.BUILD_NUMBER})\nhttps://bams-cep-ist-qa-ue-app.azurewebsites.net/"
        }
    }
    stage("Deploy to Azure App Service (UAT)"){
        when { branch 'master' }
        steps {
            azureWebAppPublish ([
                appName: "bams-cep-ist-uat-ue-app", 
                azureCredentialsId: "jenkins-cep-sp", 
                resourceGroup: "bams-cep-ist-uat-ue-rg",
                sourceDirectory: 'dist/ng-supporttool',
                filePath: "**/*",
            ])
            slackSend color: 'good', message: "Integrated Support Tool deployed (uat => ${env.BUILD_NUMBER})\nhttps://bams-cep-ist-uat-ue-app.azurewebsites.net/"
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
