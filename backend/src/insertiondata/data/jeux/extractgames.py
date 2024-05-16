import csv

def extract_and_create_csv(input_csv, output_csv):
    # Lire le fichier CSV d'entrée
    with open(input_csv, mode='r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        
        # Les champs à extraire
        fieldnames = ['Year', 'Season', 'City']
        
        # Écrire le nouveau fichier CSV
        with open(output_csv, mode='w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()
            
            seen = set()  # Pour garder une trace des entrées déjà écrites
            for row in reader:
                # Créer une clé unique pour chaque ligne
                key = (row['Year'], row['Season'], row['City'])
                if key not in seen:
                    writer.writerow({field: row[field] for field in fieldnames})
                    seen.add(key)

# Exemple d'utilisation
input_csv = '../nona.csv'  # Le nom du fichier CSV d'entrée
output_csv = 'jeux.csv'  # Le nom du fichier CSV de sortie
extract_and_create_csv(input_csv, output_csv)