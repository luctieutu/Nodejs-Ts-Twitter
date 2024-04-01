import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongodb'
import { TweetAudience, TweetType, UserVerifyStatus } from '~/constants/enums'
import { TweetRequestBody } from '~/models/requests/tweet.requests'
import { RegisterReqBody } from '~/models/requests/users.requests'
import User from '~/models/schemas/User.schemas'
import databaseServices from '~/services/database.services'
import { hashPassword } from './crypto'
import Follower from '~/models/schemas/Follower.schema'
import tweetsService from '~/services/tweets.services'

// Mật khẩu cho các fake user
const PASSWORD = 'LucNT123!'
// ID của tài khoản của mình, dùng để follow người khác
const MYID = new ObjectId('66017f57f5ef02ab840c7ed1')
// Số lượng user được tạo, mỗi user sẽ mặc định tweet 2 cái
const USER_COUNT = 100

const createRandomUser = () => {
  const user: RegisterReqBody = {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: PASSWORD,
    confirm_password: PASSWORD,
    date_of_birth: faker.date.past().toISOString()
  }
  return user
}

const createRandomTweet = () => {
  const tweet: TweetRequestBody = {
    type: TweetType.Tweet,
    audience: TweetAudience.Everyone,
    content: faker.lorem.paragraph({
      min: 10,
      max: 160
    }),
    hashtags: [],
    medias: [],
    mentions: [],
    parent_id: null
  }
  return tweet
}

const users: RegisterReqBody[] = faker.helpers.multiple(createRandomUser, {
  count: USER_COUNT
})
console.log('users:', users)

const insertMultipleUsers = async (users: RegisterReqBody[]) => {
  console.log('Creating users...')
  const result = await Promise.all(
    users.map(async (user) => {
      const user_id = new ObjectId()
      await databaseServices.users.insertOne(
        new User({
          ...user,
          _id: new ObjectId(),
          username: `user${user_id.toString()}`,
          password: hashPassword(user.password),
          date_of_birth: new Date(user.date_of_birth),
          verify: UserVerifyStatus.Verified
        })
      )
      return user_id
    })
  )
  console.log(`Created ${result.length} users`)
  return result
}

const followMultipleUsers = async (user_id: ObjectId, followed_user_ids: ObjectId[]) => {
  console.log('Start following...')
  const result = await Promise.all(
    followed_user_ids.map((followed_user_id) => {
      databaseServices.followers.insertOne(
        new Follower({
          user_id,
          followed_user_id: new ObjectId(followed_user_id)
        })
      )
    })
  )
  console.log(`Followed ${result.length} users`)
}

const inserMultipleTweets = async (ids: ObjectId[]) => {
  console.log(`Creating tweets...`)
  console.log(`Counting...`)
  let count = 0
  const result = await Promise.all(
    ids.map(async (id, index) => {
      await Promise.all([
        tweetsService.createTweet(createRandomTweet(), id.toString()),
        tweetsService.createTweet(createRandomTweet(), id.toString())
      ])
      count += 2
      console.log(`Created ${count} tweets`)
    })
  )
  return result
}
insertMultipleUsers(users).then((ids) => {
  followMultipleUsers(new ObjectId(MYID), ids)
  inserMultipleTweets(ids)
})
