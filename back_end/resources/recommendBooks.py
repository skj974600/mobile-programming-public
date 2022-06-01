import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from konlpy.tag import Okt
import numpy as np
import pymongo
import sys
import os

okt = Okt()
dir = os.getcwd() + '/resources/'

client = pymongo.MongoClient('mongodb+srv://tting:auddlswl12@nodeprojects.xwoen.mongodb.net/BookReviews?retryWrites=true&w=majority')
col = client['BookReviews']['reviews']
query = {'userName':sys.argv[1]}
data = list(col.find(query))
print(data)
# data = "" # DB 읽어오기
df = pd.DataFrame(data)
df = df.loc[df['userName'] == sys.argv[1]] # 해당 클라이언트로 바꾸기
df['sum'] = df['bookName']+' '+df['review']+' '+df['label']

noun = []
for i in df['sum']:
  tag = okt.pos(i)
  noun.append(tag)
  
input = []
for i in noun:
  for j in i:
    if j[1] == 'Noun':
      input.append(j[0])
input = ' '.join(input)
book = pd.read_csv(dir+'book2.csv')
filter = (book['청구기호'].str[0] == '8')
book = book.loc[filter, ['서명','서지번호','명사']]
noun = []
for i in book['명사']:
  nounn = []
  for j in i:
    j = j.replace('[','')
    j = j.replace(']','')
    j = j.replace("'",'')
    j = j.replace(',','')
    nounn.append(j)
  nounn = ''.join(nounn)
  #nounn = nounn.split()  
  noun.append(nounn)
book['명사'] = noun
book = book.replace(r'^\s*$', np.nan, regex=True)
book = book.dropna()
book = book.reset_index()
del book['index']
book.loc[0]=['추천',000000, input]
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf_vectorizer = TfidfVectorizer()

# 문장 벡터화 하기(사전 만들기)
tfidf_matrix = tfidf_vectorizer.fit_transform(book['명사'])

### 코사인 유사도 ###
from sklearn.metrics.pairwise import cosine_similarity
# 첫 번째와 두 번째 문장 비교
cos_similar = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1:])
print("코사인 유사도 측정")
print(cos_similar)
a = dict()
for i,j in zip(book['서명'][1:],cos_similar[0]):
  a[i] = float(j)
sorted_dict = sorted(a.items(), key = lambda item: item[1], reverse = True)
ranking = pd.DataFrame((sorted_dict), columns=['서명', '추천점수']).iloc[0:10].to_json(orient = 'index')
with open(os.getcwd() + "/resources/recommendBooks.json", "w", encoding='utf8') as f:
  f.write(ranking)