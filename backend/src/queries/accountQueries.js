const getAccount = "SELECT * FROM Account";
const getAccountById = `SELECT 
                        User_ID,
                        User_Role,
                        User_Gender,
                        User_Pic,
                        Firstname,
                        Lastname,
                        Birthday,
                        Tel,
                        Email,
                        Description 
                      FROM Account WHERE user_id = $1`;
const checkEmailExists = "SELECT * FROM Account WHERE Email = $1";
const addAccount = `INSERT INTO Account (
                        User_Role, 
                        User_Gender, 
                        User_Pic, 
                        Firstname, 
                        Lastname, 
                        Birthday, 
                        Tel, 
                        Email,  
                        Pass,
                        Description
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) `;
const updateAccount = `UPDATE Account SET 
                        User_Role = $1, 
                        User_Gender = $2, 
                        User_Pic = $3, 
                        Firstname = $4, 
                        Lastname = $5, 
                        Birthday = $6, 
                        Tel = $7, 
                        Email = $8, 
                        Pass = $9, 
                        Description = $10 
                    WHERE User_ID = $11 RETURNING *`;
const deleteAccount =
  "DELETE FROM Account WHERE User_ID = $1 RETURNING *', [user_id]";

const updatePicture = `UPDATE Account SET 
                        User_Pic = $1, 
                    WHERE User_ID = $2 RETURNING *`;

module.exports = {
  getAccount,
  getAccountById,
  checkEmailExists,
  addAccount,
  updateAccount,
  updatePicture,
  deleteAccount,
};
