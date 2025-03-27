import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from bs4 import BeautifulSoup
from urllib.request import urlopen, Request
import pandas as pd
from datetime import date, timedelta

stock = 'AMZN'
news = {}

url = f'https://finviz.com/quote.ashx?t={stock}&p=d'
request = Request(url=url, headers={'user-agent': 'news_scraper'})
response = urlopen(request)

html = BeautifulSoup(response, features='html.parser')
finviz_news_table = html.find(id='news-table')
news[stock] = finviz_news_table

news_parsed = []
for stock, news_item in news.items():
    for row in news_item.findAll('tr'):
        try:
            headline = row.a.getText()
            source = row.span.getText()
            news_parsed.append([stock, headline])
        except:
            pass

df = pd.DataFrame(news_parsed, columns=['Stock', 'Headline'])

df.to_csv(r'dataframe.csv', index=False, header=True)

nltk.download('vader_lexicon')


# Load data
df = pd.read_csv("dataframe.csv")

# Generate sentiment scores using VADER
sid = SentimentIntensityAnalyzer()
df["sentiment"] = df["Headline"].apply(lambda x: sid.polarity_scores(x)["compound"])

# Save labeled data (optional)
print(df.head()) #chek the working
df.to_csv("labeled_data.csv", index=False)