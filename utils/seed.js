const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "User" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("User");
    console.log("names dropped-----------------");
  }

  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "Thought" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("Thought");
    console.log("thoughts dropped-----------------");
  }

  await Thought.collection.insertMany([
    {
      _id: "HRmn0As5R56dsSDFe86121f1ey1S1", 
      thoughtText: "my first thought",
    },
    {
      _id: "HRmn0As5R56dsSDFe86121f1ey1S2", 
      thoughtText: "my second thought",
    },
    {
      _id: "HRmn0As5R56dsSDFe86121f1ey1S3", 
      thoughtText: "my 3rd thought",
    },
    {
      _id: "HRmn0As5R56dsSDFe86121f1ey1S4", 
      thoughtText: "my 4th thought",
    },
    {
      _id: "HRmn0As5R56dsSDFe86121f1ey1S5", 
      thoughtText: "my 5th thought",
    },
  ]);

  await User.collection.insertMany([
    {
      _id: '65308ada461f580c1ee8c472',
      username: "Michael",
      email: "Michael@gmail.com",
      thoughts: ["HRmn0As5R56dsSDFe86121f1ey1S1","HRmn0As5R56dsSDFe86121f1ey1S2"],
      friends: ['65308ada461f580c1ee8c474', "65308ada461f580c1ee8c473", "65308ada461f580c1ee8c475"],
    },
    {
      _id: '65308ada461f580c1ee8c473',
      username: "Linh",
      email: "Linh@gmail.com",
      thoughts: ["HRmn0As5R56dsSDFe86121f1ey1S5"],
      friends: ["65308ada461f580c1ee8c472", "65308ada461f580c1ee8c473"],
    },
    {
      _id: '65308ada461f580c1ee8c474',
      username: "Yee",
      email: "Yee@gmail.com",
      thoughts: ["HRmn0As5R56dsSDFe86121f1ey1S4"],
      friends: ["65308ada461f580c1ee8c472", "65308ada461f580c1ee8c473"],
    },
    {
      _id: '65308ada461f580c1ee8c475', 
      username: "Jim",
      email: "Jim@gmail.com",
      thoughts: [],
      friends: ["65308ada461f580c1ee8c472"],
    },
  ]);

  // Log out the seed data to indicate what should appear in the database

  console.info("Seeding complete! 🌱");
  process.exit(0);
});