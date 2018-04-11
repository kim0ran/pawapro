$(function() {

  var global = App.global;
  var fn = App.fn;
  var ui = App.ui;
  var utils = App.utils;
  var views = App.views;

  /**
   * インスタンス
   */
  var viewInstance = function() {

    /* サムネイルスライダー */
    var thumbListView = new ui.thumbSlider();
    thumbListView.init({ el: '#ThumbListView' });

  };

  /* インスタンス */
  $(window).load(function() {
    viewInstance();
  });

});