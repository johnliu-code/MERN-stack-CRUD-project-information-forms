const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');

//Initial app and set database url with .env
require('dotenv').config();
const app = express();
const url = process.env.MONGODB_URI;;
const port = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors());

//Run server at 5000
app.listen(port, function () {
    console.log(`listening on port ${port}`)
})

//Connect to mongodb and do CRUD with data
MongoClient.connect(url, { useUnifiedTopology: true })
.then((client) => {
    console.log('Connected to Database')
    const db = client.db('userDB')
    const individusCollection = db.collection('individus')
    //READ (CRUD : C R--> READ UD)
    app.get('/api/individus', (req, res) => {
        db.collection('individus').find().toArray()
            .then(results => {
                res.json(results);
            })
            .catch(error => console.error(error))
    })
    //READ (Find one by id)
        app.get('/api/individus/find/:search', (req, res) => {
            db.collection('individus').findOne(
                {$or: [{nom: req.params.search}, {prenom: req.params.search}]}
            )
                .then(result => {
                    res.json(result);
                    console.log(result);
                })
                .catch(error => console.error(error))
        })
    //CREATE (CRUD : C--> Create RUD)
    app.post('/api/individus/', (req, res) => {
       console.log(req.body)
       db.collection('individus').insertOne(req.body)
            .then(result => {
                res.json('result')
            })
            .catch(error => console.error(error))
    })
    //UPDATE (CRUD : CR--> Update D)
    app.put('/api/individus/:id', (req, res) => {
        individusCollection.findOneAndUpdate(
            { _id: ObjectId(req.params.id)},
            {
                $set: {
                    genre: req.body.genre, 
                    nom: req.body.nom, 
                    prenom: req.body.prenom, 
                    naissance: req.body.naissance, 
                    ville: req.body.ville, 
                    pays: req.body.pays, 
                    nationalite: req.body.nationalite, 
                    numeroPassport: req.body.numeroPassport, 
                    paysPassport: req.body.paysPassport, 
                    deliverancePassport: req.body.deliverancePassport, 
                    expirationPassport: req.body.expirationPassport, 
                }
            },
            {
                upsert: true
            }
            )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))

    })
    //DELETE (CRUD : CRU --> Delete)
    app.delete('/api/individus/:id', (req, res) => {
        individusCollection.deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No data to delete')
                }
                res.json(`Successfully deleted`)
            })
            .catch(error => console.error(error))
    })
})
.catch(error => console.error(error));


