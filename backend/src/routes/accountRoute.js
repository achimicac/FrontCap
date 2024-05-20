const { Router } = require("express");
const AccountController = require("../controllers/AccountController");

const router = Router();

router.get('/account', AccountController.getAllAccounts);
//router.post('/account', AccountController.createAccount);
//router.put('/account/:User_id', AccountController.updateAccount);
//router.delete('/account/:Userid', AccountController.deleteAccount);



module.exports = router;
            
