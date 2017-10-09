var GITHUB_USER = "mintedred";
var GITHUB_T = process.env.GITHUB_TOKEN;
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ 'api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var requestLink = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project',
      "Authorization": "token " + GITHUB_T
    },
    url: requestURL
  };

  request.get(requestLink, function (error, response, body) {
      console.log('statusCode:', response && response.statusCode);
      if (error) {
          console.log('error:', error);
      } else {
          console.log('body:', body);
      }
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});