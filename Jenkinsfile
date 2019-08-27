
pipeline {
    agent none 

    stages {
      stage('test') {
        agent {
          dockerfile {
            filename 'Dockerfile-test'
          }
        }
        steps {
          sh 'cd /app; ng test --watch=false'
          sh 'cd /app; ng e2e --port 4202 '
        }
      }
      stage('Build') {
          agent any
          steps {
            script {
              def image = docker.build("ng-calendar:latest")
            }

          }
      }
    }
}
