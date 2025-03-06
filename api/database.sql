CREATE DATABASE articleApi;

USE articleApi;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'user', 'moderator')) NOT NULL
);

CREATE TABLE Article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    id_user INT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES Users(id) ON DELETE CASCADE
);

/* INSERT INTO Article (title, content, id_user) VALUES (
    'Tournoi des six nations', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada eu tortor vitae dignissim. Nunc auctor enim a sapien egestas, sed pharetra odio aliquet. Maecenas tortor orci, fringilla in posuere eget, porta nec eros. Quisque malesuada magna nec tincidunt facilisis. Nullam vitae nisi justo. Vivamus cursus nunc turpis, sed hendrerit nisi egestas at. Pellentesque non nunc mauris. Praesent erat urna, dapibus ut elit lobortis, sollicitudin vulputate nisl. Curabitur turpis orci, pretium semper eros vel, mollis efficitur nulla.' , 
    1
); */