var refreshButton = document.querySelector('#refreshAll');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var close1Button = document.querySelector('#user-1-replace');
var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');

var close2Button = document.querySelector('#user-2-replace');
var close2ClickStream = Rx.Observable.fromEvent(close2Button, 'click');

var close3Button = document.querySelector('#user-3-replace');
var close3ClickStream = Rx.Observable.fromEvent(close3Button, 'click');



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
      var userRequest = $.ajax(requestUrl);

      return Rx.Observable.fromPromise(userRequest);
    })
    .publish()
    .refCount();

  var user1SuggestionStream = close1ClickStream
    .startWith('startup click')
    .combineLatest(responseStream,
      function(click, userList){
        return userList[Math.floor(Math.random() * userList.length)];
      })
    .merge(refreshClickStream.map(function(){
      return null;
    }))
    .startWith(null);

  var user2SuggestionStream = close2ClickStream
    .startWith('startup click')
    .combineLatest(responseStream,
      function(click, userList){
        return userList[Math.floor(Math.random() * userList.length)];
      })
    .merge(refreshClickStream.map(function(){
      return null;
    }))
    .startWith(null);

  var user3SuggestionStream = close3ClickStream
    .startWith('startup click')
    .combineLatest(responseStream,
      function(click, userList){
        return userList[Math.floor(Math.random() * userList.length)];
      })
    .merge(refreshClickStream.map(function(){
      return null;
    }))
    .startWith(null);




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
