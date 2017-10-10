var GITHUB_USER = "mintedred";
var GITHUB_T = process.env.GITHUB_TOKEN;
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ 'api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestLink = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project',
      "Authorization": "token " + GITHUB_T
    },
    url: requestURL
  };

  request.get(requestLink, function (error, response, body) {
      // console.log('statusCode:', response && response.statusCode);
      if (error) {
        cb(error);
      } else {
        cb("", JSON.parse(body)); 
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

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log("Errors:", err);
  } else {
    console.log("Images downloaded.");
    result.forEach(function(user) {
      downloadImageByURL(user.avatar_url, "./avatars/" + user.login + '.jpg');
    });
  }
});
