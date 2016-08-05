var apiKey = require('./../.env').apiKey;

function User() {
}

User.prototype.getRepos = function(username) {
  $.get('https://api.github.com/users/' + username + '/repos?page=1&per_page=100&access_token=' + apiKey).then(function(response){
    console.log(response);
    var responseHtml = "";
    var repos = response;
    for (var i = 0; i < repos.length; i++) {
      var created = moment(repos[i].pushed_at);
      responseHtml += '<h3><a href="' + repos[i].html_url + '">' + repos[i].name + '</a></h3><br>';
      responseHtml += "<h5>" + repos[i].language + "</h5><br>";
      responseHtml += "<h5>Created on: " + (created.month() + 1) + "/" + created.date() + "/" + created.year() + "</h5><br>";
      if (repos[i].description === null) {
        responseHtml += "<hr>";
      } else {
        responseHtml += "<h5>" + repos[i].description + "</h5><hr>";
      }
    }
    $(".showInfo").html(responseHtml);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.userModule = User;
