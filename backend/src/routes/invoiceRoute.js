const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/InvoiceController");
const { auth } = require("../middleware/auth");

router.get('/', invoiceController.getInvoices);
router.get('/:Invoice_ID', invoiceController.getInvoiceById);
router.post('/', invoiceController.addInvoice);
router.put('/:Invoice_ID', invoiceController.updateInvoice);
router.delete('/:Invoice_ID', invoiceController.deleteInvoice);

router.post('/customer/status/wait', auth, invoiceController.getInvoiceForCustomerWait)
router.post('/customer/status/work', auth, invoiceController.getInvoiceForCustomerWork)
router.post('/customer/status/end', auth, invoiceController.getInvoiceForCustomerEnd)

module.exports = router;