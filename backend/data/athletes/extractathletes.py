import pandas as pd

def extract_athletes(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    df_athletes = df[['Name', 'Sport', 'Age', 'Height', 'Weight', 'Sex']]
    df_unique_athletes = df_athletes.drop_duplicates()
    df_unique_athletes.to_csv(output_csv, index=False)
    print(f"Les informations des athlètes uniques ont été enregistrées sous le nom {output_csv}")

input_csv = 'nona.csv'
output_csv = 'athletes.csv'
extract_athletes(input_csv, output_csv)
