from flask import Flask, request, render_template, jsonify, redirect,url_for,send_from_directory

import json
import csv
import base64
import os


app = Flask(__name__)

@app.route('/',methods=["GET"])
def cust():
	return render_template('customer.html')

@app.route('/db',methods=["GET"])
def custdb():
	return render_template('db.html')

@app.route('/images/<path:fname>')
def download_file(fname):
    return send_from_directory('images',fname)
   
@app.route('/customer',methods=["POST"])
def customer():
    content= request.get_json(silent=True)
    outputFile=open("customer.csv","a+") 
    outputFile.write("{0},{1},{2},{3},{4} \n".format(content["fname"],content["lname"],content["agee"],content["gender"],content["occupation"]))
    outputFile.close()
    #outputImageFile=open("customerImage.png","wb")
    #with open("customerImage.png","wb") as outputImageFile:
    image_data = content["image"] 
    pathh = os.path.join('images',content["fname"]+'.jpeg')
    print pathh
    image_result = open(pathh,'wb')
    image_64_decode = base64.b64decode(image_data)

    image_result.write(image_64_decode)
    
    image_result.close()
    return jsonify({"result":"Customer details registered successfully"})


@app.route('/customerdict',methods=["GET"])
def customerdict():

	inputFile= csv.DictReader(open("customer.csv"))
	return json.dumps(list(inputFile))
	

@app.route('/customerdict/<string:fname>',methods=["GET"])
def customerdict1(fname):

	result={}
	with open('customer.csv', 'r') as inputFile:
	    for row in inputFile.readlines(): 
	    	print row
	    	custDetail=row.split(",")

	        if fname in custDetail[0]:
	           result={
	           "firstname":custDetail[0],
	           "lastname":custDetail[1],
	           "age":custDetail[2],
	           "gender":custDetail[3],
	           "occupation":custDetail[4]
	          
	           }

	return jsonify(**result)

if __name__ == "__main__":
	app.run(debug=True)