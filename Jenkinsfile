#!/usr/bin/env groovy

pipeline { /* The main definition where all our code will go */
 agent none
 environment { 
    DOCKER_USER = credentials('dockerhub_id_user')
    DOCKER_PASS = credentials('dockerhub_id_password')
 }

 stages { /* The stages that will form our pipeline */
   stage('Unit test frontend.') {
     agent any

    /*  Steps that our pipeline will execute, this can be groovy instructions or shell commands using the sh instruction. 
    
    Q: What are Groovy instructions?
    */
     steps {
        sh "docker build -t frontend-tests -f Frontend/Dockerfile.unit-test ./Frontend"
        sh "docker run frontend-tests"
     }
   }
   stage('Build frontend') {
     agent any
     when { /*  Specifies a condition, in this case, some steps will only execute if run in the main branch. */
       branch 'main'
     }
     steps {
         sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
         sh "docker build -t lauraehmata/todo-frontend:${GIT_COMMIT} -f Frontend/Dockerfile ./Frontend"
         sh "docker push lauraehmata/todo-frontend:${GIT_COMMIT}"
     }
   }
   stage('Unit test backend') {
     agent any

     steps {
         sh "docker build -t backend-tests -f Backend/Dockerfile.unit-test ./Backend"
     }
   }
   stage('Build backend') {
     agent any
     when {
       branch 'main'
     }
     steps {
         sh "docker build -t lauraehmata/todo-backend:${GIT_COMMIT} -f Backend/Dockerfile ./Backend"
         sh "docker push lauraehmata/todo-backend:${GIT_COMMIT}"
     }
   }
   stage('Cleanup tests'){
     agent any
     steps {
       sh "docker rmi -f frontend-tests"
       sh "docker rmi -f backend-tests"
     }
   }
   stage('Cleanup images'){
     agent any
     when {
       branch 'main'
     }
     steps {
       sh "docker rmi -f lauraehmata/todo-frontend:${GIT_COMMIT}"
       sh "docker rmi -f lauraehmata/todo-backend:${GIT_COMMIT}"
     }
   }
 }
}