import pandas as pd

def clean_medals(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    df_cleaned = df[df['Medal'].notna()]
    df_cleaned.to_csv(output_csv, index=False)
    print(f"Le fichier nettoyé a été enregistré sous le nom {output_csv}")

input_csv = 'athlete_events.csv'
output_csv = 'nona.csv'

clean_medals(input_csv, output_csv)
