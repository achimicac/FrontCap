const getInvoice = "SELECT * FROM Invoice WHERE customer_id = $1";
const getInvoiceJobs = "SELECT * FROM InvoiceJob WHERE Invoice_ID = $1";
const getInvoiceById = "SELECT * FROM Invoice WHERE Invoice_ID = $1";
const addInvoice = `INSERT INTO Invoice (Customer_ID,Maid_ID,Room_ID,Review_ID,Status,Work_Date,Start_Time,Work_Time,end_Time,Amount,Note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
const addInvoiceJob = `INSERT INTO InvoiceJob (Invoice_ID, Job_ID) VALUES ($1, $2) RETURNING *`;
const updateInvoice = `UPDATE Invoice SET 
                            Customer_ID = $1, 
                            Maid_ID = $2, 
                            Room_ID = $3, 
                            Review_ID = $4, 
                            Status = $5, 
                            Work_Date = $6, 
                            Start_Time = $7, 
                            Work_Time = $8, 
                            Amount = $10 
                        WHERE Invoice_ID = $11 RETURNING *`;
const deleteInvoice = "DELETE FROM Invoice WHERE Invoice_ID = $1 RETURNING *";

module.exports = {
  getInvoice,
  getInvoiceJobs,
  getInvoiceById,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  addInvoiceJob,
};
