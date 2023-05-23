# imports
import pandas as pd
import tiktoken

from openai.embeddings_utils import get_embedding

# embedding model parameters
embedding_model = "text-embedding-ada-002"
embedding_encoding = "cl100k_base"  # this the encoding for text-embedding-ada-002
max_tokens = 8000  # the maximum for text-embedding-ada-002 is 8191

# load & inspect dataset
input_datapath = "../files/movies.json"  # to save space, we provide a pre-filtered dataset
df = pd.read_json(input_datapath)
# "Title": "The Land Girls", 
#     "US Gross": 146083, 
#     "Worldwide Gross": 146083, 
#     "US DVD Sales": null, 
#     "Production Budget": 8000000, 
#     "Release Date": "Jun 12 1998", 
#     "MPAA Rating": "R", 
#     "Running Time min": null, 
#     "Distributor": "Gramercy", 
#     "Source": null, 
#     "Major Genre": null, 
#     "Creative Type": null, 
#     "Director": null, 
#     "Rotten Tomatoes Rating": null, 
#     "IMDB Rating": 6.1, 
#     "IMDB Votes": 1071},
    
df = df[["Title", "US Gross", "Worldwide Gross", "Production Budget", "Release Date", "Major Genre"]]
df = df.dropna()
df["combined"] = (
    "Title: " + df.Title.astype(str)  + "; US Gross: " + df['US Gross'].astype(str)
)

top_n = 2
df = df.sort_values("Release Date").tail(top_n * 2)  # first cut to first 2k entries, assuming less than half will be filtered out
df.drop("Release Date", axis=1, inplace=True)
df.drop("US Gross", axis=1, inplace=True)
df.drop("Worldwide Gross", axis=1, inplace=True)
df.drop("Production Budget", axis=1, inplace=True)
df.drop("Major Genre", axis=1, inplace=True)

df.head(2)

# subsample to 1k most recent reviews and remove samples that are too long


encoding = tiktoken.get_encoding(embedding_encoding)

# omit reviews that are too long to embed
df["n_tokens"] = df.combined.apply(lambda x: len(encoding.encode(x)))
df = df[df.n_tokens <= max_tokens].tail(top_n)
print(len(df))
print('--len-------')

# Ensure you have your API key set in your environment per the README: https://github.com/openai/openai-python#usage

# This may take a few minutes
df["embedding"] = df.combined.apply(lambda x: get_embedding(x, engine=embedding_model))

df.to_csv("data/fine_food_reviews_with_embeddings_1k.csv")
print(df.head(2))
print('--df-------')
