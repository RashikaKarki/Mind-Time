from flask import Blueprint, request, Response, jsonify
from util import db_read, db_write
from settings import JWT_SECRET_KEY
import jwt

from datetime import date


userlog = Blueprint("userlog", __name__)

@userlog.route("/getdetails", methods=["GET"])
def getdetails():
    token = request.args.get('token')
    print(token)

    if not token:

        return jsonify({'message' : 'Token is missing!'}),403

    try:
        data = jwt.decode(token, JWT_SECRET_KEY, algorithm="HS256")
    except:
        return jsonify({'message' : 'Token is invalid!'}),403

    data = dict(data)
    # Access the identity of the current user with get_jwt_identity
    userId = data['id']
    current_user = db_read("""SELECT * FROM users WHERE id = %s""", (userId,))

    # Get user daily detail
    today = date.today()
    user_daily_detail = db_read("""SELECT total_time_min, total_break_taken, last_break_activity FROM user_time WHERE user_id = %s AND entry_date = %s""", (userId,today))

    try:
        return jsonify(user_daily_detail[0])
    except:
        if db_write("INSERT INTO user_time (user_id, entry_date, total_time_min, total_break_taken, last_break_activity ) VALUES (%s,%s,%s,%s,%s)""", (userId, today, 0, 0, None)):        
            user_daily_detail = db_read("""SELECT total_time_min, total_break_taken, last_break_activity FROM user_time WHERE user_id = %s AND entry_date = %s""", (userId,today))
            return jsonify(user_daily_detail)
        else:
            return Response(status=409)

    
