# Utiliser le back-end / faire des calls API 

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



