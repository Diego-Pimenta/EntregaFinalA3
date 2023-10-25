export const createQuery = `
   INSERT INTO users(username, email, password, birth_date, gender) VALUES (?, ?, ?, ?, ?);
`;

export const deleteQuery = `
   DELETE FROM users WHERE id = ?;
`;

export const findByIdQuery = `
   SELECT * FROM users WHERE id = ?;
`;

export const findByUsernameQuery = `
   SELECT * FROM users WHERE username = ?;
`;

export const findByEmailQuery = `
   SELECT * FROM users WHERE email = ?;
`;

export const findAllQuery = `
   SELECT * FROM users;
`;

export const updateQuery = `
   UPDATE users SET password = ? WHERE id = ?;
`;
