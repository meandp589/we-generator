const status = require("../../utils/enum/status");

exports.healthCheckFunc = async (req, res) => {
  try {
    return res.status(200).send("OK")
  } catch (error) {
    appLog.error(error);
    return res.status(500).send(status.SYSTEM_ERROR);
  }
};
