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
  db = conn.db("poilus");
} catch (e) {
  console.error(e);
}
}
go() 

// Creer 
app.get("/creerpoilus", async (req, res) => {
  let collection = await db.createCollection("poilus");
  collection.insertOne({nom : 'chat'}); 
  res.json({message :'Création ok'});
});

// Update
app.get("/modifierpoilus", async (req, res) => {
  let query = {nom :'chat'};
  let update = {nom : 'chien'};
  await db.collection('poilus').updateOne(query, {$set:update});
  res.json({message :'modification ok'});
});

app.listen(3030,() => console.log('Listen on 3030'))

