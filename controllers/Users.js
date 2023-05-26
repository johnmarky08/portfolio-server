const User = require("../models/Users.js");

module.exports.Update = async (req, res) => {
  const { ip } = req.query;
  try {
    const old = await User.findOne({ viewers_ip: ip });
    if (!old) {
      const newView = new User({
        viewers_ip: ip,
        refresh: true,
      });
      newView.save();

      return res.status(201).json({ result: "Success!" });
    } else {
      const newRefresh = new User({
        refresh: true,
      });
      newRefresh.save();

      return res.status(201).json({ result: "Success!" });
    }
  } catch (error) {
    res.status(500).json({ error, code: 400 });
  }
};

module.exports.Read = async (req, res) => {
  try {
    const users = await User.find({});
    const response = (users) => {
      var userRes = [];
      users.forEach((user) => {
        userRes.push(user);
      });

      res.status(200).json({
        code: 200,
        result: userRes,
      });
    };
    response(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
};
