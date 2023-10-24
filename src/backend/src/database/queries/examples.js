export const examples = [
  `
  INSERT INTO users(id, username, email, password, birth_date, gender) VALUES
  (1, 'user1', 'test1@gmail.com', '123456', '2002-01-01', 'masc'),
  (2, 'user2', 'user2@gmail.com', '123456', '2003-01-01', 'masc'),
  (3, 'user3', 'user3@gmail.com', '123456', '2002-01-01', 'masc'),
  (4, 'user4', 'user4@gmail.com', '123456', '2003-01-01', 'masc'),
  (5, 'user5', 'user5@gmail.com', '123456', '2002-01-01', 'masc'),
  (6, 'user6', 'user6@gmail.com', '123456', '2003-01-01', 'fem'),
  (7, 'user7', 'user7@gmail.com', '123456', '2002-01-01', 'fem'),
  (8, 'user8', 'user8@gmail.com', '123456', '2003-01-01', 'fem'),
  (9, 'user9', 'user9@gmail.com', '123456', '2002-01-01', 'fem'),
  (10, 'user10', 'user10@gmail.com', '123456', '2003-01-01', 'fem');
  `,
  `
  INSERT INTO games(id, user_id, title, description, genre, price, developed_by, release_data) VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();
  `,
  `
  INSERT INTO platforms(id, name) VALUES
  (1, 'Steam'),
  (2, 'Xbox'),
  (3, 'Origin'),
  (4, 'Epic Games'),
  (5, 'Playstation'),
  (6, 'Battle.net'),
  (7, 'Riot'),
  (8, 'Nintendo'),
  (9, 'uPlay'),
  (10, 'App Store'),
  (11, 'Play Store');
  `,
  `
  INSERT INTO grades(id, user_id, game_id, grade) VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();
  `,
  `
  INSERTO INTO statuses(id, user_id, game_id, status) VALUES
  (1, 1, 1, 'jogado'),
  (2, 1, 2, 'jogando'),
  (3, 1, 3, 'zerado'),
  (4, 1, 4, 'recomendo'),
  (5, 1, 5, 'não recomendo'),
  (6, 1, 6, 'abandonado'),
  (7, 1, 7, ''),
  (8, 1, 8, ''),
  (9, 1, 9, ''),
  (10, 1, 10, '');
  `,
  `
  INSERT INTO game_platforms(id, game_id, platform_id) VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();
  `,
];
