const express = require("express");
const router = express.Router();

console.log(`============ pages.js =============`);
router.get("/", (req, res) => {
  res.render("index");
});

router.use((req, res, next) => {
  console.log("==== routes/pages ======");
  console.log(`request made to: ${req.url}`);
  next();
});

module.exports = router;
