# Flask Server

Provides API end point to coomunicate with chrome extension

## How to run Flask API?
- Step 1:
Clone the repo
- Step 2: 
Go to folder Flask API
- Step 3:
Install all the packages: `pip install -r requirements.txt`
- Step 5:

```
set FLASK_APP=server.py
flask run
```

The server will run on port `5000`


## How to call the Flask API?

### Register
- **API Call:** `http://127.0.0.1:5000/api/auth/register` 
- **Request Method:** post
- **Body**: 
    - Content type : Application/Json
 ```{
    "email": "rashikakarki9841@gmail.com",
    "password": "123456"
}
``` 

- **Returns:** text

```
Success
```


### Login
- **API Call:** `http://127.0.0.1:5000/api/auth/login` 
- **Request Method:** post
- **Body**: 
    - Content type : Application/Json
```
{
    "email": "rashikakarki9841@gmail.com",
    "password": "123456"
}
```
- **Returns:** JSON
```javascript
{
    "jwt_token": "eyJ0eXAiOadsd.......8VdcTdRYrvlDfWKQqX8"
}
```
