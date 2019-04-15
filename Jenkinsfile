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
    stage('Artifactory Push') {
        steps {
            zip zipFile: 'output.zip', archive: false, dir: 'dist'
            rtUpload (
                serverId: "mcgbams",
                spec:
                    """ {
                    "files": [
                        {
                            "pattern": "output.zip",
                            "target": "integrated-support-tool/ui"
                        }
                    ]
                }"""
            )
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
