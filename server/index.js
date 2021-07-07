require("dotenv").config();
const express = require("express");
const routers = require("./routers");
const PORT = 3000;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
