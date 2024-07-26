from flask import Flask, request, jsonify
import requests
import pickle
from flask_cors import CORS
import pandas as pd
import numpy as np
import json

movies = pickle.load(open('movies.pkl', 'rb'))
movies_pivot = pickle.load(open('movies_pivot.pkl', 'rb'))
similarity_mat = pickle.load(open('similarity_mat.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

def fetchPoster(movie_id):
    
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"
    
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWJkMDcyZTc5NTMwOTUyNTI2ZjRiZDdjMjU4ODQ0YiIsIm5iZiI6MTcyMTc2NDU2OC44MzUwNTgsInN1YiI6IjY2YTAwOTUyNmZlNjhmNTIxNDcyOGQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTO_qEOyevlvfstExUZJNAlJbZ5_PrheGY0qCpi6I80"
    }
    
    response = requests.get(url, headers=headers).text
    
    poster = json.loads(response).get('poster_path')
    return poster


@app.route('/', methods=['GET'])
def void():
    return {'status':'success'}

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    name = data['name']
    
    index = np.where(movies_pivot.index == name)[0][0]
    print("test 1")
    recommends = sorted(list(enumerate(similarity_mat[index])), key=lambda x:x[1], reverse=True)[1:6]
    print("test 2")
    data=[]
    for i in recommends:
        l=[]
        m = movies[movies['title'] == movies_pivot.index[i[0]]]
        # l.extend(list(m.drop_duplicates('title')['title'].values))
        # l.extend(list(m.drop_duplicates('title')['movieId'].values.astype(str)))
        # l.extend(list(m.drop_duplicates('title')['imdb_id'].values))
        movie_data = {
        "title": m.drop_duplicates('title')['title'].values[0],
        "movieId": m.drop_duplicates('title')['movieId'].values[0].astype(str),
        "imdb_id": m.drop_duplicates('title')['imdb_id'].values[0],
        "poster_path": fetchPoster(m.drop_duplicates('title')['movieId'].values[0])
        }
        data.append(movie_data)
    print(data)
    
    return jsonify(data)

@app.route('/getmovies', methods=['GET'])
def method_name():
    names = movies_pivot.index
    return jsonify(names.values.tolist())

@app.route('/checkrequests', methods=['GET'])
def checkkkk():

    url = "https://api.themoviedb.org/3/movie/914?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWJkMDcyZTc5NTMwOTUyNTI2ZjRiZDdjMjU4ODQ0YiIsIm5iZiI6MTcyMTc2NDU2OC44MzUwNTgsInN1YiI6IjY2YTAwOTUyNmZlNjhmNTIxNDcyOGQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTO_qEOyevlvfstExUZJNAlJbZ5_PrheGY0qCpi6I80"
    }

    response = requests.get(url, headers=headers).text

    print(json.loads(response).get('poster_path'))
    return jsonify({"status":"success"})



if __name__ == '__main__':
    app.run(debug=True)