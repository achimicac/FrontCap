const checkEmailExists = 'SELECT EXISTS (SELECT 1 FROM Account WHERE Email = $1)';
const getAllAccounts = 'SELECT * FROM Account';
const createAccount = `
  INSERT INTO Account (User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Descript)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *`;
const updateAccount = `
  UPDATE Account
  SET User_Role = $1, User_Pic = $2, Firstname = $3, Lastname = $4, Birthday = $5, Tel = $6, Email = $7, Pass = $8, Descript = $9
  WHERE User_ID = $10
  RETURNING *`;
const deleteAccount = 'DELETE FROM Account WHERE User_ID = $1 RETURNING *';
module.exports = {
  checkEmailExists,
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};