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
			self.win         = {};
			self.$html       = $("html, body");
			self.docuHeight  = $(document).height();
			self.windHeight  = $(window).height();
			self.scrollPos   = null;
			self.$logo       = $('div.logo');
			self.$what       = $('div.what');
			self.$sectionOne = $('section.one');
			self.$sectionTwo = $('section.two');
			self.$slider 		 = $('.proj-slider');
			self.$arrow      = $('.arrow');

			// Initilaize methods
			self.windowSizeFunction();
			self.centerLogo();
			self.fallbackIntro();
			self.fadeArrow();
			page.fadeLogo();
			page.fadeWhat();
			self.sliderInit();

			// Init event methods
			self.$sectionOne.on('click', self.scrollToTwo);
		},

		fadeArrow: function() {
			var self = this;
			if (typeof(self.$arrow) === 'undefined') {return;}
			
			if (self.scrollPos > 50) {
				self.$arrow.css('opacity', 0);
			} else {
				self.$arrow.css('opacity', 1);
			}
		},

		sliderInit: function() {
			page.$slider.royalSlider({
				drag: true,
				autoScaleSlider: true,
				autoScaleSliderWidth: 800,
				autoScaleSliderHeight: 450,
				imageAlignCenter: true,
				usePreloader: true,
				numImagesToPreload: 2,
				loop: true,
				imageScaleMode: 'fit',
				slidesSpacing: 30,
				keyboardNavEnabled: true,
        visibleNearby: {
            enabled: true,
            centerArea: 0.6,
            center: true,
            //breakpoint: 650,
            // breakpointCenterArea: 0.64,
            navigateByCenterClick: true
        }
			});

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
			var opacity = 1 - (self.scrollPos * .002);

			if (typeof(self.$logo) === 'undefined') {return;}
			
				if (self.scrollPos < 370) {
					self.$logo.css('opacity', opacity);
				} else {
					self.$logo.css('opacity', 0.29);
				}
		},

		fadeWhat: function() {
			var self = this;
			var opacity = 1 - (self.scrollPos * .004);

			if (typeof(self.$what) === 'undefined') {return;}

			if ( self.scrollPos < 370 ) {
				self.$what.css('opacity', opacity);
			} else {
				self.$what.css('opacity', '0');
			}
		}

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
		page.fadeWhat();
		page.fadeArrow();
	});		

	$( window ).konami({  
	  cheat: function() {
	    page.$sectionTwo.css('background', 'url("img/ipad.gif") scroll');
	  }
  });

	// Window resize
	$window.resize(function(){
		page.windowSizeFunction();
		page.centerLogo();

	});

}( jQuery, window, document));