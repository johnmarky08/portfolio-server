const User = require("../models/Users.js");

module.exports = async (req, res) => {
  const { ip } = req.query;
  const type = req.params.type;
  if (type == "view") {
    const newView = new User({
      viewers_ip: ip,
      refresh: true,
    });
    const savedView = newView.save();

    return res.status(201).json({ result: savedView });
  } else if (type == "refresh") {
    const newRefresh = new User({
      refresh: true,
    });
    const savedRefresh = newRefresh.save();

    return res.status(201).json({ result: savedRefresh });
  } else {
    res.status(500).json({ message: "Wrong Type!", code: 400 });
  }
};
