const getAccount = "SELECT * FROM Account";
const getAccountById = "SELECT * FROM Account WHERE user_id = $1";
const checkEmailExists = "SELECT * FROM Account WHERE Email = $1" ;
const addAccount = "INSERT INTO Account (User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email,  Description,Pass) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ";
const updateAccount = "UPDATE Account SET User_Role = $1, User_Pic = $2, Firstname = $3, Lastname = $4, Birthday = $5, Tel = $6, Email = $7, Description = $8, Pass = $9WHERE User_ID = $10 RETURNING *";
const deleteAccount = "DELETE FROM Account WHERE User_ID = $1 RETURNING *', [user_id]";

module.exports = {
    getAccount,
    getAccountById,
    checkEmailExists,
    addAccount,
    updateAccount,
    deleteAccount,
};