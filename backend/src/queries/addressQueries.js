const getAddresses = "SELECT * FROM Address";
const getAddressById = "SELECT * FROM Address WHERE Add_ID = $1";
const addAddress = `
    INSERT INTO Address (User_ID, Latitude, Longitude, Address)
    VALUES ($1, $2, $3, $4)
    RETURNING *
`;
const updateAddress = `
    UPDATE Address
    SET User_ID = $1, Latitude = $2, Longitude = $3, Address = $4
    WHERE Add_ID = $5
    RETURNING *
`;
const deleteAddress = "DELETE FROM Address WHERE Add_ID = $1 RETURNING *";

module.exports= {
    getAddresses,
    getAddressById,
    addAddress,
    updateAddress,
    deleteAddress,

};