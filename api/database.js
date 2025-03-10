const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articleApi',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

console.log("🔍 Tentative de connexion avec un pool...");

// Utilisation d'async/await pour obtenir une connexion
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connexion MySQL réussie !");
        connection.release();  // Libération de la connexion après l'utilisation
    } catch (err) {
        console.error("❌ Erreur de connexion MySQL :", err);
    }
}

// Appel de la fonction asynchrone
testConnection();

console.log("🔍 After");

module.exports = pool;