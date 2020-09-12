import GetOldTweets3 as got
import json

tweetCriteria = got.manager.TweetCriteria().setUsername("idestructor")\
                                           .setTopTweets(True)\
                                           .setMaxTweets(10)

tweet = got.manager.TweetManager.getTweets(tweetCriteria)[0]

# print(got.manager.TweetManager.getTweets(tweetCriteria)) 

json_string = json.dumps([ob.__dict__ for ob in got.manager.TweetManager.getTweets(tweetCriteria)])

print(json_string)

print(tweet.text)