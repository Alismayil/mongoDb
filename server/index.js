const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.use(express.json())

const UserSchema = new Schema(
  {
    name: String,
    surname: String,
    age: Number,
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);



app.get("/", async (req, res) => {
  const data = await Users.find({});
  res.send(data);
});



app.get("/:id", async (req, res) => {
    const {id}=req.params
  try {
    const data = await Users.findById(id).exec();
    res.send(data);
  } catch (error) {
    res.status(500).json({message:error})
  }
});




app.post("/", async (req, res) => {
  try {
    const data = new Users({
        ...req.body
    });
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({message:error})
  }
});




app.delete("/:id", async (req, res) => {
    const {id}=req.params
  try {
    const data = await Users.findByIdAndDelete(id).exec();
    res.send(data);
  } catch (error) {
    res.status(500).json({message:error})
  }
});




app.put("/:id", async (req, res) => {
    const {id}=req.params
  try {
    const data = await Users.findByIdAndUpdate(id, req.body).exec();
    res.send(data);
  } catch (error) {
    res.status(500).json({message:error})
  }
});











mongoose
  .connect("mongodb+srv://AliIsmayil:ali123@cluster0.tzldidp.mongodb.net")
  .then(() => console.log("Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
