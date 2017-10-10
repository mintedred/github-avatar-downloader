var GITHUB_USER = "mintedred";
var GITHUB_T = process.env.GITHUB_TOKEN;
var request = require('request');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

// cb is a function that takes 2 parameters: err (that is set to a string describing the error, otherwise it is false), and result (an array of objects with user information)
function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    console.log('Please enter valid values for repo owner and repo name.');
    return;
  }
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_T + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // GitHub requires a "User-Agent" header
  var requestLink = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    },
    url: requestURL
  };

  request.get(requestLink, function (error, response, body) {
      if (error) {
        console.log('error:', error);
      } else {
        cb(false, JSON.parse(body)); 
      }
    });

}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {                          
      throw err; 
    })
    .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(repoOwner, repoName, function(err, result) {
  if (err) {
    console.log("Errors:", err);
  } else {
    result.forEach(function(user) {
      downloadImageByURL(user.avatar_url, "./avatars/" + user.login + '.jpg');
    });
    console.log("Images downloaded.");
  }
});
