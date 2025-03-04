# Les modules essentiels pour développer un back end avec NodeJS et Express
<br> 
<br> 

## 1 - Base
Express - framework web minimaliste <br>
<code>npm install express</code>

<br>

dotenv - chargement des variables d'environnement <br>
<code>npm install dotenv</code>

<br>
<br>

## 2 - Gestion des routes et requêtes
cors - gestion des requêtes Cross-Origin <br>
<code>npm install cors</code>

<br>

body-parser - parsing des requêtes entrantes (inclus dans Express depuis v4.16) <br>
<code>
    app.use(express.json()); // Pour le JSON <br>
    app.use(express.urlencoded({ extended: true })); // Pour les formulaires
</code>

<br>

helmet - sécurisation des en-têtes HTTP <br>
<code>npm install helmet</code>

<br>
<br>

## 3 - Base de données
MongoDB (mongoose) <br>
<code>npm install mongoose</code>

<br>

PostgreSQL (pg) <br>
<code>npm install pg pg-hstore</code>

<br>

MySQL <br>
<code>npm install mysql2</code>

<br>

Sequelize (ORM pour SQL) <br>
<code>npm install sequelize</code>

<br>
<br>

## 4 - Authentification et sécurité
jsonwebtoken (JWT) – Authentification via tokens <br>
<code>npm install jsonwebtoken</code>

<br>

bcryptjs – Hashage des mots de passe <br>
<code>npm install bcryptjs</code>

<br>
<br>

## 5 - Gestion des fichiers
multer – Upload de fichiers <br>
<code>npm install multer</code>

<br>
<br>

## 6 - Dev et debugging
nodemon – Rechargement automatique du serveur <br>
<code>npm install --save-dev nodemon</code>

<br>

morgan – Logger des requêtes HTTP <br>
<code>npm install morgan</code>
console.log()

<br>
<br>

## 7 - Tests et validation
jest – Framework de test <br>
<code>npm install --save-dev jest</code>

<br>

supertest – Test des API <br>
<code>npm install --save-dev supertest</code>

<br>

joi – Validation des données <br>
<code>npm install joi</code>

<br>
<br>

## BONUS 🚀
express-rate-limit → Protection contre le spam et les attaques de force brute <br>
compression → Améliore les performances en compressant les réponses

nodemailer
validator
xss
pattern ? (pour limiter les caractères, interdire certains caractères)