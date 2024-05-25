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
    maid_email,
    Room_ID,
    Status,
    Work_Date,
    Start_Time,
    Work_Time,
    Submit_Time,
    Amount,
    Note,
    jobs,
  } = req.body;

  const { email, role } = req.user;

  try {
    if (role === "customer") {
      const customer = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1",
        [email]
      );

      const customer_id = customer.rows[0].user_id;

      const maid = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1",
        [maid_email]
      );

      const maid_id = maid.rows[0].user_id;

      const addInvoice = `INSERT INTO Invoice (Customer_ID,Maid_ID,Room_ID,Review_ID,Status,Work_Date,Start_Time,Work_Time,Submit_Time,Amount,Note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

      const result = await pool.query(addInvoice, [
        customer_id,
        maid_id,
        Room_ID,
        null,
        Status,
        new Date(Work_Date),
        Start_Time,
        Work_Time,
        Submit_Time,
        Amount,
        Note,
      ]);

      let results = [];
      for (let i = 0; i < jobs.length; i++) {
        const invoice_query = await pool.query(queries.addInvoiceJob, [
          result.rows[0].invoice_id,
          jobs[i],
        ]);
        results.push(invoice_query);
      }

      return res.status(201).json({ success: true });
    } else {
      return res.status(403).json({ success: false });
    }
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
