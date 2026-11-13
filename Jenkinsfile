pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/velagadapreethika0504-cloud/Online_Grocery_Delivery.git'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t freshcart:1.0 .'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                docker rm -f freshcart-updated 2>NUL
                docker run -d -p 8082:80 --name freshcart-updated freshcart:1.0
                '''
            }
        }
    }
}