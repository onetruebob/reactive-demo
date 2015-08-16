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
  console.log(users[1], users[2], users[3]);
}
