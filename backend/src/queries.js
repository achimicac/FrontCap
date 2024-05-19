const getAccount = "SELECT * FROM Account";
const getAccountById = "SELECT * FROM Account WHERE user_id = $1";
const checkEmailExists = "SELECT * FROM Account WHERE Email = $1" ;
const addAccount= "INSERT INTO Account (User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ";
module.exports = {
    getAccount,
    getAccountById,
    checkEmailExists,
    addAccount,
};


