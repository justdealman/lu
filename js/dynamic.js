$(function() {
	if ( $('.introduction .slider').length > 0 ) {
		$('.introduction .slider').slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 10000,
			pause: 2500,
			animationComplete: function(e) {
				$('.introduction .nav li').eq($('.introduction .slider .pagination li.current').index()).addClass('active').siblings().removeClass();
			}
		});
		$('.introduction .slider').bind('swipeleft', function() {
			$('.introduction .slider .next').trigger('click');
		});
		$('.introduction .slider').bind('swiperight', function() {
			$('.introduction .slider .prev').trigger('click');
		});
		$('.introduction .slider .bg').each(function() {
			$(this).parent().css({
				'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
				'background-size': 'cover'
			});
		});
		$('.introduction .nav li').eq(0).addClass('active');
		$('.introduction .nav li').bind('click', function(e) {
			e.preventDefault();
			$('.introduction .slider .pagination li').eq($(this).index()).find('a').trigger('click');
			setTimeout(function() {
				$(this).addClass('active').siblings().removeClass();
			}, 500);
		});
	}
	$('.minus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('.plus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('.rc .tabs-nav li a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('ul').siblings('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	if ( $('.lc .browsing ul li').length > 1 ) {
		$('.lc .browsing ul').jcarousel({
			scroll: 1,
			animation: 500,
			easing: 'easeInOutQuad',
			wrap: 'circular'
		});
		$('.lc .browsing .jcarousel-container').bind('swipeleft', function() {
			$('.lc .browsing .jcarousel-container .jcarousel-next').trigger('click');
		});
		$('.lc .browsing .jcarousel-container').bind('swiperight', function() {
			$('.lc .browsing .jcarousel-container .jcarousel-prev').trigger('click');
		});
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	if ( $('input[type="radio"]').length > 0 ) {
		$('input[type="radio"]').uniform();
	}
	$('.benefits-b > div > div > ul > li a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('ul').siblings('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	$('.panel .lk-open').bind('click', function(e) {
		e.preventDefault();
		$(this).siblings('.lk-drop').stop().slideToggle(200);
	});
	$('html').click(function() {
		$('.panel .lk-drop').stop().slideUp(200);
	});
	$('.panel .lk-open, .panel .lk-drop, .modal, .fade').click(function(event) {
		event.stopPropagation();
	});
	if ( $('.catalog-i .lc .nav > li > div').length > 0 ) {
		$('.catalog-i .lc .nav > li > div').each(function() {
			$(this).append('<span class="arrow"></span>');
		});
		$('.catalog-i .lc .nav > li > div').parent().hover(
			function() {
				$(this).children('div').stop().delay(0).fadeIn(0);
				$(this).find('.arrow').css({
					'top': $(this).position().top+'px'
				});
				$(this).find('ul').css({
					'min-height': $(this).parent().outerHeight()+25+'px'
				});
			},
			function() {
				$(this).children('div').stop().delay(0).fadeOut(0);
			}
		)
	}
	if ( $('.menu > nav > ul > li > div').length > 0 ) {
		$('.menu > nav > ul > li > div').each(function() {
			$(this).parent().addClass('sub');
		});
		$('.menu > nav > ul > li.sub').hover(
			function() {
				$(this).children('div').stop().delay(0).fadeIn(0);
			},
			function() {
				$(this).children('div').stop().delay(0).fadeOut(0);
			}
		)
	}
	$('.form input, .form textarea').each(function() {
		$(this).focusin(function() {
			$(this).parent().addClass('focus');
		});
		$(this).focusout(function() {
			if ( $(this).val().length > 0 ) {
				$(this).parent().addClass('complete').removeClass('focus');
			}
			else {
				$(this).parent().removeClass('focus complete');
			}
		});
	});
	$('.form p span').bind('click', function(e) {
		$(this).parent().find('input, textarea').focus();
		event.preventDefault();
	});
	$('.modal').append('<span class="close"></span>');
	$('[data-open]').bind('click', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-t.outerWidth())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	});
	$('.fade, .modal .close').bind('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(400);
	});
	$(window).bind('scroll', function() {
		if ( $(document).scrollTop() > $('header').offset().top+$('header').outerHeight() ) {
			$('.menu').addClass('fixed');
			$('header').css({
				'margin-bottom': $('.menu').outerHeight()+'px'
			});
		} else {
			$('.menu').removeClass('fixed');
			$('header').css({
				'margin-bottom': '0'
			});
		}
		if ( $(document).scrollTop() > $('header').offset().top+$('header').outerHeight() )  {
			$('.go-top').show();
		} else {
			$('.go-top').hide();
		}
	});
	$('.go-top').bind('click', function(e) {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
	});
	function goTopPos() {
		if ( $(window).width() < 1000+($('.go-top').width()*2) ) {
			$('.go-top').addClass('mini');
		} else {
			$('.go-top').removeClass('mini');
		}
	}
	goTopPos();
	$(window).resize(function() {
		goTopPos();
	});
	$('.filter-t ul li span').bind('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('reverse');
	});
	if ( $('.context-b').length > 0 ) {
		$('.context-b ul').each(function() {
			if ( $(this).children('li').length > 0 ) {
				$(this).jcarousel({
					scroll: 1,
					animation: 500,
					easing: 'easeInOutQuad',
					wrap: 'circular'
				});
			}
		});
		$('.context-b .jcarousel-container').each(function() {
			$(this).bind('swipeleft', function() {
				$(this).find('.jcarousel-next').trigger('click');
			});
			$(this).bind('swiperight', function() {
				$(this).find('.jcarousel-prev').trigger('click');
			});
		});
	}
	if ( $('.order-total h5.discount').length > 0 ) {
		$(function() {
			var max = 0;
			$('.order-total h5 strong').each(function() {
				var w = $(this).width(); 
				max = w > max ? w : max;
			});
			$('.order-total h5 strong').width(max);
		});
	}
	$('.product-b .desc h6 span').bind('click', function(e) {
		e.preventDefault();
		if ( $(this).text() == 'Больше информации' ) {
			$(this).parent().siblings('.more').stop().slideDown(200);
			$(this).text('Скрыть');
		} else {
			$(this).parent().siblings('.more').stop().slideUp(200);
			$(this).text('Больше информации');
		}
	});
	if ( $('.product-b .card .gallery').length > 0 ) {
		$('.product-b .card .gallery > div').slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 10000,
			pause: 2500
		});
		$('.product-b .card .gallery > div .pagination li a').each(function() {
			$(this).append('<img src="'+$('.product-b .card .gallery .container > div > div').eq($(this).parent().index()).attr('data-preview')+'" alt="">');
		});
		$('.product-b .card .gallery > div').bind('swipeleft', function() {
			$('.product-b .card .gallery > div .next').trigger('click');
		});
		$('.product-b .card .gallery > div').bind('swiperight', function() {
			$('.product-b .card .gallery > div .prev').trigger('click');
		});
	}
	if ( $('a.zoom').length > 0 ) {
		$('a.zoom').fancybox({
			padding: 0,
			helpers: {
				overlay: {
					locked: false
				}
			}
		});
	}
});