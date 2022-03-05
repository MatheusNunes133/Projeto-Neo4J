require('dotenv').config()

const neo4j = require('neo4j-driver')

const uri =  `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`
const driver = neo4j.driver(uri, neo4j.auth.basic(
    process.env.NEO4J_USER, process.env.NEO4J_PASSWORD
))

const session = driver.session()

//Criando função para adicionar um novo usuário
async function createNewUser(req, res){
    const { name, email, data, time, timeZone} = req.body
    try{
    //Verificando se existem o emails informado registrados no banco
    const searchQuery = 'match(n) return n'
    let result = await session.run(searchQuery)
    let search = 0
    let resultRecords = result.records
        resultRecords.forEach(item=>{
            let fields = item._fields
                fields.forEach((item2, indice)=>{
                    if(item2.properties.email == email){
                        search++
                    }
                })
        })
        
        if(search!=1){
            const query = `create(:Pessoa{name: '${name}', email: '${email}', data: '${data}', time: '${time}', timeZone: '${timeZone}'})`
            await session.run(query)
            console.log('Usuário inserido com sucesso!')
            return res.status(200).send()
        }else{
            return res.status(400).send('Email já registrado')
        }
        
    }catch(error){
        console.log(error)
    }
}

//Criando relação de amizade entre dois usuários
async function createNewRelationship(req, res){
    const {firstUserEmail, secondUserEmail, relationshipType} = req.body
    try {
        //Verificando se existem os dois emails informados registrados no banco
        const searchQuery = 'match(n) return n'
        let result = await session.run(searchQuery)
        let search = 0
        let resultRecords = result.records
            resultRecords.forEach(item=>{
                let fields = item._fields
                    fields.forEach((item2, indice)=>{
                        if(item2.properties.email == firstUserEmail || item2.properties.email == secondUserEmail){
                            search++
                        }
                    })
            })
        //Se existirem o resultado tem que ser igual a 2
        if(search == 2){
            const query = `match(firstUser:Pessoa), (secondUser:Pessoa)
                        where firstUser.email = '${firstUserEmail}' and secondUser.email = '${secondUserEmail}'
                        create (firstUser)-[r:${relationshipType}]->(secondUser)`
            await session.run(query)
            console.log('Relacionamento criado com sucesso!')
            return res.status(200).send()
        }else{
            return res.status(400).send('Algum usuário foi informado errado ou não existem esses usuários!')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewUser,
    createNewRelationship
}