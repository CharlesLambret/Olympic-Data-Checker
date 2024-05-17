import pandas as pd

def clean_duplicates(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    df_cleaned = df.sort_values('Age').drop_duplicates(subset=['Name', 'Sport', 'Sex'], keep='last')
    print(df_cleaned)
    #df_cleaned.to_csv(output_csv, index=False)
    print(f"Les doublons ont été nettoyés et les données ont été enregistrées sous le nom {output_csv}")

input_csv = 'athletes.csv'
output_csv = 'cleanathletes.csv'

clean_duplicates(input_csv, output_csv)
