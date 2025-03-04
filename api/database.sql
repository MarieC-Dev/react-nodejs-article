CREATE DATABASE articleApi;

USE articleApi;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE Article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users(id)
);

INSERT INTO Article (title, content, id_user) VALUES (
    'Tournoi des six nations', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada eu tortor vitae dignissim. Nunc auctor enim a sapien egestas, sed pharetra odio aliquet. Maecenas tortor orci, fringilla in posuere eget, porta nec eros. Quisque malesuada magna nec tincidunt facilisis. Nullam vitae nisi justo. Vivamus cursus nunc turpis, sed hendrerit nisi egestas at. Pellentesque non nunc mauris. Praesent erat urna, dapibus ut elit lobortis, sollicitudin vulputate nisl. Curabitur turpis orci, pretium semper eros vel, mollis efficitur nulla.' , 
    1
);