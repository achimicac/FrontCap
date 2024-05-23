const queries = require("../queries/invoiceQueries");
const pool = require("../../db");

const getInvoices = async (req, res) => {
  pool.query("SELECT * FROM Invoice", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const getInvoiceById = async (req, res) => {
  const id = parseInt(req.params.invoice_id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  pool.query(
    "SELECT * FROM Invoice WHERE invoice_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.rows.length === 0) {
        res.status(404).json({ error: "Invoice not found" });
        return;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const addInvoice = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const result = await pool.query(queries.addInvoice, [
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
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInvoice = async (req, res) => {
  const id = parseInt(req.params.invoice_id);
  const {
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
  } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.updateInvoice, [
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
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteInvoice = async (req, res) => {
  const id = parseInt(req.params.invoice_id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.deleteInvoice, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
