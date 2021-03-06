const express = require("express");
const ConnectDataBase = require("./config/db");
const port = process.env.PORT || 5000;
const app = express();
ConnectDataBase();
app.use(express.json({ extended: false }));
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/posts", require("./routes/post"));
app.listen(port, () => console.log(`Backend running on port ${port}`));
