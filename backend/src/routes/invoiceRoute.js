const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/InvoiceController");
const { auth } = require("../middleware/auth");

router.post("/getInvoice", auth, invoiceController.getInvoice);
router.get('/:Invoice_ID', invoiceController.getInvoiceById);
router.post("/addInvoice", auth, invoiceController.addInvoice);
router.put('/:Invoice_ID', invoiceController.updateInvoice);
router.delete('/:Invoice_ID', invoiceController.deleteInvoice);

router.put('/:Invoice_ID/:status', invoiceController.updateInvoiceStatus)

router.post('/customer/status/wait', auth, invoiceController.getInvoiceForCustomerWait)
router.post('/customer/status/work', auth, invoiceController.getInvoiceForCustomerWork)
router.post('/customer/status/end', auth, invoiceController.getInvoiceForCustomerEnd)

router.post('/maid/status/wait', auth, invoiceController.getInvoiceForMaidWait)
router.post('/maid/status/work', auth, invoiceController.getInvoiceForMaidWork)
router.post('/maid/status/end', auth, invoiceController.getInvoiceForMaidEnd)

router.post('/maid/main', auth, invoiceController.getInvoiceByDate)

router.get('/maid/summary/:invoice_id', invoiceController.getSummaryInvoiceMaidside)

module.exports = router;