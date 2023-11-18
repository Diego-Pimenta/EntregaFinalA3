export const createQuery = `
   INSERT INTO platforms(name) VALUES (?);
`;

export const deleteQuery = `
   DELETE FROM platforms WHERE id = ?;
`;

export const findByIdQuery = `
   SELECT * FROM platforms WHERE id = ?;
`;

export const findByNameQuery = `
   SELECT * FROM platforms WHERE name LIKE ?;
`;

export const findPlatformGamesQuery = `
SELECT games.* FROM (platforms INNER JOIN games_platforms ON platforms.id = games_platforms.platform_id) INNER JOIN games ON games.id = games_platforms.game_id WHERE platforms.id = ?;
`;

export const findAllQuery = `
   SELECT * FROM platforms;
`;

export const updateQuery = `
   UPDATE platforms SET name = ? WHERE id = ?;
`;
