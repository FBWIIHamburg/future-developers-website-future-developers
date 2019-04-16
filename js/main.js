(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	})

	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);

// style of gallery 
! function ($) {
	var defaults = {
		sectionContainer: "> section",
		angle: 50,
		opacity: true,
		scale: true,
		outAnimation: true,
		pageContainer: '.page_container',
		pageOpacity: true
	};
	$.fn.tiltedpage_scroll = function (options) {
		var settings = $.extend({}, defaults, options),
			el = $(this);
		el.find(settings.sectionContainer).addClass("tps-section");
		el.find('.tps-section').each(function () {
			var el2 = $(this);
			el2.wrapInner("<div class='tps-wrapper'></div>");
		});

		function isElementInViewport(el3) {
			var docViewTop = $(window).scrollTop(),
				docViewBottom = docViewTop + $(window).height(),
				elemTop = el3.offset().top,
				elemBottom = elemTop + el3.outerHeight(true);
			return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
		}

		function elementVisibilityMayChange(el4) {
			if (isElementInViewport(el4)) {
				el4.addClass("tps-inview")
			} else {
				el4.removeClass("tps-inview")
			}
		}
		$(window).on('DOMContentLoaded load resize scroll', function () {
			el.find(settings.sectionContainer).each(function () {
				elementVisibilityMayChange($(this));
			});
			el.find('.tps-section.tps-inview > .tps-wrapper').each(function (index) {
				var el2 = $(this),
					elc = el2.find(settings.pageContainer),
					opacity = 0,
					opacity2 = 0,
					st = $(window).scrollTop(),
					deg = ((el2.parent().offset().top - el2.parent().height()) - st) / $(window).height() * (settings.angle * 3),
					scale = ((st + $(window).height() - (el2.parent().offset().top - el2.parent().height())) / ($(window).height()));
				if (scale > 1) scale = 1;
				if (deg < 0) deg = 0;
				if (st > el2.parent().offset().top) {
					if (settings.outAnimation == false) {
						opacity = 1;
						opacity2 = 1;
						if (opacity < 0) {
							opacity = 0;
							opacity2 = 0;
						}
						if (deg < 0) deg = 0;
					} else {
						opacity = ((el2.parent().offset().top + ($(window).height() * 1.2) - st)) / ($(window).height());
						opacity2 = opacity;
						opacity = Math.pow(opacity, 25);
						opacity2 = Math.pow(opacity2, 25);
						//console.log('- '+opacity2);
						deg = (el2.parent().offset().top - st) / $(window).height() * (settings.angle * 3);
						scale = ((st + $(window).height() - el2.parent().offset().top) / ($(window).height()));
					}
				} else {
					if (index != 0) {
						opacity = ((st + $(window).height() - el2.parent().offset().top + (el2.height() / 2)) / $(window).height());
						opacity2 = opacity / 2;
						opacity2 = opacity2 < 0.4 ? opacity2 / 2 : opacity2;
						//console.log(opacity2);
						if (opacity > 1) {
							opacity = 1;
							opacity2 = 1;
						}
					} else {
						opacity = 1;
						opacity2 = 1;
						deg = 0;
						scale = 1;
					}
				}
				if (settings.scale == false) scale = 1;
				if (settings.angle == false) deg = 0;
				if (settings.opacity == false) {
					opacity = 1;
					opacity2 = 1;
				}
				el2.css({
					'transform': 'rotateX(' + deg + 'deg) scale(' + scale + ', ' + scale + ')',
					opacity: opacity
				});
				elc.css({
					opacity: opacity2
				});
			});
		});
	}
}(window.jQuery);

$(document).ready(function () {
	$(".main").tiltedpage_scroll({
		angle: 20
	});
});
// end of gaery  