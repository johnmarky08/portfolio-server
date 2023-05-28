const User = require("../models/Users.js");

module.exports.Update = async (req, res) => {
  const { ip } = req.query;
  const { type } = req.params;
  try {
    const old = await User.findOne({ viewers_ip: ip });
    if (!old) {
      const newView = new User({
        viewers_ip: ip,
        refresh: 1,
        visit: 1,
      });
      newView.save();

      return res.status(201).json({ result: "Success!" });
    } else if (type == "refresh") {
      const defaultCount = await User.findOne({ viewers_ip: "1.1.1.1" });
      const refreshCount = defaultCount.refresh;
      const visitCount = defaultCount.visit;
      await User.updateOne(
        { viewers_ip: "1.1.1.1" },
        { $set: { refresh: refreshCount + 1, visit: visitCount } }
      );

      return res.status(201).json({ result: "Success!" });
    } else if (type == "visit") {
      const defaultCount = await User.findOne({ viewers_ip: "1.1.1.1" });
      const refreshCount = defaultCount.refresh;
      const visitCount = defaultCount.visit;
      await User.updateOne(
        { viewers_ip: "1.1.1.1" },
        { $set: { refresh: refreshCount + 1, visit: visitCount + 1 } }
      );

      return res.status(201).json({ result: "Success!" });
    } else {
      return res.status(500).json({ error, code: 400 });
    }
  } catch (error) {
    return res.status(500).json({ error, code: 400 });
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
