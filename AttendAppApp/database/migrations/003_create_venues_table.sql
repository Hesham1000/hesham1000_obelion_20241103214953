CREATE TABLE venues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photos JSON NOT NULL,
    capacity INT NOT NULL CHECK (capacity >= 1),
    amenities JSON NOT NULL,
    pricing VARCHAR(255) NOT NULL,
    reviews JSON
);
