const pool = require("../../db");  
const queries = require("../queries/RoomQueries");

const getRooms = async (req, res) => {
    try {
        const result = await pool.query(queries.getRooms);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getRoomById = async (req, res) => {
    const id = parseInt(req.params.room_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.getRoomById, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addRoom = async (req, res) => {
    const { Room_Size, Room_Type, Room_Ratio } = req.body;

    try {
        const result = await pool.query(queries.addRoom, [Room_Size, Room_Type, Room_Ratio]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateRoom = async (req, res) => {
    const id = parseInt(req.params.room_id);
    const { Room_Size, Room_Type, Room_Ratio } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.updateRoom, [Room_Size, Room_Type, Room_Ratio, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteRoom = async (req, res) => {
    const id = parseInt(req.params.room_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.deleteRoom, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getRooms,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
};

  