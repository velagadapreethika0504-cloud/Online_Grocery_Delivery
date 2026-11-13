pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build --no-cache -t freshcart:7.0 .'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                docker rm -f freshcart-v7 2>NUL
                docker run -d -p 8082:80 --name freshcart-v7 freshcart:7.0
                '''
            }
        }
    }
}