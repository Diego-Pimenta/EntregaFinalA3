export const examples = [
  `
  INSERT INTO users(username, email, password, birth_date, gender) VALUES
  ('test1', 'test1@gmail.com', '123', '2002-01-01', 'masc'),
  ('test2', 'test2@gmail.com', '123', '2002-01-01', 'masc'),
  ('test3', 'test3@gmail.com', '123', '2002-01-01', 'masc'),
  ('test4', 'test4@gmail.com', '123', '2002-01-01', 'masc'),
  ('test5', 'test5@gmail.com', '123', '2002-01-01', 'masc'),
  ('test6', 'test6@gmail.com', '123', '2003-01-01', 'fem'),
  ('test7', 'test7@gmail.com', '123', '2003-01-01', 'fem'),
  ('test8', 'test8@gmail.com', '123', '2003-01-01', 'fem'),
  ('test9', 'test9@gmail.com', '123', '2003-01-01', 'fem'),
  ('test10', 'test10@gmail.com', '123', '2003-01-01', 'fem');
  `,
  `
  INSERT INTO games(user_id, title, description, genre, price, developed_by, release_data) VALUES
  ();
  `,
  `
  INSERT INTO platforms(name) VALUES
  ('Steam'),
  ('Xbox'),
  ('Origin'),
  ('Epic Games'),
  ('Playstation'),
  ('Battle.net'),
  ('Riot'),
  ('Nintendo'),
  ('uPlay'),
  ('App Store'),
  ('Play Store');
  `,
  `
  INSERT INTO grades(user_id, game_id, grade) VALUES
  (),
  `,
  `
  INSERTO INTO statuses(user_id, game_id, status) VALUES
  (1, 1, 'jogado'),
  (1, 1, 'jogando'),
  (1, 1, 'zerado'),
  (1, 1, 'recomendo'),
  (1, 1, 'não recomendo'),
  (1, 1, 'abandonado');
  `,
  `
  INSERT INTO game_platforms(game_id, platform_id) VALUES
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
