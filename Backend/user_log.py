from flask import Blueprint, request, Response, jsonify
from util import db_read, db_write, db_update
from settings import JWT_SECRET_KEY
import jwt

import time
from datetime import date


userlog = Blueprint("userlog", __name__)

def update_main_time(current_userid, time_spent):
    today = date.today()

    # Get the user daily data from database
    user_daily_detail = db_read("""SELECT * FROM user_time WHERE user_id = %s AND entry_date = %s""", (current_userid, today))

    # Check if the user has daily entry
    
    if len(user_daily_detail) == 0
        if db_write("""INSERT INTO user_time (user_id, entry_date, total_time_min, total_break_taken, last_break_activity ) VALUES (%s,%s,%s,%s,%s)""", (userId, today, time_spent, 0, None)):        
            pass
        else:
            return Response(status=409)
    else:
        total_time = dict(user_daily_detail[0])['total_time_min']
        total_time = total_time + time_spent
        if db_update("""UPDATE user_time set total_time_min = %s WHERE user_id = %s AND entry_date = %s """, (total_time, userId,today)):
            pass
        else:
            return Response(status=409)





def url_strip(url):
    if "http://" in url or "https://" in url:
        url = url.replace("https://", '').replace("http://", '') 
            .replace('\"', '')
    if "/" in url:
        url = url.split('/', 1)[0]
    return url


'''
API to log when tab is opened
'''
@app.route('/send_url', methods=['POST'])
def send_url():
    token = request.json["token"]
    #Validating the token submitted
    if not token:
        return jsonify({'message' : 'Token is missing!'}),403
    try:
        data = jwt.decode(token, JWT_SECRET_KEY, algorithm="HS256")
    except:
        return jsonify({'message' : 'Token is invalid!'}),403
    data = dict(data)
    # Access the identity of the current user with get_jwt_identity
    current_userid = data['id']
    # Get the url that the user is browsing
    url = request.json["url"]
    parent_url = url_strip(url)
    today = date.today()
    # Get the user daily data from database
    user_daily_detail = db_read("""SELECT * FROM user_activity WHERE user_id = %s AND website_name = %s AND entry_date = %s""", (current_userid, parent_url, today))
    # Check if the user has daily entry
    if len(user_daily_detail) == 0:
        if db_write("""INSERT INTO user_activity (user_id, entry_date, total_time_min, website_name, recent_visit_time, previous_website_id) VALUES (%s,%s,%s,%s)""", (current_userid, today, 0, parent_url, time.time(), None)):
            pass
        else:
            return Response(status=409)
    else:
        if db_update("""UPDATE user_activity set recent_visit_time = %s WHERE user_id = %s AND website_name = %s AND entry_date = %s """, (time.time(), current_userid, parent_url, today)):
            pass
        else:
            return Response(status=409)

    # check if any browser was opened previously
    try:
        prev_url = request.json["prev_url"]
        data = dict(db_read("""SELECT * FROM user_activity WHERE user_id = %s AND website_name = %s AND entry_date = %s""", (current_userid, prev_url, today))[0])
        recent_visit = data['recent_visit_time']
        if recent_visit != None:
            total_time = data['total_time_min']
            time_spent = int(time.time() - recent_visit)
            total_time = total_time + time_spent
            # updating the database
            if db_update("""UPDATE user_activity set total_time_min = %s, recent_visit_time = %s WHERE user_id = %s AND website_name = %s AND entry_date = %s """, (total_time, None, current_userid, prev_url, today)):
                update_main_time(current_userid, time_spent)
            else:
                return Response(status=409)
    except:
        pass

    return jsonify({'message': 'success!'}), 200



'''
API to log when tab is closed 
'''
@app.route('/quit_url', methods=['POST'])
def quit_url():
    token = request.json["token"]
    #Validating the token submitted
    if not token:
        return jsonify({'message' : 'Token is missing!'}),403
    try:
        data = jwt.decode(token, JWT_SECRET_KEY, algorithm="HS256")
    except:
        return jsonify({'message' : 'Token is invalid!'}),403

    data = dict(data)

    # Access the identity of the current user with get_jwt_identity
    current_userid = data['id']

    # Get the url that the user is browsing
    url = request.json["url"]

    print("currently viewing: " + url_strip(url))
    parent_url = url_strip(url)

    today = date.today()

    # Get the user daily data from database
    user_daily_detail = db_read("""SELECT * FROM user_activity WHERE user_id = %s AND website_name = %s AND entry_date = %s""", (current_userid, parent_url, today))

    # Check if the user has daily entry
    if len(user_daily_detail) == 0:
        pass
    else:
        recent_visit = user_daily_detail['recent_visit_time']
        if recent_visit != None:
            total_time = user_daily_detail['total_time_min']
            time_spent = int(time.time() - recent_visit)
            total_time = total_time + time_spent
            # updating the database
            if db_update("""UPDATE user_activity set total_time_min = %s, recent_visit_time = %s WHERE user_id = %s AND website_name = %s AND entry_date = %s """, (total_time, None, current_userid, parent_url, today)):
                update_main_time(current_userid, time_spent)
            else:
                return Response(status=409)

    return jsonify({'message': 'quit success!'}), 200



'''
API endpoint to get user daily log detail
'''
@userlog.route("/getdetails", methods=["GET"])
def getdetails():
    token = request.args.get('token')
    #Validating the token submitted
    if not token:
        return jsonify({'message' : 'Token is missing!'}),403
    try:
        data = jwt.decode(token, JWT_SECRET_KEY, algorithm="HS256")
    except:
        return jsonify({'message' : 'Token is invalid!'}),403

    data = dict(data)
    # Access the identity of the current user with get_jwt_identity
    userId = data['id']

    today = date.today()

    # Get the user daily data from database
    user_daily_detail = db_read("""SELECT total_time_min, total_break_taken, last_break_activity FROM user_time WHERE user_id = %s AND entry_date = %s""", (userId,today))

    # Check if the user has daily entry
    try:
        return jsonify(user_daily_detail[0])
    except:
        if db_write("""INSERT INTO user_time (user_id, entry_date, total_time_min, total_break_taken, last_break_activity ) VALUES (%s,%s,%s,%s,%s)""", (userId, today, 0, 0, None)):        
            user_daily_detail = db_read("""SELECT total_time_min, total_break_taken, last_break_activity FROM user_time WHERE user_id = %s AND entry_date = %s""", (userId,today))
            return jsonify(user_daily_detail)
        else:
            return Response(status=409)

    
