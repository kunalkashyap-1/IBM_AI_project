import sys
import json
import numpy as np
import pandas as pd
import warnings
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from rapidfuzz import process

# Suppress warnings
warnings.filterwarnings('ignore')

# Read movie and rating data
movie = pd.read_csv('movies.csv')
rating = pd.read_csv('ratings.csv', nrows=6753444)

# Extract and clean movie year from title
movie['year'] = movie.title.str.extract(r'(\(\d\d\d\d\))', expand=False)
movie['year'] = movie.year.str.extract(r'(\d\d\d\d)', expand=False)
movie['title'] = movie.title.str.replace(r'(\(\d\d\d\d\))', '').str.strip()

# Merge movies and ratings
df = movie.join(rating, lsuffix='_movies', rsuffix='_ratings')

# Drop unnecessary columns
df = df.drop(['movieId_ratings', 'genres', 'year', 'timestamp'], axis=1)

# Pivot table and handle missing values
movie_users = df.pivot(index='movieId_movies', columns='userId', values='rating').fillna(0)
matrix_movies_users = csr_matrix(movie_users.values)

# Create KNN model
knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
knn.fit(matrix_movies_users)

# Recommendation function to find the output even if there is a misspelling or letter case issue
def recommender(movie_name, data, model, n_recommendations):
    model.fit(data)
    idx = process.extractOne(movie_name, df['title'])[2]
    distances, indices = model.kneighbors(data[idx], n_neighbors=n_recommendations)
    
    recommendations = [df['title'][i] for i in indices[0] if i != idx]
    print(json.dumps(recommendations))

# Get input from command line argument
name = sys.argv[1]

# Call the recommender function
recommender(name, matrix_movies_users, knn, 5)
