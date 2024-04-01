import Bookmark from '~/models/schemas/Bookmark.schema'
import databaseServices from './database.services'
import { ObjectId } from 'mongodb'

class BookmarkService {
  async bookmarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseServices.bookmarks.findOneAndUpdate(
      { user_id: new ObjectId(user_id), tweet_id: new ObjectId(tweet_id) },
      {
        $setOnInsert: new Bookmark({
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
  async unbookmarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseServices.bookmarks.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result
  }
}

const bookmarkService = new BookmarkService()
export default bookmarkService
