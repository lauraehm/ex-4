#!/usr/bin/env groovy

pipeline { /* The main definition where all our code will go */
 agent none
 environment { 
   registryCredential = 'dockerhub_id' 
 }
/*  
Where our code will be executed. 
We can specify multiple agents including special EC2 instances, 
docker images, any available instance, or none at all.
 

Q: If you don't specify any agent, what does that mean? 
A: When applied at the top-level of the pipeline block no global agent will be allocated for the entire Pipeline run and each stage section will need to contain its own agent section
*/

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
         // sh "docker build -t lauraehmata/todo-frontend:${GIT_COMMIT} -f Frontend/Dockerfile ./Frontend"
         // sh "docker push lauraehmata/todo-frontend:${GIT_COMMIT}"
         script {
          dockerImage = docker.build "lauraehmata/todo-frontend:${GIT_COMMIT}"
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("lauraehmata/todo-frontend:${GIT_COMMIT}")
          }
        }
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