const mapModel = require("../model/mapModel");
const asyncHandle = require("express-async-handler");

const getAllMap = asyncHandle(async (req, res) => {
  let arr = [];
  const map = await mapModel.updateMany(
    {
      $or: [{ admin_name: "Thừa Thiên-Huế" }, { admin_name: "Đà Nẵng" }],
    },
    { lat: 5 },
    { new: true }
  );
  const count = await mapModel.countDocuments();

  //   for (let value of map) {
  //     arr.push(value.admin_name);
  //   }
  //   arr = [...new Set(arr)];
  //   console.log(arr);
  res.json({ count, map });
});

module.exports = {
  getAllMap,
};
