$(function() {
	'use strict';

	var window_width = $(window).width(),
		window_height = window.innerHeight,
		header_height = $('.default-header').height(),
		header_height_static = $('.site-header.static').outerHeight(),
		fitscreen = window_height - header_height;

	$('.fullscreen').css('height', window_height);
	$('.fitscreen').css('height', fitscreen);

	//------- Скрол js --------//

	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.default-header').addClass('header-scrolled');
		} else {
			$('.default-header').removeClass('header-scrolled');
		}
	});

	if ($('select')) {
		$('select').niceSelect();
	}

	$('.img-pop-up').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	// Анимка поиска
	$('#search-input-box').hide();
	$('#search').on('click', function() {
		$('#search-input-box').slideToggle();
		$('#search-input').focus();
	});
	$('#close-search').on('click', function() {
		$('#search-input-box').slideUp(500);
	});


	//  Карус Js

	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	$('.play-btn').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	$('.popuar-course-carusel').owlCarousel({
		items: 4,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		stagePadding: 60,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ],
		responsive: {
			0: {
				items: 1,
				stagePadding: 0
			},
			575: {
				items: 2,
				stagePadding: 0
			},
			768: {
				items: 2,
				stagePadding: 0
			},
			992: {
				items: 3,
				stagePadding: 0
			},
			1200: {
				items: 3,
				stagePadding: 60
			},
			1440: {
				items: 4,
				stagePadding: 60
			}
		}
	});

	$('.video-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ]
	});

	$('.testi-slider').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ]
	});

	// Выбрать все ссылки с хешами
	$('.navbar-nav a[href*="#"]')
		// Удалить ссылки, которые на самом деле ни на что не ссылаются
		.not('[href="#"]')
		.not('[href="#0"]')
		.on('click', function(event) {

			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
				location.hostname == this.hostname
			) {
				// Определить элемент для прокрутки
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Можно ли?
				if (target.length) {
					// Предотвратить только изначальное, если анимация действительно произойдет
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: target.offset().top - 50
						},
						1000,
						function() {
// обратный вызов после анимации
// Должен изменить фокус!
// v2 Должен работать
							var $target = $(target);
							$target.focus();
							if ($target.is(':focus')) {
								// Проверка
								return false;
							} else {
								$target.attr('tabindex', '-1'); 
								$target.focus(); 
							}
						}
					);
				}
			}
		});

	// Google Map 
	if (document.getElementById('map')) {
		google.maps.event.addDomListener(window, 'load', init);

		function init() {

			var mapOptions = {
				// Насколько вы хотите увеличить масштаб карты.ОБЕЗАТЕЛЬНО!
				zoom: 11,

				// Широта и долгота, чтобы центрировать карту 
				center: new google.maps.LatLng(89.67, -73.94), // 

				
				styles: [
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [ { color: '#e9e9e9' }, { lightness: 17 } ]
					},
					{
						featureType: 'landscape',
						elementType: 'geometry',
						stylers: [ { color: '#f5f5f5' }, { lightness: 20 } ]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.fill',
						stylers: [ { color: '#ffffff' }, { lightness: 17 } ]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 } ]
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry',
						stylers: [ { color: '#ffffff' }, { lightness: 18 } ]
					},
					{
						featureType: 'road.local',
						elementType: 'geometry',
						stylers: [ { color: '#ffffff' }, { lightness: 16 } ]
					},
					{
						featureType: 'poi',
						elementType: 'geometry',
						stylers: [ { color: '#f5f5f5' }, { lightness: 21 } ]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [ { color: '#dedede' }, { lightness: 21 } ]
					},
					{
						elementType: 'labels.text.stroke',
						stylers: [ { visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 } ]
					},
					{
						elementType: 'labels.text.fill',
						stylers: [ { saturation: 36 }, { color: '#333333' }, { lightness: 40 } ]
					},
					{ elementType: 'labels.icon', stylers: [ { visibility: 'off' } ] },
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [ { color: '#f2f2f2' }, { lightness: 19 } ]
					},
					{
						featureType: 'administrative',
						elementType: 'geometry.fill',
						stylers: [ { color: '#fefefe' }, { lightness: 20 } ]
					},
					{
						featureType: 'administrative',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 } ]
					}
				]
			};

			var mapElement = document.getElementById('map');


			var map = new google.maps.Map(mapElement, mapOptions);


			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(89.67, -73.94),
				map: map,
				title: 'Snazzy!'
			});
		}
	}

	$(document).ready(function() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	});
});


var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

// © ╔╗──╔╦══╗╔══╦══╦════╦══╗
//║║──║║╔╗║╚╗╔╩╗╔╩═╗╔═╣╔╗║
//║╚╗╔╝║║║║─║║─║║──║║─║║║║
//║╔╗╔╗║║║╠╗║║─║║──║║─║║║║
//║║╚╝║║╚╝║╚╝╚╦╝╚╗─║║─║╚╝║
//╚╝──╚╩══╩═══╩══╝─╚╝─╚══╝
//╔════╦═══╦══╗
//╚═╗╔═╣╔══╣╔╗║
//──║║─║╚══╣╚╝║
//──║║─║╔══╣╔╗║
//──║║─║╚══╣║║║
//──╚╝─╚═══╩╝╚╝


$(window).on('load', function () {
    var $preloader = $('#p_prldr'),
        $atom   = $preloader.find('.atom');
    $atom.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});