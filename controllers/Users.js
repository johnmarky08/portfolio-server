module.exports = async (req, res) => {
  const type = req.params.type;
  res.send(type);
};
