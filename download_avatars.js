var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'turquoisemelon';
var GITHUB_TOKEN = 'c870aa54065387d127ffcc86d26f81c905e9e9b2';

function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName) {
    console.log(`error: please provide the repo owner and repo name`);
    return;
  }

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
      var json = JSON.parse(body);
      cb(json);
    }
  })
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
    console.log('Downloading the image...');
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function() {
    console.log('Download complete.');
  });
}

getRepoContributors(process.argv[2], process.argv[3], function(something) {
  for (var elem of something) {
    var file_path = `avatars/${elem.login}.jpg`
    var avatar_url = elem.avatar_url;
    downloadImageByURL(avatar_url, file_path);
  }
});
