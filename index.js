const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const authRouter = require('./routers/auth.route');

const mongoURL = process.env.MONGO_URL || "mongodb+srv://rutikakhedkar:4UWPlJHoUreR5rsN@clusterrutika0.ywl8dvo.mongodb.net/notesapp";

app.use(cors());
app.use(express.json());   // IMPORTANT
const mongoose = require('mongoose');


mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error ❌", err));


app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log('Server is running on port 8000');
});
