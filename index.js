const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ng7ll.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
      await client.connect();
      const carPartsCollection = client.db('car_parts').collection('carParts');
      
      app.get('/carParts', async (req, res) => {
          const query = {};
          const cursor = carPartsCollection.find(query);
          const carParts = await cursor.toArray();
          res.send(carParts);
      })

      app.get('/carParts/:id', async(req, res) =>{
          const id = req.params.id;
          const query={_id: ObjectId(id)};
          const CarParts = await carPartsCollection.findOne(query);
          res.send(CarParts);
      })

  }
  finally{

  }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('car parts')
})

app.listen(port, () => {
  console.log(`Car parts listening on port ${port}`)
})