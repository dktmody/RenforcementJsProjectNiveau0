import express  from 'express'
import {connectToMongo, findAllTasks} from './db_utils.js'

import cors from 'cors';
const app = express()
const port = 3005
app.use(express.json())
app.use(cors())

let tasks;

let dbName = 'exo' , collectionName = 'tasks';


app.get("/hello/:name", (req, res) => {

  res.json("bonjour " + req.params.name)
})

// Create
app.post('/newTask', async (req, res) => {
  try {
    const collection = await connectToMongo(dbName, collectionName);
   
    const newTask = {
      name: req.body.name,
      description: req.body.description
    }; 
   
    const result = await collection.insertOne(newTask);

    res.status(201).json({ message: "Nouvelle tâche créée", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la tâche" });
  }
});

// Read
app.get('/get-task', (req, res) => {
  let tasks;
  connectToMongo(dbName, collectionName).then(collection => {
    return findAllTasks(collection);
  }).then(Taskss => {
    tasks = Taskss;
  })  

  if (!tasks) {
    return res.status(500).json({ message: 'Aucune tâche trouvée' });
  }
  res.json(tasks);
})

//Update
app.put("/update/:name", async (req, res) => {
  try {
    const collection = await connectToMongo(dbName, collectionName);
    const result = await collection.updateOne(
      { name: req.params.name }, 
      { $set: { description: req.body.description } }  
    );
    res.json({ message: "la tâche a été modifiée", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de MAJ de la tâche" });
  }
})


// Delete
app.delete("/delete/:name", async (req, res) => {
  try {
    const collection = await connectToMongo(dbName, collectionName);

    const result = await collection.deleteOne(
      { name: req.params.name }
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json({ message: "Tâche supprimée avec succès", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche" });
  }
});



app.get('/return-json', (req, res) => {
  let data = {
    "name": "md"
  }
  res.json(data)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})