To start backend:  
```$ cd backend```  
```$ python manage.py runserver```  
```$ redis-server```  
```$ celery -A proj worker --loglevel=info```  

To start frontend:
- `cd frontend`
- `npm install`
- `npm start`
- modify the path to `http://localhost:3000/story-to-plots`