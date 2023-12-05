export const createGamePlatformQuery = `
   INSERT INTO games_platforms(game_id, platform_id) VALUES (?, ?);
`;

export const updateGamePlatformQuery = `
   UPDATE games_platforms SET platform_id = ? WHERE game_id = ?;
`;

export const deleteGamePlatformQuery = `
   DELETE FROM games_platforms WHERE game_id = ?;
`;
