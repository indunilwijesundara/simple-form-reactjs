const express = require('express');
const app = express();
const personsRoute = require('./routes'); 
const cors = require('cors');

app.use(cors());


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use('/api', personsRoute);

const port = 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
