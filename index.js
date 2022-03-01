const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

//Permitindo que o server express possa utilizar o formato JSON
app.use(express.json())

//Setando configurações do cors
app.use(function(req, res, next){
    app.use(cors())
    res.header("Access-Control-Allow-Origin", "*");
    next()
});

//Importando arquivo onde estão as funções do Neo4J
const neo4j = require('./neo4j/neo4j')

//Adicionando caminhos para execução das funções
app.post('/createNewUser', neo4j.createNewUser)
app.post('/createNewRelationship', neo4j.createNewRelationship)


//Setando servidor na porta 3000
app.listen(port, ()=>{
    console.log(`Server online na porta: ${port}`)
})