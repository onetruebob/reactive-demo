var refreshButton = document.querySelector('#refreshAll');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

// var requestStream = Rx.Observable.just('https://api.github.com/users');
var requestStream = refreshClickStream
  .startWith('force load once')
  .map(function() {
    var randomOffset = Math.floor(Math.random() * 1000);
    return 'https://api.github.com/users?since=' + randomOffset;
  });


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
