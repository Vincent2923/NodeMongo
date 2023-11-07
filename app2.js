const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
app.use(express.json());
const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);
let db;

async function go() {
  try {
    conn = await client.connect();
    db = conn.db("animaux");
  } catch (e) {
    console.error(e);
  }
}

go();

app.get("/createcollection", async (req, res) => {
  let collection = await db.createCollection("collection");
  let results = await collection.insertOne({"nom":"toto","vaccinated":false})
  res.json(results);
  // collection.insertOne({nom:"chien"})
  // res.json();
});

app.get("/insert", async (req, res) => {
  let collection = await db.collection("collection")
  let results = await collection.insertOne({"nom":"pol","vaccinated":true})
  res.json(results);
});

app.get("/modif", async (req, res) => {
  let collection = await db.collection("collection");
  let results = await collection.updateOne({"nom":"toto"},{$set:{"vaccinated":false}})
  res.json(results);
});

app.get("/delete", async (req, res) => {
  let collection = await db.collection("collection");
  let results = await collection.deleteOne({"nom":"pol"})
  res.json(results);
});

app.get("/deletemany", async (req, res) => {
  let collection = await db.collection("collection");
  let results = await collection.deleteMany({"nom":"pol"})
  res.json(results);
});

app.get("/modifmany", async (req, res) => {
  let collection = await db.collection("collection");
  let results = await collection.updateMany({ "nom" : "pol"}, { $set: { "vaccinated" : false}})
  res.json(results);
});

app.get("/", async (req, res) => {
  let collection = await db.collection("unicorns");
  // Pour avoir les licornes vaccinées :
  let results = await collection.find({ vaccinated: true }).toArray();

  // Pour avoir les attributs name et gender (le 1 est là pour "vrai") :
  // let results = await collection.find({}).project({name:1, gender:1}).toArray();

  // La même chose, mais sans l'id (le 0 est là pour "faux") :
  // let results = await collection.find({}).project({name:1, gender:1, _id:0}).toArray();

  // Pour avoir tous les éléments "plus grand que" :
  // let results = await collection.find({ vampires : { $gt: 50}}).toArray();

  // Pour avoir tous les éléments "plus petit que" :
  // let results = await collection.find({ vampires : { $lt: 50}}).toArray();

  res.json(results);
});

app.listen(3050, () => console.log("ecoute sur 3050"));
