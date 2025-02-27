Otrivin = {
	init: function(){		
		this.setupCookiePopup();
		this.setupVideoPlayer();			
		this.addVideoEvents();
		this.addFlashEvents();
		$('.flashPlayerBigContainer,.videoPlayerBigContainer').css({opacity:0});
		setTimeout(function(){
			$('.flashPlayerBigContainer,.videoPlayerBigContainer').hide()
		}, 500);
		this.initTrack();
		this.flashPlayer = this.getFlash('nose');
		this.firstPlay = true;										
	},
	
	getFlash: function (flash_id)
	{	
		var flash;
		if(navigator.appName.indexOf("Microsoft") != -1){
			flash = window.document[flash_id];
		}
		else{
			flash = window.document[flash_id];
		}
		return flash;
	},
	
	initTrack: function(){
		$('.trackClick').on('click', function(){
			var cat = 'navigation',
				action = $(this).data('tkaction'),
				title = $(this).data('tktitle'),
				desc = $(this).data('tkdesc');
						
			dcsMultiTrack( 'DCSext.iaction_cat', cat,'DCSext.iaction_desc', action,'DCSext.iaction_detail', title,'DCSext.nav_1', desc,'DCSext.vhit', '1' );
		});		
	},
	
	setupVideoPlayer: function(){
		$('audio,video').mediaelementplayer({
		// if the <video width> is not specified, this is the default
		defaultVideoWidth : 960,
		// if the <video height> is not specified, this is the default
		defaultVideoHeight : 540,
		videoWidth : 960,
		videoHeight : 540,
		pluginWidth : 960,
		pluginHeight : 540,
		enableAutosize : false,
		success : function(player, node) {
				$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
			}
		});	
	},	
		
	addVideoEvents: function(){
	
		$('#playVideo').click(function(e) {			
			e.preventDefault();		
			$('.videoPlayerBigContainer').show();
			$('.videoPlayerBigContainer').css('zIndex', 400);
			$('.videoPlayerBigContainer').stop(true, true).animate({opacity: 1}, 400, function(){											
				$('video, audio').each(function() {
					/*ie fix method not supported*/
					try {
						$(this)[0].player.play();
					} catch(e) {
						Otrivin.playIE();
					}
				});
			});	
		});
		
		/* stop */
		$('.videoPlayerBigContainer').click(function(e) {
			if(!$(e.target).hasClass('close') && $(e.target).parents('#watchTheAdOverlay').length > 0){				
				return false;
			}
			e.preventDefault();		
			$('video, audio').each(function() {
				/*ie fix method not supported*/
				try {
					$(this)[0].player.pause();
				} catch(e) {
					Otrivin.playIE();
				}
			});
			$('.videoPlayerBigContainer').stop(true, true).animate({opacity: 0}, 200, function(){
				$('.videoPlayerBigContainer').css('z-index', -1);										
				$('.videoPlayerBigContainer').hide();
			});												
		});
		
	},
	
	
	
	
	addFlashEvents: function(){		
		var _this = this;
		$('#playFlash').click(function(e) {
			e.preventDefault();				
			$('.flashPlayerBigContainer').show();
			$('.flashPlayerBigContainer').css('zIndex', 400);
			$('.flashPlayerBigContainer').stop(true, true).animate({opacity: 1}, 400);			
			if(_this.firstPlay){
				_this.firstPlay = false;				
			} else {
				_this.flashPlayer.playAnimation();
			}
				
		});
		
		/* stop */
		$('.flashPlayerBigContainer').click(function(e) {
			if(!$(e.target).hasClass('close') && $(e.target).parents('#seeHowOverlay').length > 0){				
				return false;
			}			
			e.preventDefault();
			_this.flashPlayer.closePopup();											
			$('.flashPlayerBigContainer').stop(true, true).animate({opacity: 0}, 200, function(){
				$('.flashPlayerBigContainer').css('z-index', -1);									
				$('.flashPlayerBigContainer').hide();
								
			});												
		});
		
	},

	playIE: function() {
		setTimeout(function() {
			$('.mejs-overlay-button').trigger('click');
		}, 1000);
	},
	
		
	setupCookiePopup: function(){
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
	}	
}

$(function(){Otrivin.init();});



var tabs=function(){var c=function(c,a){var b=new RegExp("(^| )"+a+"( |$)");return b.test(c.className)?true:false},i=function(a,b){if(!c(a,b))if(a.className=="")a.className=b;else a.className+=" "+b},h=function(a,b){var c=new RegExp("(^| )"+b+"( |$)");a.className=a.className.replace(c,"$1");a.className=a.className.replace(/ $/,"")},g=function(c,b){var a=document.getElementsByTagName("html");if(a)a[0].scrollTop+=b},e=function(){var a=window.location.pathname;if(a.indexOf("/")!=-1)a=a.split("/");var b=a[a.length-1]||"root";if(b>20)b=b.substring(b.length-19);return b},a=e(),d=function(a){this.a=0;this.b=[];this.c=[];this.d=[];this.e=0;this.f(a)};d.prototype={g:function(c){var d=new RegExp(a+c+"=[^;&]+"),b=document.cookie.match(d);return b?b[0].split("=")[1]:this.h()},h:function(){for(var a=0,b=this.d.length;a<b;a++)if(c(this.d[a],"selected"))return a;return 0},j:function(d,c){for(var b=d.getAttribute("rel"),a=0;a<this.b.length;a++)if(this.b[a].getAttribute("rel")==b){i(this.b[a].parentNode,"selected");c&&this.e&&this.k(this.a,a)}else h(this.b[a].parentNode,"selected");this.l(b)},k:function(b,c){if(document.cookie.indexOf("tabContent=")==-1)document.cookie="tabContent="+a+b+"="+c+";path=/";else if(document.cookie.indexOf(a+b)==-1){var e=new RegExp("tabContent=[^;]+");document.cookie=document.cookie.match(e)[0]+"&"+a+b+"="+c+";path=/"}else{var e=new RegExp(a+b+"=\\d+","g"),d=document.cookie.replace(e,a+b+"="+c);document.cookie=d.substring(d.indexOf("tabContent="))}},l:function(b){for(var a=0;a<this.c.length;a++)this.c[a].style.display=this.c[a].id==b?"block":"none"},m:function(a){if(a.id)for(var b=0;b<this.b.length;b++)if(this.b[b].getAttribute("rel")==a.id)return this.b[b];return a.parentNode.nodeName!="BODY"?this.m(a.parentNode):null},n:function(d,c){var a=document.getElementById(d);if(a){var b=this.m(a);if(b){this.j(b,0);!c&&setTimeout(function(){a.scrollIntoView();g(a,-120)},100);return 1}else return 0}},f:function(a){this.a=a.i;this.b=a.getElementsByTagName("a");this.d=a.getElementsByTagName("li");for(var b=0;b<this.b.length;b++)if(this.b[b].getAttribute("rel")){this.c.push(document.getElementById(this.b[b].getAttribute("rel")));var f=this;this.b[b].onclick=function(){f.j(this,1);return false}}var e=a.getAttribute("persist")||"";if(e.toLowerCase()=="true")this.e=1;var d=window.location.hash;if(d&&d.length>1)if(this.n(d.substring(1),window.location.search.indexOf("noscroll=true")>-1))return;var c=this.e?parseInt(this.g(a.i)):this.h();if(c>=this.b.length)c=0;this.j(this.b[c],0)}};var b=[],j=function(a,c,b){if(a.addEventListener)a.addEventListener(c,b,false);else a.attachEvent&&a.attachEvent("on"+c,b)},f=function(){for(var e=document.getElementsByTagName("ul"),a=0,f=e.length;a<f;a++)if(c(e[a],"tabs")){e[a].i=b.length;b.push(new d(e[a]))}};j(window,"load",f);return{open:function(c,d){for(var a=0;a<b.length;a++)b[a].n(c,d)}}}()

var menu=function(){var c=function(c,a){var b=new RegExp("(^| )"+a+"( |$)");return b.test(c.className)?true:false},i=function(a,b){if(!c(a,b))if(a.className=="")a.className=b;else a.className+=" "+b},h=function(a,b){var c=new RegExp("(^| )"+b+"( |$)");a.className=a.className.replace(c,"$1");a.className=a.className.replace(/ $/,"")},g=function(c,b){var a=document.getElementsByTagName("html");if(a)a[0].scrollTop+=b},e=function(){var a=window.location.pathname;if(a.indexOf("/")!=-1)a=a.split("/");var b=a[a.length-1]||"root";if(b>20)b=b.substring(b.length-19);return b},a=e(),d=function(a){this.a=0;this.b=[];this.c=[];this.d=[];this.e=0;this.f(a)};d.prototype={g:function(c){var d=new RegExp(a+c+"=[^;&]+"),b=document.cookie.match(d);return b?b[0].split("=")[1]:this.h()},h:function(){for(var a=0,b=this.d.length;a<b;a++)if(c(this.d[a],"selected"))return a;return 0},j:function(d,c){for(var b=d.getAttribute("rel"),a=0;a<this.b.length;a++)if(this.b[a].getAttribute("rel")==b){i(this.b[a].parentNode,"selected");c&&this.e&&this.k(this.a,a)}else h(this.b[a].parentNode,"selected");this.l(b)},k:function(b,c){if(document.cookie.indexOf("tabContent=")==-1)document.cookie="tabContent="+a+b+"="+c+";path=/";else if(document.cookie.indexOf(a+b)==-1){var e=new RegExp("tabContent=[^;]+");document.cookie=document.cookie.match(e)[0]+"&"+a+b+"="+c+";path=/"}else{var e=new RegExp(a+b+"=\\d+","g"),d=document.cookie.replace(e,a+b+"="+c);document.cookie=d.substring(d.indexOf("tabContent="))}},l:function(b){for(var a=0;a<this.c.length;a++)this.c[a].style.display=this.c[a].id==b?"block":"none"},m:function(a){if(a.id)for(var b=0;b<this.b.length;b++)if(this.b[b].getAttribute("rel")==a.id)return this.b[b];return a.parentNode.nodeName!="BODY"?this.m(a.parentNode):null},n:function(d,c){var a=document.getElementById(d);if(a){var b=this.m(a);if(b){this.j(b,0);!c&&setTimeout(function(){a.scrollIntoView();g(a,-120)},100);return 1}else return 0}},f:function(a){this.a=a.i;this.b=a.getElementsByTagName("a");this.d=a.getElementsByTagName("li");for(var b=0;b<this.b.length;b++)if(this.b[b].getAttribute("rel")){this.c.push(document.getElementById(this.b[b].getAttribute("rel")));var f=this;this.b[b].onclick=function(){f.j(this,1);return false}}var e=a.getAttribute("persist")||"";if(e.toLowerCase()=="true")this.e=1;var d=window.location.hash;if(d&&d.length>1)if(this.n(d.substring(1),window.location.search.indexOf("noscroll=true")>-1))return;var c=this.e?parseInt(this.g(a.i)):this.h();if(c>=this.b.length)c=0;this.j(this.b[c],0)}};var b=[],j=function(a,c,b){if(a.addEventListener)a.addEventListener(c,b,false);else a.attachEvent&&a.attachEvent("on"+c,b)},f=function(){for(var e=document.getElementsByTagName("ul"),a=0,f=e.length;a<f;a++)if(c(e[a],"menu")){e[a].i=b.length;b.push(new d(e[a]))}};j(window,"load",f);return{open:function(c,d){for(var a=0;a<b.length;a++)b[a].n(c,d)}}}()



$(function() {
    $("#tabcontentMain1 > div.storeBox:nth-child(3n)").addClass( "last" );
	$("#tabcontentMain1 > div.storeBox:nth-child(3n+1)").addClass( "first" );
	$("#tabcontentMain1 > div.storeBox:nth-child(-n+3)").addClass( "firstRow" );
	$("#listTwoNrRow > li:nth-child(10n)").addClass( "thenthRow" );
});


$(function() {
    $("a.howTheProductWorks[rel]").overlay({mask: '#000', effect: 'apple'});
	$("a.watchTheAd[rel]").overlay({mask: '#000', effect: 'apple',
        onClose: function(){
            $('video, audio').each(function() {
              $(this)[0].player.pause();		  
        });
        },

        onBeforeLoad: function() {

            
        }});
  });
   
$(document).ready(function(){
    site.resize();

    $(window).resize(function(){
        site.resize();
    });
});   
   
var site = {
		
    resize: function(){
        var new_margin = Math.ceil(($(window).height() - $('#watchTheAdOverlay').height()) / 2);
        $('#watchTheAdOverlay','').css('margin-top', new_margin + 'px');
    }
};

$(document).ready(function(){
    siteV.resize();

    $(window).resizeV(function(){
        site.resize();
    });
});   

var siteV = {
		
    resize: function(){
        var new_margin = Math.ceil(($(window).height() - $('#seeHowOverlay').height()) / 2);
        $('#seeHowOverlay').css('margin-top', new_margin + 'px');
    }
};
    

