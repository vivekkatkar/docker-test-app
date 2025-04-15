import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import  mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
const dbURI = process.env.DATABASE_URL;

console.log(dbURI);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

const seedUsers = async () => {
  const users = [
    { name: 'Alice', email: 'alice@example.com', age: 30 },
    { name: 'Bob', email: 'bob@example.com', age: 25 },
    { name: 'Charlie', email: 'charlie@example.com', age: 35 }
  ];

  await User.insertMany(users);
  console.log('Users seeded');
};

seedUsers();

app.get("/", (req, res) => {
    res.status(200).json({
        message : "Welcome to server"
    })
})

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).send('Error retrieving users');
    }
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});