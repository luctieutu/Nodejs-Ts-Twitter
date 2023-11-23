import { MongoClient, Db, Collection } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.shemas'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.nzifep7.mongodb.net/?retryWrites=true&w=majority`

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string)
  }
}

const databaseServices = new DatabaseServices()
export default databaseServices
