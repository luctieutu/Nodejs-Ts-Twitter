import { ObjectId } from 'mongodb'
import databaseServices from './database.services'
import Like from '~/models/schemas/Like.schema'

class LikeService {
  async like(user_id: string, tweet_id: string) {
    const result = await databaseServices.likes.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Like({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweet_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return result
  }
  async unlike(user_id: string, tweet_id: string) {
    const result = await databaseServices.likes.findOneAndDelete({
      tweet_id: new ObjectId(tweet_id),
      user_id: new ObjectId(user_id)
    })
    return result
  }
}

const likeService = new LikeService()
export default likeService
