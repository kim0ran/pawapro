(function(app, window, decument, undefined) {

  app.fn = {

    /**
     * スマホ判定
     */
    isMediaSp: function() {
      return ($(window).width() > 750) ? false : true;
    }

  };

})(App, window, document);