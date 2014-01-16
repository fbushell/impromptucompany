;(function( $, window, document, undefined ) {

	'use strict';

	var Cirro				= window.Cirro || {},
			$document   = $( document ),
			$window 	  = $( window );
		
	// The page singleton controller object
	var page = {

		init: function(){
			var self = this;

			// Variables
			self.win        = {};
			self.$html      = $("html, body");
			self.docuHeight = $(document).height();
			self.windHeight = $(window).height();
			self.scrollPos  = null;
			self.$logo      = $('div.logo');
			self.$sectionOne = $('section.one');

			// Initilaize methods
			self.windowSizeFunction();
			self.centerLogo();
			self.fallbackIntro();

			// Init event methods
			self.$sectionOne.on('click', self.scrollToTwo);
		},

		fallbackIntro: function() {
			if (!Detector.webgl) {
			  page.$html.addClass('no-webgl');
			}
			},

		centerLogo: function() {
			var self = this;
			var windHeight = self.windHeight;
			var logoHeight = self.$logo.height();
			var center = (windHeight - logoHeight) / 2;
			self.$logo.css('top', center);
		},

		scrollToTwo: function() {
			var self = this;
			var $two = $('section.two');
			page.$html.animate({
        scrollTop: $two.offset().top
    	}, 1000);
		},
	
		// Its a kanomai Easter
		loveEgg: function() {
			var self = this;

			 $( window ).konami({  
	        cheat: function() {
	        		$('#background-set-later').css('display', 'inline');
	        		$('.contained-section').css('background', 'rgba(255,255,255,.0)')
	        }
	    });
		},

		// Find the width of the window
		windowSizeFunction: function() {
			var self = this;
			self.windHeight = $window.height();
			self.windWidth  = $window.width();
		},

		scrollPosition: function() {
			var self = this;
			self.scrollPos = $(document).scrollTop();
		},

		fadeLogo: function() {
			var self = this;
			var opacity = 1 - (self.scrollPos * .002) ;
			
			if (self.scrollPos < 370) {
				self.$logo.css('opacity', opacity);
			}
			
			// if (self.scrollPos > self.windHeight) {
			// 	self.$logo.css('display', 'none');
			// } else {
			// 	self.$logo.css('display', 'block');
			// }
		},

	};


	// Attach the object controller to the Cirro namespace
	Cirro.page = page;

	// Window load
	$window.load(function(){

		var $loader = $("div#loader");
		var $html   = $("html");
		
		
		// Show site after timeout
		setTimeout(function() {

			$html.css("overflow","auto");
			$loader.fadeOut();
		}, 1000);

		// Initialize the singleton object controller after images loaded
			page.init();
	});

	// Window scroll
	$window.scroll(function(){
		page.scrollPosition();
		page.fadeLogo();
	});		

	// Window resize
	$window.resize(function(){
		page.windowSizeFunction();
		page.centerLogo();

	});

}( jQuery, window, document));