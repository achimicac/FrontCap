const getInvoices= "SELECT * FROM Invoice";
const getInvoiceById= "SELECT * FROM Invoice WHERE Invoice_ID = $1";
const addInvoice= `INSERT INTO Invoice (Customer_ID, Maid_ID, Room_ID, Status, Work_Date, Start_Time, Work_Time, Job_ID, Review_ID, Amount)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
const updateInvoice= `UPDATE Invoice SET Customer_ID = $1, Maid_ID = $2, Room_ID = $3, Status = $4, Work_Date = $5, Start_Time = $6, Work_Time = $7, Job_ID = $8, Review_ID = $9, Amount = $10 WHERE Invoice_ID = $11 RETURNING *`;
const deleteInvoice= "DELETE FROM Invoice WHERE Invoice_ID = $1 RETURNING *";


module.exports = {
    getInvoices,
    getInvoiceById,
    addInvoice,
    updateInvoice,
    deleteInvoice,
};
