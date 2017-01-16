from flask import Flask, request, render_template, jsonify, redirect,url_for,send_from_directory
from pymongo import MongoClient
import json
import base64
import os
import bson
from bson.json_util import dumps
from bson.objectid import ObjectId


app = Flask(__name__)


client = MongoClient('localhost', 27017)
db = client.customers


@app.route('/', methods=["GET"])
def cust():
    return render_template('customer.html')


@app.route('/db', methods=["GET"])
def custdb():
    return render_template('db.html')


@app.route('/images/<path:fname>')
def download_file(fname):
    return send_from_directory('images', fname)


@app.route('/customer', methods=["POST"])
def customer():
    try:
        content = request.get_json(silent=True)

        image_data = content["image"]
        pathh = os.path.join('images', content["fname"] + '.jpeg')
        image_result = open(pathh, 'wb')
        image_64_decode = base64.b64decode(image_data)
        image_result.write(image_64_decode)
        image_result.close()

        customersDetails = db.customersDetails
        content["image"] = pathh
        result = customersDetails.insert_one(content)



        return jsonify({"result": "Customer details registered successfully"})
    except:
        return jsonify({"result": "Validation error. Please check your data."})




@app.route('/delete/<string:custid>', methods=["GET"])
def customerdelete(custid):
    result = {}

    customersDetails = db.customersDetails
    cur = customersDetails.find({"_id": ObjectId(custid)})
    cur = customersDetails.remove({"_id": ObjectId(custid)})


    return jsonify({"result": "Customer details deleted"})


@app.route('/customerdict', methods=["GET"])
def customerdict():
    customersDetails = db.customersDetails
    # cur = customersDetails.find()
    #
    # for i in range(cur.count()):
    #     image_data = cur[i]["image"]
    #     pathh = os.path.join('images', cur[i]["fname"] + '.jpeg')
    #     image_result = open(pathh, 'wb')
    #     image_64_decode = base64.b64decode(image_data)
    #     image_result.write(image_64_decode)
    #     image_result.close()
    #
    return bson.json_util.dumps(customersDetails.find())


@app.route('/customerdict/<string:fname>', methods=["GET"])
def customerdict1(fname):
    result = {}
    customersDetails = db.customersDetails
    cur = customersDetails.find()
    for i in range(cur.count()):
            if fname in cur[i]["fname"]:
                result = {
                    "firstname": cur[i]["fname"],
                    "lastname": cur[i]["lname"],
                    "age": cur[i]["agee"],
                    "gender": cur[i]["gender"],
                    "occupation": cur[i]["occupation"]

                }

    return jsonify(**result)

@app.route('/edit/<string:custid>', methods=["GET"])
def customeredit(custid):
    result = {}
    customersDetails = db.customersDetails
    cur = customersDetails.find({"_id": ObjectId(custid)})

    return render_template('edit.html', customer=cur[0])

@app.route('/update/<string:custid>', methods=["POST"])
def customerupdate(custid):
    customersDetails = db.customersDetails
    customersDetails.remove({"fname": "ruchika"})
    customersDetails.remove({"fname": "rifa"})
    new_content = request.get_json(silent=True)
    cur = customersDetails.find({"_id": ObjectId(custid)})
    #print cur[0]
    print cur.count()
    if new_content["image"] != "":
        image_data = new_content["image"]
        pathh = os.path.join('images', new_content["fname"] + '.jpeg')
        print pathh
        image_result = open(pathh, 'wb')
        image_64_decode = base64.b64decode(image_data)
        image_result.write(image_64_decode)
        image_result.close()
        customersDetails = db.customersDetails
        new_content["image"] = pathh
    cur1=customersDetails.update({'_id': ObjectId(custid)},  {"$set": new_content}, upsert=False)
    print cur1
    cur2=customersDetails.find({'_id': ObjectId(custid)})
    print cur2
    return jsonify({"result": "Customer details updated successfully"})


if __name__ == "__main__":
    app.run(debug=True)
