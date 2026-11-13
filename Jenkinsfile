pipeline {
    agent any

    environment {
        DOCKER = '"C:\\Users\\PREETHIKA\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/velagadapreethika0504-cloud/Online_Grocery_Delivery.git'
            }
        }

        stage('Docker Build') {
            steps {
                bat "${DOCKER} build -t freshcart:1.0 ."
            }
        }

        stage('Deploy') {
            steps {
                bat """
                ${DOCKER} rm -f freshcart-updated 2>NUL
                ${DOCKER} run -d -p 8082:80 --name freshcart-updated freshcart:1.0
                """
            }
        }
    }
}