import pandas as pd

csv_path ='../nona.csv'
df = pd.read_csv(csv_path)
country_df = df[['Team','NOC']]
df  = country_df.drop_duplicates(subset='NOC')
df.to_csv('country.csv',index=False)