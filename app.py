# mongo.py

#Import Dependencies
from flask import Flask
from flask import jsonify
from flask import request
from flask import send_file
from flask_pymongo import PyMongo

#Create Flask App
app = Flask(__name__)


#connect to Comic_SuperHeroes Mongo Database
#app.config['MONGO_DBNAME'] = 'Comic_SuperHeroes'
#app.config['MONGO_URI'] = 'mongodb://localhost:27017/Comic_SuperHeroes'


#Use variable Mongo to represent connecting to Comic_SuperHeroes Mongo database
mongoSH = PyMongo(app, uri = 'mongodb://localhost:27017/Comic_SuperHeroes')
mongoME = PyMongo(app, uri = 'mongodb://localhost:27017/Marvel_events')
'''
app = Flask(__name__)
app.config['MODEL'] = model.my1st_database()
app.config['MODEL2'] = model.my2nd_database()
'''


#Pushing the mongo database to the route /SuperHeroes
@app.route('/DCSuperHeroes', methods=['GET'])
def get_all_DC_superheroes():
  #We'll use DC to represent the Database in Mongo
  DC = mongoSH.db.DC_SuperHeroes
  output = []

    #Walk through the SuperHeroes Database for DC to
  for s in DC.find():
      obj = {}
      for f in s:         
          #print(s[f])
          #name = f
          #valuef =s[f]
          #obj.update(f + ":" + s[f])
          #tmp={f"{f}" : s[f]}
          
          #obj.update(tmp)
          obj[f] = str(s[f])
          #name = str(f)
          #value = f.value
          #output.append({}) 
         
          # output.append(f' {f} : {s[f]}')
      #print(obj)
      output.append(obj)
      print(obj)
    #output.append({'Supername' : s['SuperHero Name']})
    #print(s)
    #output.update(s)
  return jsonify({'result' : output})

@app.route('/MarvelSuperHeroes', methods=['GET'])
def get_all_Marvel_superheroes():
  #We'll use Marvel to represent the Marvel Collection in Mongo
  Marvel = mongoSH.db.Marvel_SuperHeroes
  output = []

    #Walk through the SuperHeroes Database for Marvel to
  for s in Marvel.find():
      obj = {}
      for f in s:         
          obj[f] = str(s[f])
          
      output.append(obj)
      print(obj)
  
    
  return jsonify({'result' : output})


#Pushing the mongo database to the route /SuperHeroes

@app.route('/MarvelEvents', methods=['GET'])
def get_all_Marvel_Events():
  Mevent = mongoME.db.Event_Details
  output = []

    #Walk through the SuperHeroes Database for Marvel to
  for s in Mevent.find():
      obj = {}
      for f in s:         
          obj[f] = str(s[f])
          
      output.append(obj)
      print(obj)
  
  return jsonify({'result' : output})

@app.route('/<path>', methods=['GET'])
@app.route('/assets/<path>', methods=['GET'])
def present_table(path):
  print(path)
  if "favicon" in path:
    return send_file('assets/Marvel.png', mimetype='image/png')      
  if "css" in path:
    return send_file(path, mimetype='text/css')  
  if "png" in path:
    return send_file('assets/' + path, mimetype='image/png')
  else:
    f=open(path)
    return f.read()

@app.route('/', methods=['GET'])
def main():
  f=open("index.html")
  return f.read()


if __name__ == '__main__':
    app.run(debug=True)