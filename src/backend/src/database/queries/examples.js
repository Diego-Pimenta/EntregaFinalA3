export const examples = [
  `
  INSERT INTO users(id, username, email, password, birth_date, gender) VALUES
  (1, 'user1', 'user1@gmail.com', '123456', '2002-01-01', 'masc'),
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
  INSERT INTO games(id, title, description, genre, price, developed_by, release_date, image) VALUES
  (1, 'Elden Ring', 'Em Elden Ring os jogadores percorrem livremente pelo mundo aberto interativo, onde os elementos de jogabilidade incluem combate, com vários tipos de armas e feitiços mágicos, passeios a cavalo e crafting.', 'RPG de ação', 229.99, 'FromSoftware', '2022-02-25', 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/12/elden-ring-cover.jpg'),
  (2, 'Sekiro', 'O jogo se passa em uma versão mágica e fictícia do período Sengoku no Japão, e segue um shinobi que tenta se vingar de um clã samurai que o atacou e sequestrou seu lorde.', 'Ação-aventura', 274.00, 'FromSoftware', '2019-03-22', 'https://static.miraheze.org/allthetropeswiki/9/9e/Sekiro_cover.jpg'),
  (3, 'Cyberpunk 2077', 'Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto que se passa em Night City, uma megalópole perigosa onde todos são obcecados por poder, glamour e alterações corporais.', 'RPG, FPS', 199.99, 'CD Projekt', '2020-11-10', 'https://cdnb.artstation.com/p/assets/covers/images/033/037/923/large/artur-tarnowski-artur-tarnowski-coverart-thumbnail.jpg?1608208435'),
  (4, 'Starfield', 'Starfield é um jogo eletrônico de RPG de ação e ficção descrito como uma experiência de próxima geração totalmente nova, ambientada em um mundo com temática espacial totalmente novo.', 'RPG espacial', 299.99, 'Bethesda Game Studios', '2023-09-06', 'https://preview.redd.it/who-are-the-people-on-the-cover-art-v0-4r2l5k1zrnpb1.jpg?auto=webp&s=42185372cae6321f603672631fedbbd35b7dcdc8'),
  (5, 'The Elder Scrolls V: Skyrim', 'Skyrim é um jogo de RPG que mantém a tradicional jogabilidade de mundo aberto encontrada na série The Elder Scrolls. O jogador é livre para andar pela terra de Skyrim a sua vontade.', 'RPG', 149.99, 'Bethesda Game Studios', '2011-11-11', 'https://howlongtobeat.com/games/TheElderScrollsVSkyrimLegendaryEdition.jpg'),
  (6, "Baldur's Gate III", "Baldur's Game III é um jogo eletrônico de RPG com elementos para um jogador e multijogador. Jogadores podem criar um ou mais personagens e formar um grupo ao lado de uma variedade de personagens já criados para explorar o enredo do jogo.", "RPG", 199.99, "Larian Studios", "2023-08-03", "https://preview.redd.it/new-game-cover-from-larians-website-v0-m2lmw222h0ka1.png?auto=webp&s=ba904ad42906960a96a70ce1c27ee6d3ff5edead"),
  (7, 'The Legend of Zelda: Ocarina of Time', 'The Legend of Zelda: Ocarina of Time é um jogo de ação e aventura e fantasia ambientado em um cenário expansivo. O jogador controla o protagonista da série, Link, a partir de uma perspectiva em terceira pessoa, num mundo tridimensional.', 'Ação-aventura', 29.99, 'Nintendo', '1998-11-21', 'https://images.nintendolife.com/82f557404ec71/legend-of-zelda-ocarina-of-time-cover.cover_large.jpg'),
  (8, 'Doom', 'A história acompanha um fuzileiro espacial enquanto luta contra forças demoníacas em uma colônia de Marte. A jogabilidade tem um ritmo rápido e envolve navegação de ambientes, combate com diferentes tipos de armas e a capacidade de realizar execuções especiais.', 'FPS', 29.99, 'id Software', '1993-11-10', 'https://preview.redd.it/who-is-the-artist-for-the-alternate-2016-doom-cover-art-v0-eti4s76gkbt81.jpg?auto=webp&s=eb5888e5a4144a95bb9ca10799a2b9c5a38f29c9'),
  (9, 'Need For Speed: Underground 2', 'Need For Speed: Underground 2 é um jogo de corrida de 2004 desenvolvido pela EA Black Box e publicado pela Electronic Arts. É a oitava edição da série Need for Speed ​​e a sequência direta de Need for Speed: Underground.', 'Corrida', 19.99, 'Electronic Arts', '2004-11-09', 'https://cdn.mobygames.com/covers/4210266-need-for-speed-underground-2-playstation-2-front-cover.jpg'),
  (10, 'Dying Light', 'Um jogo de ação e sobrevivência em primeira pessoa em um mundo aberto pós-apocalíptico tomado por zumbis comedores de carne humana. Atravesse uma cidade devastada por um vírus misterioso. Procure por suprimentos, crie armas e enfrente os infectados.', 'Surivival horror', 74.99, 'Techland', '2015-01-26', 'https://upload.wikimedia.org/wikipedia/en/c/c0/Dying_Light_cover.jpg');
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
  (1, 1, 1, 9.2),
  (2, 1, 2, 10),
  (3, 1, 3, 7.4),
  (4, 2, 4, 8.7),
  (5, 2, 5, 8),
  (6, 2, 6, 6.8),
  (7, 3, 7, 6.2),
  (8, 3, 8 , 7.9),
  (9, 3, 9, 9.8),
  (10, 3, 10, 7.3);
  `,
  `
  INSERT INTO statuses(id, user_id, game_id, status) VALUES
  (1, 1, 1, 'Recomendo'),
  (2, 1, 2, 'Jogado'),
  (3, 1, 3, 'Jogando'),
  (4, 2, 4, 'Não recomendo'),
  (5, 2, 5, 'Jogado'),
  (6, 2, 6, 'Jogando'),
  (7, 3, 7, 'Recomendo'),
  (8, 3, 8, 'Zerado'),
  (9, 3, 9, 'Recomendo'),
  (10, 3, 10, 'Zerado');
  `,
  `
  INSERT INTO games_platforms(id, game_id, platform_id) VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 4),
  (4, 4, 1),
  (5, 5, 5),
  (6, 6, 5),
  (7, 7, 8),
  (8, 8, 1),
  (9, 9, 3),
  (10, 10, 4);
  `,
];
