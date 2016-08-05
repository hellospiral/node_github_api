var apiKey = require('./../.env').apiKey;

function User() {
}

User.prototype.getRepos = function(username) {
  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
    var responseHtml = "";
    var repos = response;
    for (var i = 0; i < repos.length; i++) {
      // console.log(response[i].name);
      // console.log(response[i].description);
      responseHtml += "<h3>" + repos[i].name + "</h3><br>";
      if (repos[i].description === null) {
        responseHtml += "<hr>";
      } else {
        responseHtml += "<h5>" + repos[i].description + "</h5><hr>";
      }  
    }
    // console.log(response);
    $(".showInfo").html(responseHtml);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.userModule = User;
