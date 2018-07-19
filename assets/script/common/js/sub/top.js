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

    /* 能力詳細 */
    var detailAbilityView = new ui.switchContents();
    detailAbilityView.init({ el: '#DetailAbilityView' });

  };

  /* インスタンス */
  $(window).load(function() {
    viewInstance();
  });

});