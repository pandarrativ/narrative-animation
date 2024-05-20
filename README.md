## Quick Start

Get mongodb ready for backend:
```$ brew services start mongodb-community # start mongodb```  
```$ mongosh```  
```>>> use animation # create a db called animation```  
```>>> db.createCollection("story") # create a collection called story```  

To start backend:  
```$ ollama run llama3 # you might have to install ollama first```  
```$ cd backend```  
```$ python manage.py runserver # start django server```  

To start frontend:
- `cd frontend`
- `npm install`
- `npm start`