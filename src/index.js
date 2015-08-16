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

  var user1SuggestionStream = responseStream
    .map(function(usersList){
      //Pick a random user from this list
      return usersList[Math.floor(Math.random() * usersList.length)];
    })
    .merge(refreshClickStream.map(function(){
      return null;
    }));

  var user2SuggestionStream = responseStream
    .map(function(usersList){
      //Pick a random user from this list
      return usersList[Math.floor(Math.random() * usersList.length)];
    })
    .merge(refreshClickStream.map(function(){
      return null;
    }));


  var user3SuggestionStream = responseStream
    .map(function(usersList){
      //Pick a random user from this list
      return usersList[Math.floor(Math.random() * usersList.length)];
    })
    .merge(refreshClickStream.map(function(){
      return null;
    }));


  user1SuggestionStream.subscribe(function(user1) {
    renderUserAtPos(user1, 1);
  });

  user2SuggestionStream.subscribe(function(user2) {
    renderUserAtPos(user2, 2);
  });

  user3SuggestionStream.subscribe(function(user3) {
    renderUserAtPos(user3, 3);
  });


});

function renderUserAtPos(user, pos) {
  var imgSelector = '#user-' + pos + '-img';
  var nameSelector = '#user-' + pos + '-name';

  if(user) {
    $(imgSelector).attr('src', user.avatar_url);
    $(nameSelector).text(user.login);
  } else {
    $(imgSelector).attr('src', '');
    $(nameSelector).text('loading...');
  }
}
