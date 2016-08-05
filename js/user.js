var apiKey = require('./../.env').apiKey;

function User() {
}

User.prototype.getUserInfo = function(username) {
  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(response){
    var memberSince = moment(response.created_at);
    var profileHtml = "";
    profileHtml += "<h2>" + response.name + "</h2>";
    profileHtml += '<img src="' + response.avatar_url + '"><br>';
    profileHtml += "<h5>Email: " + response.email + "</h5>";
    profileHtml += "<h5>Member since " + (memberSince.month() + 1) + "/" + memberSince.date() + "/" + memberSince.year() + "</h5>";
    profileHtml += "<h5>" + response.location + "</h5>";
    profileHtml += "<h5>" + response.followers + " followers</h5><hr>";
    $(".showUserInfo").html(profileHtml);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
}

User.prototype.getRepos = function(username) {
  $.get('https://api.github.com/users/' + username + '/repos?page=1&per_page=100&access_token=' + apiKey).then(function(response){
    // console.log(response);
    var responseHtml = "<h2>Public Repos:</h2><br>";
    var repos = response;
    for (var i = 0; i < repos.length; i++) {
      var created = moment(repos[i].pushed_at);
      responseHtml += '<h3><a href="' + repos[i].html_url + '">' + repos[i].name + '</a></h3>';
      if (repos[i].language !== null) {
        responseHtml += "<h5>" + repos[i].language + "</h5>";
      }
      responseHtml += "<h5>Created on: " + (created.month() + 1) + "/" + created.date() + "/" + created.year() + "</h5>";
      if (repos[i].description === null) {
        responseHtml += "<br><hr>";
      } else {
        responseHtml += "<h5>" + repos[i].description + "</h5><br><hr>";
      }
    }
    $(".showInfo").html(responseHtml);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.userModule = User;
