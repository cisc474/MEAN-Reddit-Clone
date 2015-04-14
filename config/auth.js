// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '614843358650981', // your App ID
        'clientSecret'  : 'b3c79e0748209c1b93a18e1a64df0f24', // your App Secret
        'callbackURL'   : 'http://ateam474.space:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'GdR9TwPUkjB4nuxBMUVLDNoab',
        'consumerSecret'    : 'd4vprzevTYyP3HzqyuMjpVPZNH5zasWJVGpWvsLhfRLtDe0Mwz',
        'callbackURL'       : 'http://ateam474.space:3000/auth/twitter/callback'
    },
    
    'githubAuth' : {
        'clientID'      : '3a7f1d9314790be036a9',
        'clientSecret'  : '2f822f9df172fc632616ebf37fff3e9413e2045d',
        'callbackURL'   : 'http://ateam474.space:3000/auth/github/callback'
    }

};