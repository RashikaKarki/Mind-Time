# Mind Time

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/RashikaKarki/WomenHack.svg)](https://github.com/RashikaKarki/WomenHack/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/RashikaKarki/WomenHack.svg)](https://github.com/RashikaKarki/WomenHack/pulls)

![Womenhack](https://github.com/RashikaKarki/WomenHack/blob/main/figma%20design.JPG)



A Mozilla Firefox browser extension that reminds you to take mental health breaks and practice self care!

A hackathon project completed for [Women/Hacks 3.0](https://www.womxnhacks.com/)  


Self care is often a second thought, and we wanted more women to put their mental health first. Many women spend a lot of time on the internet, whether they are working, browsing social media, or reading the news. Without adequate self-care, any of these activities can negatively impact mental health. This is why we decided to create a browser extension to send self-care reminders that could directly target women while they use the internet. 

## What it does
Once a user logs in, the extension will track their browser usage time. Users can set the frequency of self-care reminders. At the specified time interval, a notification will pop-up, reminding them to take a break. The extension viewer will also provide random suggestions of activities the user could do, and a link to any relevant resources. 

# How To Launch:

## Firefox Extension

1. Clone this repository
2. In a Firefox browser, type `about:debugging` in the address bar
3. Click "This Firefox" 
4. Click "Load Temporary Add-on" and select the manifest.json file


## How to run Flask API?

- Step 1:
Clone the repo
- Step 2: 
Go to folder Flask API
- Step 3:
Install all the packages: `pip install -r requirements.txt`
- Step 5:

```
set FLASK_APP=app.py
flask run
```

The server will run on port `5000`

**Optionally the API is hosted as `https://womenhack1.herokuapp.com/`**


## How to call the Flask API?

## Register
- **API Call:** `http://127.0.0.1:5000/api/auth/register` 
- **Request Method:** post
- **Body**: 
    - Content type : Application/Json
 ```
 {
    "email": "rashikakarki9841@gmail.com",
    "password": "123456"
}
``` 

- **Returns:** text

```
Success
```


## Login
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



## User Daily Detail

- **API Call:** `http://127.0.0.1:5000/api/userlog/getdetails` 
- **Query Param:**
```
token = eyJ0eXAiOadsd.......8VdcTdRYrvlDfWKQqX8
```
- **Request Method:** get
- **Returns:** JSON
```javascript

    {
        "last_break_activity": null,
        "total_break_taken": 0,
        "total_time_min": 0
    }

```


## Send URL

- **API Call:** `http://127.0.0.1:5000/api/userlog/send_url` 
- **Request Method:** post
- **Body**: 
    - Content type : Application/Json
```
{
    "token": "eyJ0eXAiOadsd.......8VdcTdRYrvlDfWKQqX8",
    "url": url of the page user switched or went to,
    "prev_url": url of the page user switched from
}
```
- **Returns:** JSON
```javascript
{
    "message": "success!"
}
```


## Quit URL

- **API Call:** `http://127.0.0.1:5000/api/userlog/quit_url` 
- **Request Method:** post
- **Body**: 
    - Content type : Application/Json
```
{
    "token": "eyJ0eXAiOadsd.......8VdcTdRYrvlDfWKQqX8",
    "url": url of the page user quit
}
```
- **Returns:** JSON
```javascript
{
    "message": "success!"
}
```


### Random Task

- **API Call:** `http://127.0.0.1:5000/api/userlog/randomtask` 
- **Query Param:**
```
token = eyJ0eXAiOadsd.......8VdcTdRYrvlDfWKQqX8
```
- **Request Method:** get
- **Returns:** JSON
```javascript

    {
        "last_break_activity": null,
        "total_break_taken": 0,
        "total_time_min": 0
    }

```



**Team Members:** Rashika, Jennifer, Akansha, Nicole
