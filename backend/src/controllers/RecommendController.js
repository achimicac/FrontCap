const pool = require("../../db");
const kdtree = require("../../kdTree");

var distance = function (a, b) {
  let sumSquaredDiff = 0;
  const filteredKeys = [
    "latitude",
    "longitude",
    "job1",
    "job2",
    "job3",
    "job4",
    "job5",
    "job6",
    "job7",
    "job8",
    "job9",
    "job10",
    "avg_rating",
  ];
  const scaledKeys = [
    "job1",
    "job2",
    "job3",
    "job4",
    "job5",
    "job6",
    "job7",
    "job8",
    "job9",
    "job10",
    "avg_rating",
  ];
  for (const key in a) {
    if (filteredKeys.includes(key)) {
      if (a[key] === undefined) a[key] = 0;
      if (b[key] === undefined) b[key] = 0;
      const diff = a[key] - b[key];

      if (scaledKeys.includes(key)) {
        sumSquaredDiff += Math.pow(diff, 2) * 1600;
      } else {
        sumSquaredDiff += Math.pow(diff, 2);
      }
    }
  }
  return Math.sqrt(sumSquaredDiff);
};

const giveRecommendation = async (req, res) => {
  const { email, role } = req.user;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }

  try {
    if (role === "customer") {
      const { rows } = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1",
        [email]
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      const sCustomerID = rows[0].user_id;
      const customer_query = "SELECT * FROM recommend_maid WHERE user_id = $1";
      const sCustomerDataResult = await pool.query(customer_query, [
        sCustomerID,
      ]);

      if (sCustomerDataResult.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "Customer data not found" });
      }

      const sCustomerData = sCustomerDataResult.rows[0];

      const recom_query = "SELECT * FROM recommend_maid";
      const sresult = await pool.query(recom_query);

      const dataset = sresult.rows;

      if (dataset.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "Dataset is empty" });
      }

      const filteredDataset = dataset.filter(
        (data) => data.user_role !== "customer"
      );

      if (filteredDataset.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "No other users in dataset" });
      }

      const keys = Object.keys(dataset[0]);
      const tree = new kdtree.kdTree(filteredDataset, distance, keys);
      const nearest = tree.nearest(sCustomerData, 7);

      const sortedNearest = nearest
        .map((item) => ({
          user: item[0],
          distance: item[1],
        }))
        .sort((a, b) => a.distance - b.distance);

      res.status(200).json({
        success: true,
        recommend_maid: sortedNearest,
        customer_address: {
          latitude: sCustomerData.latitude,
          longitude: sCustomerData.longitude,
        },
      });
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  giveRecommendation,
};
