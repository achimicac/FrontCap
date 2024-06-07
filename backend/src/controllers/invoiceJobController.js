const pool = require("../../db");
const queries = require("../queries/invoiceJobQueries");

const getInvoiceJobs = async (req, res) => {
  try {
    const result = await pool.query(queries.getInvoiceJobs);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoiceJobById = async (req, res) => {
  const { invoice_id, job_id } = req.params;

  try {
    const result = await pool.query(queries.getInvoiceJobById, [
      invoice_id,
      job_id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "InvoiceJob not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addInvoiceJob = async (req, res) => {
  const { Invoice_ID, Job_ID } = req.body;

  try {
    const result = await pool.query(queries.addInvoiceJob, [
      Invoice_ID,
      Job_ID,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteInvoiceJob = async (req, res) => {
  const { invoice_id } = req.params;
  console.log(invoice_id);

  try {
    const result = await pool.query(queries.deleteInvoiceJob, [invoice_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "InvoiceJob not found" });
    }
    res.status(200).json({ message: "InvoiceJob deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getInvoiceJobs,
  getInvoiceJobById,
  addInvoiceJob,
  deleteInvoiceJob,
};
