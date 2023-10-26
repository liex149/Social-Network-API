const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { ObjectId } = require('mongodb');
connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
    console.log("names dropped-----------------");
  }

  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
    console.log("thoughts dropped-----------------");
  }

const thought1ObId = new ObjectId()
const thought2ObId = new ObjectId()
const thought3ObId = new ObjectId()
const thought4ObId = new ObjectId()
const thought5ObId = new ObjectId()

  await Thought.collection.insertMany([
    {
      _id: thought1ObId,
      thoughtText: "thought 1",
    },
    {
      _id: thought2ObId,
      thoughtText: "thought 2",
    },
    {
      _id: thought3ObId,
      thoughtText: "thought 3",
    },
    {
      _id: thought4ObId,
      thoughtText: "thought 4",
    },
    {
      _id: thought5ObId,
      thoughtText: "thought 5",
    },
  ]);


const KirkObId = new ObjectId()
const FrotoObId = new ObjectId()
const DobbyObId = new ObjectId()
const CrunchObId = new ObjectId()

  await User.collection.insertMany([
    {
      _id: KirkObId,
      username: "CapKirk",
      email: "CapKirk@gmail.com",
      thoughts: [thought1ObId],
      friends: [FrotoObId],
    },
    {
      _id: FrotoObId,
      username: "Froto",
      email: "Froto@gmail.com",
      thoughts: [thought3ObId],
      friends: [KirkObId],
    },
    {
      _id: DobbyObId,
      username: "Dobby",
      email: "Dobby@gmail.com",
      thoughts: [thought2ObId],
      friends: [FrotoObId, KirkObId, CrunchObId],
    },
    {
      _id: CrunchObId,
      username: "CapCrunch",
      email: "CapCrunch@gmail.com",
      thoughts: [thought4ObId],
      friends: [DobbyObId],
    },
  ]);

  // Log out the seed data to indicate what should appear in the database

  console.info("Seeding complete! 🌱");
  process.exit(0);
});