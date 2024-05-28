const queries = require("../queries/invoiceQueries");
const pool = require("../../db");
const { search } = require("../routes/accountRoute");

const getInvoice = async (req, res) => {
  const { email, role } = req.user;

  try {
    if (role === "customer") {
      const user_query =
        "SELECT * FROM Account WHERE email = $1 OR user_id = $2";
      const customer = await pool.query(user_query, [email, null]);
      const customer_id = customer.rows[0].user_id;

      const invoice = await pool.query(queries.getInvoice, [customer_id]);
      const invoice_data = invoice.rows;

      let result = [];
      for (let i = 0; i < invoice_data.length; i++) {
        const invoiceJob = await pool.query(queries.getInvoiceJobs, [
          invoice_data[i].invoice_id,
        ]);
        const maid_id = invoice_data[i].maid_id;
        const maid = await pool.query(user_query, [null, maid_id]);
        const maid_data = maid.rows[0];

        const invoice_job_ids = invoiceJob.rows.map((ij) => ij.job_id);
        let jobs = [];
        for (let j = 0; j < invoice_job_ids.length; j++) {
          const getJobById = "SELECT * FROM Job WHERE Job_ID = $1";
          const { rows } = await pool.query(getJobById, [invoice_job_ids[j]]);
          jobs.push(rows[0]);
        }

        const mergeInvoiceJobs = {
          user_pic: maid_data.user_pic,
          firstname: maid_data.firstname,
          lastname: maid_data.lastname,
          status: invoice_data[i].status,
          work_date: invoice_data[i].work_date,
          start_time: invoice_data[i].start_time,
          work_time: invoice_data[i].work_time,
          submit_time: invoice_data[i].submit_time,
          amount: invoice_data[i].amount,
          jobs: jobs,
        };
        result.push(mergeInvoiceJobs);
      }

      return res.status(200).json({
        success: true,
        invoice: result,
      });
    } else {
      return res.status(403).json({ success: false });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
    room_id,
    status,
    work_date,
    start_time,
    work_time,
    end_time,
    amount,
    note,
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

      const exist_query =
        "select * from invoice where customer_id = $1 and maid_id = $2 AND (Invoice.work_date + Invoice.start_time = CURRENT_TIMESTAMP) ";
      const invoice_check = await pool.query(exist_query, [
        customer_id,
        maid_id,
      ]);

      const check_status = invoice_check.rows.filter(
        (invoice) => invoice.status === "wait"
      );
      if (check_status.length > 0)
        return res
          .status(400)
          .json({ success: false, error: "ทำการจ้างไปแล้ว" });

      const result = await pool.query(queries.addInvoice, [
        customer_id,
        maid_id,
        room_id,
        null,
        status,
        new Date(work_date),
        start_time,
        work_time,
        end_time,
        amount,
        note,
      ]);

      let results = [];
      for (let i = 0; i < jobs.length; i++) {
        const invoice_query = await pool.query(queries.addInvoiceJob, [
          result.rows[0].invoice_id,
          jobs[i].job_id,
        ]);
        results.push(invoice_query);
      }

      return res.status(201).json({ success: true });
    } else {
      return res
        .status(403)
        .json({ success: false, error: "บัญชีผู้ใช้ไม่ถูกต้อง" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInvoice = async (req, res) => {
  const id = parseInt(req.params.Invoice_ID);
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
  const id = parseInt(req.params.Invoice_ID);

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

///Aut
const getInvoiceForCustomerWait = async (req, res) => {
  const { email, role } = req.user;
  try {
    if (role === "customer") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_customer_wait = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype FROM ( SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
        FROM Invoice 
        LEFT JOIN InvoiceJob 
        ON Invoice.invoice_id = InvoiceJob.invoice_id 
        LEFT JOIN Job ON Job.job_id = InvoiceJob.job_id 
        WHERE (Invoice.status = 'wait' OR Invoice.status = 'work') 
        AND (Invoice.work_date + Invoice.start_time > CURRENT_TIMESTAMP) 
        AND Invoice.customer_id = $1 GROUP BY Invoice.invoice_id) inv 
        LEFT JOIN Account acc 
        ON acc.user_id = inv.maid_id`,
        [user_id]
      );
      console.log(search_customer_wait.rows);
      res.status(200).json(search_customer_wait.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoiceForCustomerWork = async (req, res) => {
  console.log("hello");
  const { email, role } = req.user;
  try {
    if (role === "customer") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_customer_work = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype 
          FROM (SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
          FROM Invoice 
          LEFT JOIN InvoiceJob 
            ON Invoice.invoice_id = InvoiceJob.invoice_id 
            LEFT JOIN Job 
            ON Job.job_id = InvoiceJob.job_id 
          WHERE Invoice.status = 'work'
          AND (Invoice.work_date + Invoice.start_time <= CURRENT_TIMESTAMP)
            AND Invoice.customer_id = $1 
            GROUP BY Invoice.invoice_id) inv 
            LEFT JOIN Account acc ON acc.user_id = inv.maid_id`,
        [user_id]
      );
      console.log(search_customer_work.rows);
      res.status(200).json(search_customer_work.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getInvoiceForCustomerEnd = async (req, res) => {
  console.log("hello");
  const { email, role } = req.user;
  try {
    if (role === "customer") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_customer_end = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype 
        FROM (SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
        FROM Invoice 
        LEFT JOIN InvoiceJob 
        ON Invoice.invoice_id = InvoiceJob.invoice_id 
        LEFT JOIN Job 
        ON Job.job_id = InvoiceJob.job_id 
        WHERE (Invoice.status = 'end') 
        AND (Invoice.review_id IS NULL) 
        AND Invoice.customer_id = $1 GROUP BY Invoice.invoice_id) inv 
        LEFT JOIN Account acc ON acc.user_id = inv.maid_id`,
        [user_id]
      );
      console.log(search_customer_end.rows);
      res.status(200).json(search_customer_end.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoiceForMaidWork = async (req, res) => {
  console.log("hello");
  const { email, role } = req.user;
  try {
    if (role === "maid") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_customer_work = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype 
          FROM (SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
          FROM Invoice 
          LEFT JOIN InvoiceJob 
            ON Invoice.invoice_id = InvoiceJob.invoice_id 
            LEFT JOIN Job 
            ON Job.job_id = InvoiceJob.job_id 
          WHERE Invoice.status = 'work'
            AND Invoice.maid_id = $1 
            GROUP BY Invoice.invoice_id) inv 
            LEFT JOIN Account acc ON acc.user_id = inv.customer_id`,
        [user_id]
      );
      console.log(search_customer_work.rows);
      res.status(200).json(search_customer_work.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getInvoiceForMaidWait = async (req, res) => {
  const { email, role } = req.user;
  try {
    if (role === "maid") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_customer_wait = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype 
        FROM ( 
          SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
          FROM Invoice 
          LEFT JOIN InvoiceJob 
          ON Invoice.invoice_id = InvoiceJob.invoice_id 
          LEFT JOIN Job 
          ON Job.job_id = InvoiceJob.job_id 
          WHERE Invoice.status = 'wait'
          AND (Invoice.work_date + Invoice.start_time > CURRENT_TIMESTAMP) 
          AND Invoice.maid_id = $1 
            GROUP BY Invoice.invoice_id) inv 
            LEFT JOIN Account acc 
            ON acc.user_id = inv.customer_id`,
        [user_id]
      );
      console.log(search_customer_wait.rows);
      res.status(200).json(search_customer_wait.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoiceForMaidEnd = async (req, res) => {
  const { email, role } = req.user;
  try {
    if (role === "maid") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_customer_end = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype 
        FROM ( 
          SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
          FROM Invoice 
          INNER JOIN InvoiceJob 
          ON Invoice.invoice_id = InvoiceJob.invoice_id 
          INNER JOIN Job 
          ON Job.job_id = InvoiceJob.job_id 
          WHERE Invoice.status = 'end'
          AND Invoice.maid_id = $1 
            GROUP BY Invoice.invoice_id) inv 
            INNER JOIN Account acc 
            ON acc.user_id = inv.customer_id`,
        [user_id]
      );
      console.log(search_customer_end.rows);
      res.status(200).json(search_customer_end.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInvoiceStatus = async (req, res) => {
  const id = parseInt(req.params.Invoice_ID);
  const status = req.params.status;
  const { current_time } = req.body;
  console.log(current_time);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    if (current_time) {
      const result = await pool.query(
        `UPDATE Invoice 
                SET status = $1, submit_time = $2
                WHERE Invoice_ID = $3 RETURNING *`,
        [status, current_time, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.status(200).json(result.rows[0]);
    } else {
      const result = await pool.query(
        `UPDATE Invoice 
                SET status = $1
                WHERE Invoice_ID = $2 RETURNING *`,
        [status, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoiceByDate = async (req, res) => {
  const { email, role } = req.user;
  const { date } = req.body;
  console.log(date);
  try {
    if (role === "maid") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_by_date = await pool.query(
        /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
        `SELECT inv.*, acc.*, jobtype 
          FROM ( 
            SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
            FROM Invoice 
            INNER JOIN InvoiceJob 
            ON Invoice.invoice_id = InvoiceJob.invoice_id 
            INNER JOIN Job ON Job.job_id = InvoiceJob.job_id 
            WHERE Invoice.maid_id = $1 AND Invoice.work_date = $2
            GROUP BY Invoice.invoice_id) inv 
          INNER JOIN Account acc 
          ON acc.user_id = inv.maid_id`,
        [user_id, date]
      );
      console.log(search_by_date.rows);
      res.status(200).json(search_by_date.rows);
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSummaryInvoiceMaidside = async (req, res) => {
  const { invoice_id } = req.params;

  try {
    const search_by_id = await pool.query(
      /*"SELECT * FROM Invoice WHERE (status = 'wait' OR status = 'work') AND (work_date + start_time > CURRENT_TIMESTAMP)AND customer_id = $1",*/
      `SELECT inv.*, acc.*, jobtype, Address.latitude, Address.longitude, Address.address,Room.* 
            FROM ( 
              SELECT Invoice.*, ARRAY_AGG(json_build_object('job_id', Job.job_id, 'job_name', Job.job_name)) AS jobtype 
              FROM Invoice 
              INNER JOIN InvoiceJob 
              ON Invoice.invoice_id = InvoiceJob.invoice_id 
              INNER JOIN Job ON Job.job_id = InvoiceJob.job_id 
              WHERE Invoice.invoice_id = $1
              GROUP BY Invoice.invoice_id) inv 
            INNER JOIN Account acc 
            ON acc.user_id = inv.maid_id
			      INNER JOIN Address 
			      ON Address.user_id = acc.user_id
            INNER JOIN Room
            ON Room.room_id = inv.room_id`,
      [invoice_id]
    );
    console.log(search_by_id.rows[0]);
    res.status(200).json(search_by_id.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getInvoice,
  getInvoiceById,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceForCustomerWait,
  getInvoiceForCustomerWork,
  getInvoiceForCustomerEnd,
  getInvoiceForMaidWait,
  getInvoiceForMaidWork,
  getInvoiceForMaidEnd,
  updateInvoiceStatus,
  getInvoiceByDate,
  getSummaryInvoiceMaidside,
};
