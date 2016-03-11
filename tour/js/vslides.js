(function ($) {

    $.fn.vslides = function (_options) {

        var options = _options || {};

        this._currentSet = options.startSet || 0;
        this._currentSlide = options.startSlide || 0;
        this._sets = options.sets;
        this._showDelay = options.showDelay || 2000;
        this._navTransitionDelay = options.navTransitionDelay || 0;
        this._hotspotClass = options.hotspotClass;
        this._navTransitionDelays = options.navTransitionDelays || [];
        this._didShowCallback = options.didShowCallback || function () {
            };
        this._willShowCallback = options.willShowCallback || function () {
            };

        this.start = function () {
            this.show(0);
        };

        this.next = function () {
            this._currentSlide++;

            if (this._currentSlide >= this._sets[this._currentSet].slides.length) {

                this.hide();

                if (this._currentSet + 1 < this._sets.length) {

                    var delay = typeof this._navTransitionDelays[this._currentSet] === 'number' ? this._navTransitionDelays[this._currentSet] : this._navTransitionDelay;

                    setTimeout(function () {

                        this.show(this._currentSet + 1, 0);

                    }.bind(this), delay);
                }

            } else {

                this._showSlide(this._currentSlide);
            }

        };

        this.previous = function () {
            this._currentSlide--;

            if (this._currentSlide < 0) {
                this.hide();

                var delay = typeof this._navTransitionDelays[this._currentSet - 1] === 'number' ? this._navTransitionDelays[this._currentSet - 1] : this._navTransitionDelay;

                setTimeout(function () {

                    this.show(this._currentSet - 1, this._sets[this._currentSet - 1].slides.length - 1);

                }.bind(this), delay);

            } else {

                this._showSlide(this._currentSlide);
            }

        };


        this.show = function (setIndex, slideIndex, overriddenDelay) {

            this._currentSet = setIndex || 0;
            this._currentSlide = slideIndex || 0;


            var classname = "vslides-highlighted";
            var element = this._sets[this._currentSet].element,
                delay = element ? this._showDelay : 100;

            delay = overriddenDelay || delay;

            if (element) {

                //farther distance means more delay
                var top = $(element).offset().top - $(window).height() / 2 + $(element).outerHeight() / 2,
                    distance = Math.abs(top - $(window).scrollTop()),
                    height = $(window).height(),
                    multiplier = Math.max(1, distance / height);

                delay *= multiplier;

                $('html, body').animate({
                    scrollTop: top
                }, delay);

                delay *= 2;

            }

            var $underlay = this._getUnderlay();
            this._buildPager();
            this._addShowingBodyClasses();


            setTimeout(function () {

                $underlay.fadeIn();
                this._showDialogue();

            }.bind(this), delay * 2);

            setTimeout(function () {

                $('.' + classname).removeClass(classname);
                $(element).addClass(classname);

            }.bind(this), delay);

        };

        this._addShowingBodyClasses = function () {
            this._removeShowingBodyClasses();
            $('body').addClass('vslides-showing');
            var className = 'vslides-' + this._currentSet + '-' + this._currentSlide;
            var className2 = 'vslides-' + this._currentSet;
            $('body').addClass(className).addClass(className2);
        };

        this._removeShowingBodyClasses = function () {
            $('body').removeClass('vslides-showing');
            for (var theSet = 0; theSet < this._sets.length; theSet++) {

                var className = 'vslides-' + theSet;
                $('body').removeClass(className);

                for (var theSlide = 0; theSlide < this._sets[theSet].slides.length; theSlide++) {

                    var className = 'vslides-' + theSet + '-' + theSlide;
                    $('body').removeClass(className);

                }
            }
        };

        this._showSlide = function (index) {

            this._willShowCallback(this);

            this._currentSlide = index;

            var $dialogue = this._getDialog();
            $($dialogue.find('.vslides-slide').hide().get(index)).fadeIn();
            $dialogue.find('.vslides-nav').hide()
            if (this._currentSet > 0 || index > 0) {
                $dialogue.find('.vslides-previous').show();
            }

            $dialogue.find('.vslides-next').show();

            var $dots = this.$_pager.find('.vslides-pager-dot');
            $dots.removeClass('vslides-pager-dot-selected');
            $($dots[this._currentSlide]).addClass('vslides-pager-dot-selected');


            this._didShowCallback(this);


            this.centerDialog();

        };

        this.centerDialog = function () {

            var $dialog = this._getDialog(),
                top = ($(window).height() / 2 - $dialog.outerHeight() / 2) + $(window).scrollTop(),
                left = $(window).width() / 2 - $dialog.outerWidth() / 2;

            $dialog.css({top: top, left: left});

        };

        this._placeholderImages = function () {

            var $dialogue = this._getDialog();

            $dialogue.find('img[width]').each(function () {

                var p = $(this).parent().show();

                var originalWidth = $(this).attr('width'),
                    originalHeight = $(this).attr('height'),
                    $parent = $(this).parent(),
                    newWidth = Math.min(originalWidth, $parent.width()),
                    newHeight = newWidth / originalWidth * originalHeight,
                    height = 0,
                    done = function () {
                        $(this).removeClass('vslides-loading');
                        $(this).attr('width', '').attr('height', '');
                    }.bind(this);

                if (this.complete) {
                    done();
                } else {
                    $(this).attr('width', newWidth).attr('height', newHeight);
                    $(this).addClass('vslides-loading');
                    $(this).on('load', done);
                }


            });


        };

        this._showDialogue = function () {

            var $dialogue = this._getDialog();
            var totalSlides = this._sets[this._currentSet].slides.length;
            var done = function (html) {

                $dialogue.find('.vslides-body').html(html);

                $dialogue.fadeIn();

                setTimeout(function () {
                    this._placeholderImages();
                    this._showSlide(this._currentSlide);
                    this.centerDialog();
                }.bind(this), 20);


            }.bind(this);

            var slidesHtmls = [],
                found = 0;

            for (var c = 0; c < totalSlides; c++) {

                var slide = this._sets[this._currentSet].slides[c];

                var cb = function (c) {

                    return function (html, slide) {

                        html = "<div class='vslides-slide'>" + html + "</div>";
                        slidesHtmls[c] = html;
                        found++;

                        if (found == totalSlides) {
                            done(slidesHtmls.join(''));
                        }

                    }

                };

                $.get(slide, cb(c, slide));

            }

        };

        this.hide = function () {
            this.$_dialogue.fadeOut();
            var $underlay = this._getUnderlay();
            $underlay.fadeOut();
            var classname = "vslides-highlighted";
            this._removeShowingBodyClasses();
            $('.' + classname).removeClass(classname);


        };


        this._getDialog = function () {

            if (!this.$_dialogue) {
                this.$_dialogue = $('<div id="vslides-dialogue" style-disable="opacity:0;">' +
                    '<div class="vslides-header">' +
                    '<a class="vslides-close-button">X</a></div>' +
                    '<div class="vslides-body"></div>' +
                    '<a class="vslides-nav vslides-previous">Back</a>' +
                    '<a class="vslides-nav vslides-next">Next</a>' +

                    '<div class="vslides-footer"></div>' +
                    '</div>');
                this.$_dialogue.appendTo("body");
                this.$_dialogue.find('.vslides-close-button').click(this.hide.bind(this));
                this.$_dialogue.find('.vslides-next').click(this.next.bind(this));
                this.$_dialogue.find('.vslides-previous').click(this.previous.bind(this));

            }
            return this.$_dialogue;
        };


        this._didClickElement = function (setIndex) {

            this.hide();
            this.show(setIndex, 0, 100);

        };

        this._getUnderlay = function () {
            if (!this.$_underlay) {
                this.$_underlay = $('<div id="vslides-underlay" style="display:none;"></div>').appendTo('body');
                this.$_underlay.click(function (e) {
                    if (e.target == this.$_underlay[0]) {
                        this.hide();
                    }
                }.bind(this));
            }
            return this.$_underlay;
        };

        this._buildPager = function () {

            if (this.$_pager) {
                this.$_pager.remove();
            }

            var $pager = $('<div class="vslides-pager"></div>');

            for (var i = 0; i < this._sets[this._currentSet].slides.length; i++) {


                var $dot = $('<div class="vslides-pager-dot"></div>').appendTo($pager);


                $dot.click(function (page) {

                    return function () {
                        this._showSlide(page);
                    }.bind(this)

                }.bind(this)(i))
            }


            this.$_pager = $pager.appendTo(this._getDialog().find('.vslides-footer'));

        };

        this._attachListeners = function () {

            for (var i = 0; i < this._sets.length; i++) {

                var set = this._sets[i];

                $(set.element).addClass('vslides-hotspot');

                if (this._hotspotClass) {
                    $(set.element).addClass(this._hotspotClass);
                }

                $(set.element).click(function (setIndex) {

                    return function () {
                        this._didClickElement(setIndex);
                        return false;
                    }.bind(this);

                }.bind(this)(i));
            }
        };

        this._init = function () {
            this._attachListeners();
        };


        this._init();
        return this;

    };

})(jQuery);

