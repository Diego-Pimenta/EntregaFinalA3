export const createQuery = `
   INSERT INTO grades(user_id, game_id, grade) VALUES (?, ?, ?);
`;

export const deleteQuery = `
   DELETE FROM grades WHERE id = ?;
`;

export const findByIdQuery = `
   SELECT * FROM grades WHERE id = ?;
`;

export const findByUserIdQuery = `
   SELECT * FROM grades WHERE user_id = ?;
`;

export const findByGameIdQuery = `
   SELECT * FROM grades WHERE game_id = ?;
`;

export const findAllQuery = `
   SELECT * FROM grades;
`;

export const updateQuery = `
   UPDATE grades SET grade = ? WHERE id = ?;
`;
