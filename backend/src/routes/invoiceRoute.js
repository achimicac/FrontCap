const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/InvoiceController");

router.get('/', invoiceController.getInvoices);
router.get('/:Invoice_ID', invoiceController.getInvoiceById);
router.post('/', invoiceController.addInvoice);
router.put('/:Invoice_ID', invoiceController.updateInvoice);
router.delete('/:Invoice_ID', invoiceController.deleteInvoice);

module.exports = router;