pipeline {
    agent any
    parameters {
        choice(name: 'ENV', choices: "dev\ndev2\nsit\nuat\nprod", description: 'ENVIRONMENT')
        string(name: 'RELEASE_VERSION', defaultValue: '1', description: 'App major release version')
        string(name: 'FEATURE_VERSION', defaultValue: '0', description: 'App feature version version')
    }

    stages {
        stage('Preparation') {
            steps {
                git url: 'ssh://git@stash.ryanair.com:7999/ryrota/extranet-landing-pages.git', branch: 'master'
            }
        }
        stage('Install dependencies') {
            steps {
                sh "'/usr/bin/yarn' install"
            }
        }
        stage('Build application') {
            steps {
                sh "'/usr/bin/npm' run build"
            }
        }
        stage('Deploy new version') {
            steps {
                sh "'/usr/bin/aws' s3 sync build/ 's3://${params.ENV}-myrooms.ryanair.com/booking'"
            }
        }
    }
}
