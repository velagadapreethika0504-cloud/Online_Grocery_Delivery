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
                bat '"C:\\Users\\PREETHIKA\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build --no-cache -t freshcart:7.0 .'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                "C:\\Users\\PREETHIKA\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" rm -f freshcart-v7 2>NUL
                "C:\\Users\\PREETHIKA\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" run -d -p 8082:80 --name freshcart-v7 freshcart:7.0
                '''
            }
        }
    }
}