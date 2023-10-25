export const init = [
  `
  CREATE DATABASE gameslibrary;
  `,
  `
  USE gameslibrary;
  `,
  `
  CREATE TABLE IF NOT EXISTS users
  (id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,
  birth_date DATE NOT NULL,
  gender VARCHAR(20) NOT NULL);
  `,
  `
  CREATE TABLE IF NOT EXISTS games
  (id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  genre VARCHAR(30) NOT NULL,
  price DOUBLE NOT NULL,
  developed_by VARCHAR(30) NOT NULL,
  release_date DATE NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
  `,
  `
  CREATE TABLE IF NOT EXISTS platforms
  (id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL);
  `,
  `
  CREATE TABLE IF NOT EXISTS grades
  (id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  grade DOUBLE NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE);
  `,
  `
  CREATE TABLE IF NOT EXISTS statuses
  (id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  status VARCHAR(30) NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE);
  `,
  `
  CREATE TABLE IF NOT EXISTS games_platforms
  (id INTEGER PRIMARY KEY AUTO_INCREMENT,
  game_id INTEGER NOT NULL,
  platform_id INTEGER NOT NULL,
  FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE,
  FOREIGN KEY(platform_id) REFERENCES platforms(id) ON DELETE CASCADE);
  `,
];
