import { MongoClient } from 'mongodb'

//const client = new MongoClient('mongodb+srv://mailengomez:snapent123@cluster0.6ddjcic.mongodb.net/test')
const client = new MongoClient('mongodb+srv://mailengomez:snapent123@cluster0.6ddjcic.mongodb.net/?retryWrites=true&w=majority')


await client.connect()

const db = client.db('DB_SNAPENT')

export{
    db
}