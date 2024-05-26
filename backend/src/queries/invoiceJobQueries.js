const getInvoiceJobs= 'SELECT * FROM InvoiceJob';
const getInvoiceJobById= 'SELECT * FROM InvoiceJob WHERE Invoice_ID = $1 AND Job_ID = $2';
const addInvoiceJob= 'INSERT INTO InvoiceJob (Invoice_ID, Job_ID) VALUES ($1, $2) RETURNING *';
const deleteInvoiceJob= 'DELETE FROM InvoiceJob WHERE Invoice_ID = $1 RETURNING *';

module.exports = {
    getInvoiceJobs,
    getInvoiceJobById,
    addInvoiceJob,
    deleteInvoiceJob,
};

