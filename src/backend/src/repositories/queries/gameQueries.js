export const createQuery = `
   INSERT INTO games(title, description, genre, price, developed_by, release_date, image) VALUES (?, ?, ?, ?, ?, ?, ?);
`;

export const deleteQuery = `
   DELETE FROM games WHERE id = ?;
`;

export const findByIdQuery = `
   SELECT * FROM games WHERE id = ?;
`;

export const findByTitleQuery = `
   SELECT * FROM games WHERE title LIKE ?;
`;

export const findByPlatformIdQuery = `
   SELECT games.*, platforms.name AS platform FROM (games INNER JOIN games_platforms ON games.id = games_platforms.game_id) INNER JOIN platforms ON platforms.id = games_platforms.platform_id WHERE platforms.id = ?;
`;

export const findPlatformsQuery = `
   SELECT platforms.* FROM games_platforms INNER JOIN platforms ON games_platforms.platform_id = platforms.id WHERE games_platforms.game_id = ?;
`;

export const findAllQuery = `
   SELECT * FROM games;
`;

export const updateQuery = `
   UPDATE games SET title = ?, description = ?, genre = ?, price = ?, developed_by = ?, release_date = ? WHERE id = ?;
`;
