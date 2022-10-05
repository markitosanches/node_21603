const twit = require('../config/twit')

//used at schema 1
const getUserTweets = (screen_name, limit) => {
    return twit
    .get("statuses/user_timeline", { screen_name, count: limit })
    .then(({ data }) => {
        return data.map(tweet =>({
          create_at: tweet.create_at,
          text: tweet.text,
          retweets_count: tweet.retweets_count,
          likes: tweet.favorite_count
        }))
    })
    .catch(err => handleError(err))
}

//used at schema 1
const getMostLikedTweet = async screen_name => {
    return await getUserTweets(screen_name)
    .map(({text, likes}) =>({
        tweet_text: text,
        likes
    }))
    .reduce((prev, current) => (prev.likes > current.likes ? prev : current));
}

//used at schema 2
const getUser = screen_name => {
    return twit
      .get("users/lookup", { screen_name })
      .then(({ data }) => ({
        name: data[0].name,
        screen_name: data[0].screen_name,
        description: data[0].description,
        followers_count: data[0].followers_count,
        friends_count: data[0].friends_count
      }))
      .catch(err => handleError(err));
  };

//used at schema 2
  const getUserFriends = (screen_name, limit) => {
    return twit
      .get("friends/list", { screen_name, count: limit })
      .then(({ data: { users: friends } }) => ({ friends }))
      .catch(err => handleError(err));
  };

//used at schema 2
  const getUserFollowers = (screen_name, limit) => {
    return twit
      .get("followers/list", { screen_name, count: limit })
      .then(({ data: { users: followers } }) => ({ followers }))
      .catch(err => handleError(err));
  };

  const handleError = error => {
    console.log("An error occured", error);
    throw new Error("Whooops!", error);
  };


module.exports = {
    getUserTweets,
    getMostLikedTweet,
    getUser,
    getUserFriends,
    getUserFollowers
}