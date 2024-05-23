const getInvoices = "SELECT * FROM Invoice";
const getInvoiceById = "SELECT * FROM Invoice WHERE Invoice_ID = $1";
const addInvoice = `INSERT INTO Invoice (
                        Customer_ID,
                        Maid_ID,
                        Room_ID,
                        Review_ID,
                        Status,
                        Work_Date,
                        Start_Time,
                        Work_Time,
                        Submit_Time,
                        Amount,
                    )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
const updateInvoice = `UPDATE Invoice SET 
                            Customer_ID = $1, 
                            Maid_ID = $2, 
                            Room_ID = $3, 
                            Review_ID = $4, 
                            Status = $5, 
                            Work_Date = $6, 
                            Start_Time = $7, 
                            Work_Time = $8, 
                            Submit_Time = $9, 
                            Amount = $10 
                        WHERE Invoice_ID = $11 RETURNING *`;
const deleteInvoice = "DELETE FROM Invoice WHERE Invoice_ID = $1 RETURNING *";

module.exports = {
  getInvoices,
  getInvoiceById,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
