## Libraries Used

- Django REST Framework `djangorestframework`
- Simple JWT `djangorestframework_simplejwt` 

## Quickstart

- Install Packages `pip install -r requirements.txt`
- Run Server `python manage.py runserver`


## Useful Commands

### Login and get JWT Token

```
curl   -X POST   -H "Content-Type: application/json"   -d '{"username": "username", "password": "password"}'   http://localhost:8000/api/token/
```

#### Make Request to Protected Route with JWT Auth token

```
curl \
  -H "Authorization: Bearer <JWT_GOES_HERE>" \
  http://localhost:8000/api/protected/
```
