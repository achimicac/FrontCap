const queries  = require("../queries");
const pool = require("../../db");

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

module.exports ={
    getRatings,
};