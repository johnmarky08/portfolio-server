const User = require("../models/Users.js");

module.exports = async (req, res) => {
  const { ip } = req.query;
  const type = req.params.type;
  if (type == "view") {
    const old = await User.findOne({ ip });
    if (!old) {
      const newView = new User({
        viewers_ip: ip,
        refresh: true,
      });
      newView.save();

      return res.status(201).json({ result: "Success!" });
    } else {
      return res.status(200).json({ message: "Already Addded!" });
    }
  } else if (type == "refresh") {
    const newRefresh = new User({
      refresh: true,
    });
    newRefresh.save();

    return res.status(201).json({ result: "Success!" });
  } else {
    res.status(500).json({ message: "Wrong Type!", code: 400 });
  }
};
