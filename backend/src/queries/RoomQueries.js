const getRooms = "SELECT * FROM Room";
const getRoomById = "SELECT * FROM Room WHERE Room_ID = $1";
const addRoom = `INSERT INTO Room (
                    Room_Type, 
                    Room_Size, 
                    Room_Ratio
                ) VALUES ($1, $2, $3) RETURNING *`;
const updateRoom = `UPDATE Room SET 
                    Room_Type = $1, 
                    Room_Size = $2, 
                    Room_Ratio = $3 
                WHERE Room_ID = $4 RETURNING *`;
const deleteRoom = "DELETE FROM Room WHERE Room_ID = $1 RETURNING *";

module.exports = {
  getRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
};
