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
        const query = `create(:Pessoa{name: '${name}', email: '${email}', data: '${data}', time: '${time}', timeZone: '${timeZone}'})`
        await session.run(query)
        console.log('Usuário inserido com sucesso!')
        return res.status(200).send()
    }catch(error){
        console.log(error)
    }finally{
        await session.close()
    }
}

module.exports = {
    createNewUser
}