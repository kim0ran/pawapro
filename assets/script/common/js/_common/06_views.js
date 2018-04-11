(function(app, window, decument, undefined) {

  /**
   * ページ
   */
  app.views.PageView = (function() {
    var constructor = function(el) {
      this.$el = {};
      this.$anchor = {};
      this.footerView = {};
      this.isAnimate = false;
      this.scrollSpeed = 500;
      this.scrollTopModalOpened = 0;
      this.init(el);
      return this;
    };
    var proto = constructor.prototype;
    proto.init = function(el) {
      this.setEl(el);
      this.setChildViewInstance();
      this.setEvents();
      this.setCustomEvents();
      return this;
    };
    proto.setEl = function(el) {
      this.$el = $(el);
      this.$anchor = this.$el.find('a[href^="#"]');
      return this;
    };
    proto.setChildViewInstance = function() {

      /* ヘッダ */
      this.headerView = new app.views.HeaderView();
      this.headerView.parentViewEl = this.$el;
      this.headerView.init({ el: '#HeaderView' });

      /* フッタ */
      this.footerView = new app.views.FooterView();
      this.footerView.init({ el: '#FooterView' });

      /* サイドバー */
      var sidebarView = new app.ui.accordion();
      sidebarView.init({
        el: '#SidebarView',
        isSpOnly: true
      });

      return this;
    };
    proto.setEvents = function() {
      var that = this;
      this.$anchor.on('click', function(e) {
        e.preventDefault();
        if(!that.isAnimate) {
          that.smoothScroll($(this).attr('href'));
          that.isAnimate = false;
        }
        return false;
      });
      $(window).on('scroll', function() {
        if(!that.isAnimate) {
          that.onScroll($(window).scrollTop());
          that.isAnimate = false;
        }
      });
      $(window).on('resize', function() {
        that.onResize();
      });
      return this;
    };
    proto.smoothScroll = function(href) {
      this.isAnimate = true;
      var $target = $(href === '#' || href === '' ? 'html' : href);
      if($target.length > 0) {
        var position = $target.offset().top;
        $('html, body').animate({
          scrollTop: position
        }, this.scrollSpeed, 'swing');
      }
      return this;
    };
    proto.onScroll = function(scrollTop) {
      this.isAnimate = true;
      this.footerView.onScroll(scrollTop);
      return this;
    };
    proto.onResize = function() {
      this.headerView.onResize();
      this.footerView.onResize();
      return this;
    };
    proto.setCustomEvents = function() {
      var that = this;
      this.$el.on('setStyleOpenModal', function() {
        that.scrollTopModalOpened = $(window).scrollTop();
        that.$el.css({
          position: 'fixed',
          top: -that.scrollTopModalOpened
        });
      });
      this.$el.on('setStyleCloseModal', function() {
        that.$el.css({
          position: 'static',
          top: 'auto'
        });
        $(window).scrollTop(that.scrollTopModalOpened);
      });
      return this;
    };
    
    return constructor;
  })();

  /**
   * ヘッダ
   */
  app.views.HeaderView = (function() {
    var constructor = function() {
      this.$el = {};
      this.$globalNav = {};
      this.$btnGlobalNavToggle = {};
      this.$globalNavList = {};
      this.classGlobalNavActiveOuter = 'opened';
      this.classGlobalNavActive = 'active';
      this.isGlobalNavOpen = false;
      this.isAnimate = false;
      this.scrollTopOpened = 0;
      return this;
    };
    var proto = constructor.prototype;
    proto.init = function(args) {
      this.setEl(args.el);
      this.setStyle();
      this.setEvents();
      return this;
    };
    proto.setEl = function(el) {
      this.$el = $(el);
      this.$globalNav = this.$el.find('.js-globalNav');
      this.$btnGlobalNavToggle = this.$globalNav.find('.js-btnGlobalNavToggle');
      this.$globalNavList = this.$globalNav.find('.js-globalNavList');
      return this;
    };
    proto.setStyle = function() {
      if(app.fn.isMediaSp()) {
        this.$globalNavList.hide();
      } else {
        this.$globalNavList.show();  
      }
      return this;
    };
    proto.setEvents = function() {
      var that = this;
      this.$btnGlobalNavToggle.on('click', function() {
        if(!that.isAnimate) {
          that.onClickBtnToggle();
          that.isAnimate = false;
        }
      });
      this.$el.on('click', function() {
        if(!that.isAnimate) {
          that.onClickBtnToggle();
          that.isAnimate = false;
        }
      });
      this.$el.children().on('click', function(e) {
        e.stopPropagation();
      });
      return this;
    };
    proto.onClickBtnToggle = function() {
      this.isAnimate = true;
      if(app.fn.isMediaSp()) {
        this.$btnGlobalNavToggle.toggleClass(this.classGlobalNavActive);
        this.$globalNavList.slideToggle();
        this.$el.toggleClass(this.classGlobalNavActiveOuter);
        this.parentViewEl.trigger(this.isGlobalNavOpen ? 'setStyleCloseModal' : 'setStyleOpenModal');
        this.isGlobalNavOpen = this.isGlobalNavOpen ? false : true;
      }
      return this;
    };
    proto.onResize = function() {
      if(!app.fn.isMediaSp()) {
        this.setStyle();
        this.parentViewEl.trigger('setStyleCloseModal');
        this.isGlobalNavOpen = false;
      } else {
        if(!this.isGlobalNavOpen) {
          this.$btnGlobalNavToggle.removeClass(this.classGlobalNavActive);
          this.$el.removeClass(this.classGlobalNavActiveOuter);
          this.$globalNavList.hide();
        }
      }
      return this;
    };
    return constructor;
  })();

  /**
   * フッタ
   */
  app.views.FooterView = (function() {
    var constructor = function() {
      this.$el = {};
      this.$btnPagetop = {};
      return this;
    };
    var proto = constructor.prototype;
    proto.init = function(args) {
      this.setEl(args.el);
      this.setStyle();
      return this;
    };
    proto.setEl = function(el) {
      this.$el = $(el);
      this.$btnPagetop = this.$el.find('.js-btnPagetop');
      return this;
    };
    proto.setStyle = function() {
      if(!app.fn.isMediaSp()) {
        this.$btnPagetop.hide();
      }
      return this;
    };
    proto.onScroll = function(scrollTop) {
      if(!app.fn.isMediaSp()) {
        $(window).outerHeight() < scrollTop ? this.$btnPagetop.fadeIn() : this.$btnPagetop.fadeOut();
      }
      return this;
    };
    proto.onResize = function() {
      if(app.fn.isMediaSp()) {
        this.$btnPagetop.show();
      }
      return this;
    };
    return constructor;
  })();

  /**
   * モーダル
   */
  app.views.ModalView = (function() {
    var constructor = function() {
      this.$el = {};
      this.$inner = {};
      this.$triggerOpenEl = {};
      this.$triggerCloseEl = {};
      this.isOpen = false;
      this.isAnimate = false;
      this.scrollTopOpened = 0;
      return this;
    };
    var proto = constructor.prototype;
    proto.init = function(args) {
      this.setEl(args);
      this.setStyle();
      this.setEvents();
      return this;
    };
    proto.setEl = function(args) {
      this.$el = $(args.el);
      this.$inner = this.$el.find('.modal__inner');
      this.$triggerCloseEl = this.$el.find('.js-modalTriggerClose');
      this.$triggerOpenEl = $(args.triggerOpenEl);
      return this;
    };
    proto.setStyle = function() {
      this.$el.hide();
      return this;
    };
    proto.setEvents = function() {
      var that = this;
      this.$triggerOpenEl.on('click', function() {
        if(!that.isAnimate) {
          that.openModal();
          that.isAnimate = false;
        }
      });
      this.$triggerCloseEl.on('click', function() {
        if(!that.isAnimate) {
          that.closeModal();
          that.isAnimate = false;
        }
      });
      this.$el.on('click', function() {
        if(!that.isAnimate) {
          that.closeModal();
          that.isAnimate = false;
        }
      });
      this.$inner.on('click', function(e) {
        e.stopPropagation();
      });
      return this;
    };
    proto.openModal = function() {
      this.isAnimate = true;
      this.scrollTopOpened = $(window).scrollTop();
      this.$el.fadeIn();
      this.isOpen = true;
      return this;
    };
    proto.closeModal = function() {
      this.isAnimate = true;
      this.$el.fadeOut();
      $(window).scrollTop(this.scrollTopOpened);
      this.isOpen = false;
      return this;
    };
    return constructor;
  })();

})(App, window, document);