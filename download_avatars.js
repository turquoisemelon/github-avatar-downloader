var request = require('request');

var GITHUB_USER = 'turquoisemelon';
var GITHUB_TOKEN = 'c870aa54065387d127ffcc86d26f81c905e9e9b2';

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request.get(options, function(error, response, body) {

    if (error) {
      console.log('Got an error: ', error);
      return;
    }

    if (response.statusCode == 200) {
      console.log('Response Status Code: ', response.statusCode);
      console.log('Options: ', options);
      console.log('Got body: ', body);
      cb(body);
    }
  })
}

getRepoContributors('jquery', 'jquery', function(something) {
  console.log('The body is: ', something);
});
