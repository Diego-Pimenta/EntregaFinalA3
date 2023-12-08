export const createGamePlatformQuery = `
   INSERT INTO games_platforms(game_id, platform_id) VALUES (?, ?);
`;

export const deleteGamePlatformQuery = `
   DELETE FROM games_platforms WHERE game_id = ? AND platform_id = ?;
`;
