const pool  = require("../../server");
const Pool = require ("pg").Pool;

    

const getAccount =async (req,res) => {

    pool.query("SELECT * FROM Account", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);
    });
};             

const getRooms =async (req,res) => {

    pool.query("SELECT * FROM Room", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getJobs =async (req,res) => {

    pool.query("SELECT * FROM Job", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getAddresses =async (req,res) => {

    pool.query("SELECT * FROM Address", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getRatings =async (req,res) => {

    pool.query("SELECT * FROM Rating", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getReviews =async (req,res) => {

    pool.query("SELECT * FROM Reviews", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getInvoices =async (req,res) => {

    pool.query("SELECT * FROM Invoice", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getMaidJobs =async (req,res) => {

    pool.query("SELECT * FROM MaidJob", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

const getInvoiceJobs =async (req,res) => {

    pool.query("SELECT * FROM InvoiceJob", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);    
    });
};

module.exports = {
    getAccount, 
    getRooms,  
    getJobs,
    getAddresses,   
    getRatings,
    getReviews,
    getInvoices,
    getMaidJobs,
    getInvoiceJobs,
}; 

