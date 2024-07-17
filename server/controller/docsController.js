const Document = require("../Model/Document");

const getAllDocs = async (req, res) => {
  try {
    const Docs = await Document.find({ userId: req.body.userId });
    res.send({
      success: true,
      data: Docs,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Docs not found",
    });
  }
};
module.exports = { getAllDocs };
