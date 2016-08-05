var User = require('./../js/user.js').userModule;

$(document).ready(function() {
  var currentUserObject = new User();
  $('#userInfo').click(function() {
    var name = $('#name').val();
    $('#location').val("");
    currentUserObject.getUserInfo(name);
    currentUserObject.getRepos(name);
  });
});
