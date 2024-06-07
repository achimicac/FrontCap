const express = require("express");
const router = express.Router();
const invoiceJobController = require("../controllers/invoiceJobController");

router.get('/', invoiceJobController.getInvoiceJobs);
router.get('/:invoice_id/:job_id', invoiceJobController.getInvoiceJobById);
router.post('/', invoiceJobController.addInvoiceJob);
router.delete("/:invoice_id", invoiceJobController.deleteInvoiceJob);

module.exports = router;