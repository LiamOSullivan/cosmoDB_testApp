var mongoose = require('mongoose');
var env = require('dotenv').load(); //Use the .env file to load the variables

mongoose.connect(process.env.COSMOSDB_CONNSTR + "&replicaSet=globaldb", {
    auth: {
      user: process.env.COSMODDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    }
  })
  .then(() => console.log('\n\nConnection to CosmosDB successful\n\n'))
  .catch((err) => console.log('\n\nError\n' + err + '\n\n'))


console.log("\n\nCosmoDB test app started\n\n");

const BikesStationSchema = new mongoose.Schema({
  "name": {
    type: String
  },
  "address": {
    type: String
  },
  "number": {
    type: Number
  },
  "position": {
    "lat": Number,
    "lng": Number
  },
  "last_update": {
    type: Number
  },
  "banking": {
    type: Boolean
  },
  "bonus": {
    type: Boolean
  },
  "bike_stands": {
    type: Number
  },
  "available_bike_stands": {
    type: Number,
  },
  "available_bikes": {
    type: Number,
  },
  "status": {
    type: String,
  }
});

const Station = mongoose.model('Station', BikesStationSchema);

const doc = new Station({
  "number": 42,
  "contract_name": "Dublin",
  "name": "SMITHFIELD NORTH",
  "address": "Smithfield North",
  "position": {
    "lat": 53.349562,
    "lng": -6.278198
  },
  "banking": true,
  "bonus": false,
  "bike_stands": 30,
  "available_bike_stands": 26,
  "available_bikes": 4,
  "status": "OPEN",
  "last_update": 1551888400000
});

// doc.save((err, saveDoc) => {
//   console.log(JSON.stringify(saveDoc));
// });

Station.find({}, function(err, foundDoc) {
  foundDoc.forEach(d => console.log("Found : " + JSON.stringify(d)));
});