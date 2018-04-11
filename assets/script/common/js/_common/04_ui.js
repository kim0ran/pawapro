(function(app, window, decument, undefined) {

  app.ui = {

    /**
     * アコーディオン
     */
    accordion: (function() {
      var constructor = function() {
        this.$el = {};
        this.$head = {};
        this.$main = {};
        this.classActive = 'active';
        this.isAnimate = false;
        this.isOpen = false;
        this.isSpOnly = false;
        return this;
      };
      var proto = constructor.prototype;
      proto.init = function(args) {
        this.isOpen = (args.isOpen !== undefined) ? args.isOpen : this.isOpen;
        this.isSpOnly = (args.isSpOnly !== undefined) ? args.isSpOnly : this.isSpOnly;
        this.setEl(args.el);
        this.setStyle();
        this.setEvents();
        return this;
      };
      proto.setEl = function(el) {
        this.$el = $(el);
        this.$head = this.$el.find('.js-accordHead');
        this.$main = this.$el.find('.js-accordMain');
        return this;
      };
      proto.setStyle = function() {
        if(this.isSpOnly && !app.fn.isMediaSp()) {
          return this;
        } else {
          if(!this.isOpen) {
            this.$main.hide();
          } else {
            this.$head.addClass(this.classActive);
          }
        }
        return this;
      };
      proto.setEvents = function() {
        var that = this;
        this.$head.on('click', function() {
          if(!that.isAnimate) {
            that.animateToggle();
            that.isAnimate = false;
          }
        });
        $(window).on('resize', function() {
          that.onResize();
        });
        return this;
      };
      proto.animateToggle = function() {
        this.isAnimate = true;
        if(this.isSpOnly && !app.fn.isMediaSp()) {
          return this;
        } else {
          this.$main.slideToggle();
          this.$head.toggleClass(this.classActive);
          this.isOpen = this.isOpen ? false : true;
        }
        return this;
      };
      proto.onResize = function() {
        if(this.isSpOnly && !app.fn.isMediaSp()) {
          this.$main.show();
          this.$head.removeClass(this.classActive);
          this.isOpen = false;
        } else {
          if(this.isOpen) {
            this.$main.show();
            this.$head.addClass(this.classActive);
            this.isOpen = true;
          } else {
            this.$main.hide();
            this.$head.removeClass(this.classActive);
            this.isOpen = false;
          }
        }
        return this;
      };
      return constructor;
    })(),

    /**
     * サムネイルスライダー
     */
    thumbSlider: (function() {
      var constructor = function() {
        this.$el = {};
        this.$list = {};
        this.$item = {};
        this.$btnPrev = {};
        this.$btnNext = {};
        this.slideWidth = 0;
        this.showLength = 0;
        this.slideLength = 1;
        this.activeItemleftNum = 0;
        this.isAnimate = false;
        return this;
      };
      var proto = constructor.prototype;
      proto.init = function(args) {
        this.setEl(args.el);
        this.setStyle();
        this.setButton();
        this.setEvents();
        return this;
      };
      proto.setEl = function(el) {
        this.$el = $(el);
        this.$listOuter = this.$el.find('.js-sliderOuter');
        this.$list = this.$listOuter.find('.js-sliderList');
        this.$item = this.$list.children();
        this.$btnPrev = this.$el.find('.js-sliderBtnPrev');
        this.$btnNext = this.$el.find('.js-sliderBtnNext');
        return this;
      };
      proto.setStyle = function() {
        this.slideWidth = this.$item.outerWidth(true);
        this.showLength = Math.floor(this.$listOuter.outerWidth()/this.$item.outerWidth(true));
        this.slideLength = this.showLength;
        this.$listOuter.css({
          position: 'relative',
          width: this.$listOuter.outerWidth(),
          height: this.$item.outerHeight(true)
        });
        this.$list.css({
          position: 'absolute',
          top: 0,
          left: this.activeItemleftNum,
          width: this.slideWidth*this.slideWidth*this.$item.length
        });
        return this;
      };
      proto.resetStyle = function() {
        this.$listOuter.css({
          position: 'relative',
          width: 'auto',
          height: 'auto'
        });
        return this;
      };
      proto.setButton = function() {
        this.activeItemleftNum === 0 ? this.$btnPrev.hide() : this.$btnPrev.show();
        this.activeItemleftNum >= (this.$item.length-1) - (this.slideLength-1) ? this.$btnNext.hide() : this.$btnNext.show();
        return this;
      };
      proto.setEvents = function() {
        var that = this;
        this.$btnPrev.on('click', function() {
          if(!that.isAnimate) {
            that.activeItemleftNum = that.activeItemleftNum - that.slideLength;
            that.animateSlide();
            that.isAnimate = false;
          }
        });
        this.$btnNext.on('click', function() {
          if(!that.isAnimate) {
            that.activeItemleftNum = that.activeItemleftNum + that.slideLength;
            that.animateSlide();
            that.isAnimate = false;
          }
        });
        $(window).on('resize', function() {
          that.onResize();
        });
        return this;
      };
      proto.animateSlide = function() {
        this.isAnimate = true;
        this.$list.animate({
          left: -(this.slideWidth*this.activeItemleftNum)
        }, 500);
        this.setButton();
        return this;
      };
      proto.onResize = function() {
        this.resetStyle();
        this.setStyle();
        this.setButton();
        return this;
      };
      return constructor;
    })()

  };

})(App, window, document);