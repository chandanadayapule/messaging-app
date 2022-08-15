# Introduction - Messaging App 

Simple messaging app that allows users to send and receive messages to and from other users.
This app consists of both backend application build in Django and frontend build in React.
stpPostgreSQL database is used for all the data storage.

## Functional Requirements

List of functional requirements presented in the code includes:

* Login
* Save authentication token for skipping login after first time 
* Messaging functionality from user A to user B
* View list of messages received
* View list of messages sent
* Delete functionality to delete individual message 
* Compose a new message which includes recipient and body
* Error messages if the requests are invalid

## Getting Started

### Backend Execution

Backend is developed using Django framework and postgresql database.  
Requriments -  python3.8/3.9 


### Steps 
1. Create a virutal environment 
```bash
python3 -m venv <backend-root-folder>/venv

source venv/bin/activate
``` 

2. Install requirments.txt 
```bash
pip3 install -r requirements.txt
```

3. Install postgresql server in local machine (if not already installed)
```
Follow the link for postgres installation - https://www.postgresql.org/download/
```

4. Configure username and password for postgresql 
```
go to messaging-app-backend/src/django_messaging_service/setting.py

Update database infromation under CORS_ORIGIN_WHITELIST field 
```


5. Running the backend engine 

```bash
cd src
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```


6. For creating an user, please use the following api endpoint 

```bash
http://127.0.0.1:8000/api/account/register/

POST 
{
"email"     : "test1@appgmail.com",
"username"  : "test1",
"password"  : "1234"

}
```



### Frontend Execution 
Frontend is implemented using ReactJs framework

1. Requirments to run the app on localhost 

```bash
a. install node latest version (v16.16.0)  

b. installing npm latest version  (8.17.0) 

More details for installing node, npm - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
```
2. Go to the frontend app root directory and run the following command

```bash
npm install
```
3. After installing the packages you can run the app in development environment by running the following command

```bash
npm run dev 
```
Go to ```localhost:3000``` to view the app in the browser
  


[Optional] --> Frontend Production deployment

1.  To create a production bundle, run following command,
 
 ```bash
 npm run build
 
 ``` 

2. For running the bundle you need to run the command,
 ```npm start```
 This will start the production server and the application can be viewed on ```localhost:3000``` 




## Authors

Contributor details and contact info

Chandana Dayapule  
(https://www.linkedin.com/in/chandanad/)
