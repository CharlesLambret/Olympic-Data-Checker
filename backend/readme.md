# Utiliser le back-end / faire des calls API 

# Postman

une collection postman des endpoint est accessible au travers de l'onglet wiki du github wiki/postman 

## Auth

### Créer un nouvel utilisateur / s'inscrire

localhost:3000/user/signup

Passer dans le corps de la requête : "email", "name", "password"

### Connexion 

localhost:3000/user/login
Passer dans le corps de la requête : "email", "password"
Retourne soit "User logged in successfully", initialise une session et renvoie l'id de l'utilisateur soit "Login failed" et le message d'erreur

### Déconnexion 

localhost:3000/logout

Termine la session

## Gestion des utilisateurs 

### Créer un nouvel admin 

localhost:3000/admin/create

Passer dans le corps de la requête : "email", "name", "password"

### Obtenir tous les admins

localhost:3000/admin/read

Retourne un objet

### Obtenir un admin par son ID

localhost:3000/admin/read/:id

Remplacer ":id" par l'ID de l'admin souhaité.

### Mettre à jour un admin

localhost:3000/admin/update/:id

Remplacer ":id" par l'ID de l'admin à mettre à jour.
Passer dans le corps de la requête les champs à mettre à jour. (""email", "name", "password")

### Obtenir tous les utilisateurs 

localhost3000:/user/read

### Obtenir un utilisateur par son ID

localhost3000:/user/read/:id
Remplacer ":id" par l'ID de l'utilisateur souhaité.

### Mettre à jour un utilisateur

localhost3000:/user/update/:id
Remplacer ":id" par l'ID de l'utilisateur souhaité.
Passer dans le corps de la requête les champs à mettre à jour. (""email", "name", "password")

### Supprimer un utilisateur

localhost:3000/user/delete/:id

Remplacer ":id" par l'ID de l'utilisateur à supprimer.


## Données Olympiques 

### Athletes 

#### Create Athlete
- **URL**: `/createathlete`
- **Method**: POST
- **Description**: Creates a new athlete with the provided details.
- **Request Body**: 
  ```json
  {
      "Nom": "string",
      "Discipline": "string",
      "Age": "number",
      "Poids": "number",
      "Taille": "number",
      "Sexe": "string",
      "PaysID": "string"
  }
    ```
- **Response**:
    - Status 201: Successfully created.
    - Status 500: Failed to create athlete.

#### Delete Athlete
- **URL**: `/deleteathlete/:id`
- **Method**: DELETE
- **Description**: Deletes an athlete by ID.
- **Response**:
    - Status 200: Successfully deleted.
    - Status 404: Athlete not found.
    - Status 500: Failed to delete athlete.

#### Get Athlete
- **URL**: `/getathlete/:id`
- **Method**: GET
- **Description**: Retrieves an athlete by ID.
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read athlete.

#### Search Athletes 
- **URL**: /getathletes
- **Method**: GET
- **Description**: Searches athletes by name, add dynamically the page and pagesize the searches returns.
- **Query Parameters**: name, page, pageSize
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read athletes.

#### Update Athlete
- **URL**: /updateathlete/:id
- **Method**: PUT
- **Description**: Updates an athlete's details by ID.
- **Request Body**: 
    ```json
    {
        "Nom": "string",
        "Discipline": "string",
        "Age": "number",
        "Poids": "number",
        "Taille": "number",
        "Sexe": "string",
        "PaysID": "string"
    }
        ```
- **Response**:
    - Status 200: Successfully updated.
    - Status 404: Athlete not found.
    - Status 500: Failed to update athlete.
### Evenements

#### Create Event
- **URL**: /createEvent
- **Method**: POST
- **Description**: Creates a new event with the provided details.
- **Request Body**:
    ```json
    {
            "Discipline": "string",
            "NomEvent": "string",
            "JeuxID": "string"
    }
    ```
- **Response**:
        - Status 201: Successfully created.
        - Status 500: Failed to create event.

#### Delete Event
- **URL**: /deleteevent/:id
- **Method**: DELETE
- **Description**: Deletes an event by ID.
- **Response**:
        - Status 200: Successfully deleted.
        - Status 404: Event not found.
        - Status 500: Failed to delete event.
#### Get Event
- **URL**: /getevent/:id
- **Method**: GET
- **Description**: Retrieves an event by ID.
- **Response**:
            - Status 200: Successfully retrieved.
            - Status 500: Failed to read event.

#### Search Event
- **URL**: /getevents
- **Method**: GET
- **Description**: Searches events by name.
- **Query Parameters**: name
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read events.

#### Update Event
- **URL**: /updateevent/:id
- **Method**: PUT
- **Description**: Updates an event's details by ID.
- - **Request Body**:
    ```json
    {
            "Discipline": "string",
            "NomEvent": "string",
            "JeuxID": "string"
    }
    ```
- **Response**:
    - Status 200: Successfully updated.
    - Status 404: Event not found.
    - Status 500: Failed to update event.

### Jeux 

#### Create Jeux 
- **URL**: `/creategame`
- **Method**: POST
- **Description**: Crée un nouveau jeu avec les détails fournis.
- **Request Body**:
  ```json
  {
    "Annee": "number",
    "Saison": "string",
    "Ville": "string"
  }
- **Response**:
    - Status 201: Successfully created.
    - Status 500: Failed to create game.

#### Delete Jeux
- **URL**: /deletegame/:id
- **Method**: DELETE
- **Description**: Supprime un jeu par ID.
- **Response**:
    - Status 200: Successfully deleted.
    - Status 404: Game not found.
    - Status 500: Failed to delete game.

#### Get Jeux
- **URL**: /getgames
- **Method**: GET
- **Description**: Recherche des jeux par année.
- **Query Parameters**: year
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read games.

#### Search Jeux
- **URL**: /getgame/:id
- **Method**: GET
- **Description**: Récupère un jeu par ID.
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read game.

#### Update Jeux
Mettre à jour Jeux
- **URL**: /updategame/:id
- **Method**: PUT
- **Description**: Met à jour les détails d'un jeu par ID.
- **Request Body**:
  ```json
  {
    "Annee": "number",
    "Saison": "string",
    "Ville": "string"
  }
  
### Medailles

#### Create Medaille
- **URL**: /createmedal
- **Method**: POST
- **Description**: Creates a new medal with the provided details.
- - **Request Body**:
    ```json{
    "AthleteID": "string",
    "EventID": "string",
    "NomMedaille": "string"
}
    ```
- **Response**:
    - Status 201: Successfully created.
Status 500: Failed to create medal.

#### Delete Medaille
- **URL**: /deletemedal/:id
- **Method**: DELETE
- **Description**: Deletes a medal by ID.
- **Response**:
    - Status 200: Successfully deleted.
    - Status 404: Medal not found.
    - Status 500: Failed to delete medal.

#### Get Medaille
- **URL**: /getmedal/:id
- **Method**: GET
- **Description**: Retrieves a medal by ID.
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read medal.

#### Search Medailles
- **URL**: /getmedals/:id
- **Method**: GET
- **Description**: Searches medals by athlete ID.
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read medals.

#### Update Medaille
- **URL**: /updatemedal/:id
- **Method**: PUT
- **Description**: Updates a medal's details by ID.
- - **Request Body**:
    ```json{
    "AthleteID": "string",
    "EventID": "string",
    "NomMedaille": "string"
}
    ```
- **Response**:
    - Status 200: Successfully updated.
    - Status 404: Medal not found.
    - Status 500: Failed to update medal.
    
### Pays

#### Create Pays 
- **URL**: /createcountry
- **Method**: POST
- **Description**: Creates a new country with the provided details.
- - **Request Body**:
    ```json{
    "noc": "string",
    "region": "string",
    "notes": "string"
}
    ```
- **Response**:
    - Status 201: Successfully created.
    - Status 500: Failed to create country.

#### Delete Pays
- **URL**: /deletecountry/:id
- **Method**: DELETE
- **Description**: Deletes a country by ID.
- **Response**:
    - Status 200: Successfully deleted.
    - Status 404: Country not found.
    - Status 500: Failed to delete country.

#### Get Pays
- **URL**: /getcountry/:id
- **Method**: GET
- **Description**: Retrieves a country by ID.
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read country.

#### Search Pays
- **URL**: /getcountries/:name
- **Method**: GET
- **Description**: Searches countries by name.
- **Response**:
    - Status 200: Successfully retrieved.
    - Status 500: Failed to read countries.

#### Update Pays
- **URL**: /updatecountry/:id
- **Method**: PUT
- **Description**: Updates a country's details by ID.
- - **Request Body**:
    ```json{
    "noc": "string",
    "region": "string",
    "notes": "string"
}
    ```
- **Response**:
    - Status 200: Successfully updated.
    - Status 404: Country not found.
    - Status 500: Failed to update country.
