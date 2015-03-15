(function ($, window, document, undefined) {
    'use strict';
    var pluginName = "bonno",
        defaults = {
            sliderFx: 'crossfade',		// Slider effect. Can be 'slide', 'fade', 'crossfade'
            sliderInterval: 6000,		// Interval
            speedAnimation: 0,        // Default speed of the animation
            zoom: 13,                   // contact map Zoom
            locations: [51.5134476, -0.1159143],  // Lat-Lng position to center the map on
            teamHeight : 450            // Team extend height
        },
        $win = $(window),
        $doc = $(document),
        $html = $('html'),
        onMobile = false,
        scrT;

    // The plugin constructor
    function Plugin(element, options) {
        var that = this;
        that.element = $(element);
        that.options = $.extend({}, defaults, options);

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            onMobile = true;
            $win.scrollTop(0);
        }

        that.init();

        // onLoad function
        $win.load(function(){

            that.activate();            

            $('#status').fadeOut();
            // $('#preloader').delay(300).fadeOut(200, function() {
            $('#preloader').delay(0).fadeOut(0, function() {    
                that.activate();
                that.sliders();
                that.onesliders();
                that.fNum();
            });
        }).scroll(function(){   // onScroll function
            that.fNum();
        }).resize(function(){  // onResize function
            that.mask.height(that.mask.parent().height());
            that.onesliders();
            if ($win.width() > 800){
                $html.css('overflow', 'auto');
                $('.header').removeClass('opened').css('height','auto');
                $('.slicknav_btn').removeClass('slicknav_open').addClass('slicknav_collapsed');
                $('.slicknav_nav').addClass('slicknav_hidden');
            }
        });

    }

    Plugin.prototype = {
        init: function () {
            this.body = $(document.body);
            this.wrapper = $('.wrapper');
            this.mainmenu = $('.mainmenu');

            this.slider = $('.slider');
            this.oneslider = $('.oneslider');
            this.popupslider = $('.popupslider');
            this.history = $('.history');

            this.heading = $('.heading');
            this.navPortfolio = $('.nav-portfolio');
            this.portfolio = $('.portfolio');
            this.worksContainer = $('.works-container');     
            // console.log(this.worksContainer.length)       
            this.num = $('[data-num]');
            this.map = $('#map');

            this.team = $('.team');
            this.mask = $('.mask');

            this.internal = $('.internal');
            this.loadmore = $('.loadmore');

            this.blogroll = $('.blogroll');
            this.blogpost = this.blogroll.find('.col');

            this.contactForm = $('#send-form');
            this.contactFormName = $('#send-form-name');
            this.contactFormEmail = $('#send-form-email');
            this.contactFormMessage = $('#send-form-message');
            this.emailValidationRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        },
        activate: function () {
            var instance = this;

            // Starting animation
            if( instance.heading.length > 0){
                var sp = instance.options.speedAnimation/1.5;

                $('.header').animate({'opacity': 1}, sp, 'easeInOutQuad');
                instance.heading.find('h1').delay(sp).animate({'opacity': 1}, sp/1.2, 'easeInOutSine');
                if (instance.body.hasClass('page404')){
                    instance.heading.find('hr').delay(sp*2.2).animate({
                       'width': '100%',
                        'left': 0
                    }, sp*1.5, 'easeOutQuart');
                    $('.content, footer').delay(sp*1.5).animate({'opacity': 1}, sp, 'easeInOutQuad');
                } else {
                    instance.heading.find('hr').delay(sp*2.2).animate({
                        'width': '100%',
                        'left': 0
                    }, sp*1.5, 'easeOutQuart');
                    $('.content, footer').delay(sp*2.5).animate({'opacity': 1}, sp, 'easeInOutQuad');
                }
            }

            // instance.mainmenu.find('.dropdown > a').on('click', function(e){ e.preventDefault(); });

            // instance.mainmenu.find('.dropdown > a').on('mouseover', function(){
            //     var self = $(this),
            //         offs = self.offset().left,
            //         dropW = self.next().outerWidth(),
            //         ww = $win.width();

            //     self.next().delay(100).fadeIn(instance.options.speedAnimation/2);

            //     if (ww <= (offs + dropW)){
            //         self.next().addClass('otherwise');
            //     }
            // });

            // instance.mainmenu.on('mouseleave', function(){
            //     setTimeout(function(){
            //         $('.otherwise').removeClass('otherwise').removeAttr('style');
            //     }, 300);
            // });

            instance.internal.on('click', function(e){
                e.preventDefault();
                var $this = $(this),
                    url = $this.attr('href'),
                    urlTop = $(url).offset().top;

                $('body, html').stop(true,true).animate({scrollTop: urlTop }, instance.options.speedAnimation);
            });

            $(document).on('mouseover', '.blogroll .col h4', function(){
                $(this).parents('.col').addClass('hover');
            });
            $(document).on('mouseout', '.blogroll .col h4', function(){
                $(this).parents('.col').removeClass('hover');
            });

            instance.mask.height(instance.mask.parent().height());

            // portfolio items sortable
            if ( instance.blogroll.length === 1){
                var posts = instance.blogroll[0];
                var msnry = new Masonry( posts, {
                    itemSelector: '.col'
                });

                $(document).on('click', '.loadmore a', function(e) {
                    e.preventDefault();
                    instance.blogroll.append('<div class="next-posts">');
                    $('.next-posts').load('posts___.html', function() {
                        var addmsnry = new Masonry( posts, {
                            itemSelector: '.col'
                        });
                        instance.loadmore.find('a').hide();
                        $('.next-posts').animate({'opacity': 1}, instance.options.speedAnimation, 'easeOutSine');
                    });
                });
            }

            // instance.mainmenu.slicknav({
            //     label: '',
            //     prependTo: '.header .span_10_of_12'
            // });

            $(document).on('click', '.slicknav_collapsed', function (e) {
                $html.css('overflow-y','auto');
            });

            $(document).on('click', '.slicknav_open', function(e){
                $html.css('overflow','hidden');
            });

            // Mixup portfolio
            if (instance.worksContainer.length === 1){                

                var hsh = window.location.hash.replace('#','.'),
                    worksNavArr = [],
                    worksIndex,
                    worksEq;

                instance.navPortfolio.find('li').each(function(){
                    worksNavArr.push($(this).children().data('filter'));
                });

                worksIndex = worksNavArr.indexOf(hsh.replace('#','.'));

                if (worksIndex < 0)
                    worksIndex = 0;

                if (hsh == '.all')
                    hsh = 'all';
                // console.log(instance.worksContainer.mixItUp)
                instance.worksContainer.mixItUp({
                    load: {
                        filter: hsh != '' ? hsh : 'all'
                    }
                });

                instance.navPortfolio.find('ins').removeAttr('style');
                instance.navPortfolio.find('a.active ins').animate({
                    'width': '100%',
                    'left': 0
                }, instance.options.speedAnimation, 'easeOutQuart');

                instance.navPortfolio.find('a').on('click', function(e){
                    var self = $(this),
                        npLine = self.find('ins');

                    instance.navPortfolio.find('ins').removeAttr('style');
                    npLine.animate({
                        'width': '100%',
                        'left': 0
                    }, instance.options.speedAnimation, 'easeOutQuart');
                });

            }

            // Google Map
            if(instance.map.length == 1){
                var x = instance.options.locations[0],
                    y = instance.options.locations[1],
                    myLatlng = new google.maps.LatLng(x,y);

                var mapOptions = {
                    zoom: instance.options.zoom,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: new google.maps.LatLng(x, y)
                };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map
                });
            }

            // Contact map
            instance.contactFormName.focusout(function(){
                if ($(this).val() == '')
                    $(this).addClass('invalid');
            }).focusin(function(){
                $(this).removeClass('invalid');
            });

            instance.contactFormMessage.focusout(function(){
                if ($(this).val() == '')
                    $(this).addClass('invalid');
            }).focusin(function(){
                $(this).removeClass('invalid');
            });

            instance.contactFormEmail.focusout(function(){
                if (($(this).val() == '') || (!instance.emailValidationRegex.test($(this).val()))) {
                    $(this).addClass('invalid');
                }
            }).focusin(function(){
                $(this).removeClass('invalid');
            });

            instance.contactForm.on('submit', function(){
                var isHaveErrors = false;

                if (instance.contactFormName.val() === '') {
                    isHaveErrors = true;
                    instance.contactFormName.addClass('invalid');
                }

                if (instance.contactFormMessage.val() === '') {
                    isHaveErrors = true;
                    instance.contactFormMessage.addClass('invalid');
                }

                if ((instance.contactFormEmail.val() === '')
                    || (!instance.emailValidationRegex.test(instance.contactFormEmail.val()))) {
                    isHaveErrors = true;
                    instance.contactFormEmail.addClass('invalid');
                }

                if (!isHaveErrors) {
                    $.ajax({
                        type: 'POST',
                        url: '/php/email.php',
                        data: {
                            name: instance.contactFormName.val(),
                            email: instance.contactFormEmail.val(),
                            message: instance.contactFormMessage.val()
                        },
                        dataType: 'json'
                    })
                        .done(function(answer){
                            if ((typeof answer.status != 'undefined') && (answer.status == 'ok')) {
                                $('.succs-msg').fadeIn().css("display","inline-block");
                                instance.contactFormName.val('');
                                instance.contactFormEmail.val('');
                                instance.contactFormMessage.val('');
                            } else {
                                alert('Message was not sent. Server-side error!');
                            }
                        })
                        .fail(function(){
                            alert('Message was not sent. Client error or Internet connection problems.');
                        });
                }

                return false;
            });

            // TEAM
            if (instance.team.length > 0){
                var speed = instance.options.speedAnimation/1.5,
                    itemH = instance.team.find('.profile').height();

                instance.team.find('.img').on('click', function(e){
                    e.preventDefault();

                    var $this = $(this),
                        $expand = $this.parent().find('.expandteam'),
                        leftPos = $this.offset().left,
                        topPos = +$this.parent().offset().top,
                        wid = $this.outerWidth(),
                        hei = $this.outerHeight(),
                        expndHei = $expand.height(),
                        corner = $expand.find('.corner'),
                        actPos;

                    $('.corner').css({'display': 'none'});
                    corner.css({'left': leftPos + wid/2, 'display': 'block'});

                    instance.team.find('.active').addClass('before');
                    instance.team.find('.expandteam').removeClass('active');
                    $expand.addClass('active');


                    if (instance.team.find('.before').length > 0){
                        actPos = +instance.team.find('.before').parent().offset().top;
                    }

                    instance.team.find('.expandteam').removeClass('before');
                    if ( topPos != actPos){
                        closeExpand();

                        $this.parent().stop(true,true).animate({'height': (instance.options.teamHeight+327)}, speed, 'easeInQuad');
                        $expand.css('overflow', 'visible').stop(true,true).animate({'height': instance.options.teamHeight}, speed, 'easeInQuad');
                        $expand.find('.inner').stop(true,true).animate({'height': instance.options.teamHeight}, speed, 'easeInQuad');
                    } else {
                        $this.parent().css({'height': (instance.options.teamHeight+327)});
                        $expand.css('overflow', 'visible').css({'height': instance.options.teamHeight});
                        $expand.find('.inner').css({'height': instance.options.teamHeight});
                        setTimeout(closeExpand, 1);
                    }

                });

                var closeExpand = function(){
                    $('.expandteam').not(".active").css('overflow', 'hidden').stop(true,true).animate({'height': 0, 'overflow': 'hidden'}, speed, 'easeInQuad');
                    $('.expandteam').not(".active").find('.inner').stop(true,true).animate({'height': 0}, speed, 'easeInQuad');
                    $('.expandteam').not(".active").parents('.col').stop(true,true).animate({'height': itemH}, speed, 'easeInQuad');
                };

                $win.resize( function(){
                    $('.expandteam').removeClass('active');
                    closeExpand();
                });

                $('.expandteam .close').on('click', function(e){
                    e.preventDefault();
                    $(this).parents('.expandteam').removeClass('active');
                    closeExpand();

                });
            }

            // Popup Gallery
            if (instance.popupslider.length > 0) {
                instance.popupslider.find('> ul').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: '',
                    mainClass: 'popup-gallery',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1]
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title');
                        }
                    }
                });
            }

        },
        sliders: function(){
            var instance = this;

            if (instance.slider.length > 0){
                instance.slider.each(function(e){
                    var $this = $(this),
                        slidewrap = $this.find('ul'),
                        sliderFx = slidewrap.data('fx'),
                        sliderAuto = slidewrap.data('auto'),
                        maxItems = ($this.hasClass('popupslider') || $this.hasClass('history')) ? 3 : 4,
                        scrollItems = ($this.hasClass('history')) ? 1 : 'auto',
                        sliderCircular = slidewrap.data('circular');

                    $this.attr('id', 'slider-'+e);

                    slidewrap.carouFredSel({
                        infinite: (typeof sliderCircular) ? sliderCircular : true,
                        circular: (typeof sliderCircular) ? sliderCircular : true,
                        width: '100%',
                        auto : sliderAuto ? sliderAuto : false,
                        scroll : {
                            fx : sliderFx ? sliderFx : 'crossfade',
                            duration : instance.options.speedAnimation,
                            timeoutDuration : instance.options.sliderInterval,
                            items: scrollItems
                        },

                        swipe : {
                            onTouch : true,
                            onMouse : false
                        },
                        prev : $('#slider-'+e).find('.prev'),
                        next : $('#slider-'+e).find('.next'),
                        pagination : $('#slider-'+e).find('.pagination')
                    }).parent().css('margin', 'auto');
                });
            }
        },
        onesliders: function(){
            var instance = this;

            if (instance.oneslider.length > 0){
                instance.oneslider.each(function(e){
                    var $this = $(this),
                        slidewrap = $this.find('ul'),
                        sliderFx = slidewrap.data('fx'),
                        sliderAuto = slidewrap.data('auto');

                    $this.attr('id', 'oneslider-'+e);

                    slidewrap.carouFredSel({
                        responsive: true,
                        auto : sliderAuto ? sliderAuto : false,
                        scroll : {
                            fx : sliderFx ? sliderFx : 'crossfade',
                            duration : instance.options.speedAnimation,
                            timeoutDuration : instance.options.sliderInterval
                        },
                        items : {
                            visible : 1,
                            height: 'auto',
                            width: 870
                        },
                        swipe : {
                            onTouch : true,
                            onMouse : false
                        },
                        prev : $('#oneslider-'+e).find('.prev'),
                        next : $('#oneslider-'+e).find('.next'),
                        pagination: {
                            container: $('#oneslider-'+e).find('.pagination'),
                            anchorBuilder: function() {
                                if ($(this).parents(instance.oneslider.hasClass('pricing'))) {
                                    var per = $(this).data('period');
                                    return '<a href="#"><span>'+ per +'</span></a>';
                                }
                            }
                        }
                    }).parent().css('margin', 'auto');
                });
            }
        },
        fNum: function(){
            var instance = this,
                numbS;

            if (instance.num.length > 0){

                instance.num.parents('.section').each(function(){
                    var self = $(this),
                        winTop = $win.scrollTop(),
                        topPos = self.offset().top - $win.height(),
                        blHeight = self.height() - 100,
                        sectionTop = self.offset().top;

                    if (!self.hasClass('target')) {
                        self.find(instance.num).each(function(){
                            var $this = $(this),
                                numb = $this.data('num'),
                                incr = $this.data('increment'),
                                fractional = $this.data('fractional') ? $this.data('fractional') : 0,
                                i = 0,
                                timer;

                            if ( (winTop >= topPos && winTop <= (topPos + blHeight)) && !onMobile || (winTop === sectionTop)){
                                timer = setTimeout(function run() {
                                    if ( i < numb) i+=incr;
                                    else {
                                        i = numb;
                                        $this.text(i.toFixed(fractional).replace('.',',').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                                        return i;
                                    }
                                    $this.text(i.toFixed(fractional).replace('.',',').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

                                    timer = setTimeout(run, 20);
                                }, 20);

                                $this.parents('.section').addClass('target');
                            }
                            else {
                                numbS = numb.toString().replace('.',',');
                                $this.text(numbS.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                            }
                        });
                    }
                });

            }
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);

(function ($) {
    $(document.body).bonno();
})(jQuery);