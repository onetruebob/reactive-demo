var requestStream = Rx.Observable.just('https://api.github.com/users');

requestStream.subscribe(function(requestUrl){
  var responseStream = Rx.Observable.create(function(observer) {
    $.getJSON(requestUrl)
      .done(function(response) { observer.onNext(response); })
      .fail(function(jqXHR, status, error) { observer.onError(error); })
      .always(function() { observer.onCompleted(); });
  });

  responseStream.subscribe(function(response) {
    debugger;
  });
});
