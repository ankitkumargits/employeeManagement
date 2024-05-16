const express = require('express');
const connectToMySql = require('./db/conn');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000
connectToMySql;
app.use(cors());
app.use(express.json());
app.use("/api/employees", require("./routes/emp"));
app.use("/api/loan", require("./routes/loan"));
app.use("/api/loanrepay", require("./routes/loanRepay"));

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});