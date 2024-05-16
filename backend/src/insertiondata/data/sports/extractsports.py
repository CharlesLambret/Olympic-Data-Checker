import csv

def extract_unique_fields(input_csv, output_csv):
    # Lire le fichier CSV d'entrée
    with open(input_csv, mode='r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        
        # Les champs à extraire
        fields_to_extract = ['Sport']
        
        # Ensemble pour stocker les entrées uniques
        unique_entries = set()
        
        # Écrire le nouveau fichier CSV
        with open(output_csv, mode='w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fields_to_extract)
            writer.writeheader()
            for row in reader:
                entry = tuple(row[field] for field in fields_to_extract)
                if entry not in unique_entries:
                    unique_entries.add(entry)
                    writer.writerow({field: row[field] for field in fields_to_extract})

# Exemple d'utilisation
input_csv = 'nona.csv'  # Le nom du fichier CSV d'entrée
output_csv = 'sports/sports.csv'  # Le nom du fichier CSV de sortie
extract_unique_fields(input_csv, output_csv)
