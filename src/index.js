var requestStream = Rx.Observable.just('https://api.github.com/users');

requestStream.subscribe(function(requestUrl){
  var responseStream = requestStream
    .flatMap(function(requestUrl) {
      return Rx.Observable.fromPromise($.getJSON(requestUrl));
    });

  responseStream.subscribe(function(response) {
    renderThreeUsers(response);
  });
});

function renderThreeUsers(users) {
  $('#user-1-img').attr('src', users[0].avatar_url);
  $('#user-1-name').text(users[0].login);
  $('#user-2-img').attr('src', users[1].avatar_url);
  $('#user-2-name').text(users[1].login);
  $('#user-3-img').attr('src', users[2].avatar_url);
  $('#user-3-name').text(users[2].login);
}
