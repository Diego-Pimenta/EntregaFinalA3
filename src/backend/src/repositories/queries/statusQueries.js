export const createQuery = `
   INSERT INTO statuses(user_id, game_id, status) VALUES (?, ?, ?);
`;

export const deleteQuery = `
   DELETE FROM statuses WHERE id = ?;
`;

export const findByUserIdQuery = `
   SELECT * FROM statuses WHERE user_id = ?;
`;

export const findByGameIdQuery = `
   SELECT * FROM statuses WHERE game_id = ?;
`;

export const findByIdQuery = `
   SELECT * FROM statuses WHERE id = ?;
`;

export const findAllQuery = `
   SELECT * FROM statuses;
`;

export const updateQuery = `
   UPDATE statuses SET status = ? WHERE id = ?;
`;
