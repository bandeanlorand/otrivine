$(function(){
		//top bar cookie check
		var first_time = $.cookie('firstTime');
		if(first_time==null) {
			$('#top-bar').delay(1300).animate({ 'marginTop' : 0 }, 400, function(){});
		}
				
		//top bar close
		$('#close-btn').click(function() {
			$('#top-bar').animate({ 'marginTop' : -56 }, 200, function(){});
			$.cookie('firstTime', 'false', { expires: 14 });
			return false;
		});
		
		//top bar close
		$('#close-btn-x').click(function() {
			$('#top-bar').animate({ 'marginTop' : -56 }, 200, function(){});

			return false;
		});


});


$(function() {
	
		function filterPath(string) {
			return string
			.replace(/^\//,'')
			.replace(/(index|default).[a-zA-Z]{3,4}$/,'')
			.replace(/\/$/,'');
		}
	
		var locationPath = filterPath(location.pathname);
		var scrollElem = scrollableElement('html', 'body');
	
		// Any links with hash tags in them (can't do ^= because of fully qualified URL potential)
		$('a[href*=#]').each(function() {
	
			// Ensure it's a same-page link
			var thisPath = filterPath(this.pathname) || locationPath;
			if (  locationPath == thisPath
				&& (location.hostname == this.hostname || !this.hostname)
				&& this.hash.replace(/#/,'') ) {
	
					// Ensure target exists
					var $target = $(this.hash), target = this.hash;
					if (target) {
	
						// Find location of target
						var targetOffset = $target.offset().top;
						$(this).click(function(event) {
	
							// Prevent jump-down
							event.preventDefault();
	
							// Animate to target
							$(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
	
								// Set hash in URL after animation successful
								location.hash = target;
	
							});
						});
					}
			}
	
		});
	
		// Use the first element that is "scrollable"  (cross-browser fix?)
		function scrollableElement(els) {
			for (var i = 0, argLength = arguments.length; i <argLength; i++) {
				var el = arguments[i],
				$scrollElement = $(el);
				if ($scrollElement.scrollTop()> 0) {
					return el;
				} else {
					$scrollElement.scrollTop(1);
					var isScrollable = $scrollElement.scrollTop()> 0;
					$scrollElement.scrollTop(0);
					if (isScrollable) {
						return el;
					}
				}
			}
			return [];
		}
	
	});
// JavaScript Document