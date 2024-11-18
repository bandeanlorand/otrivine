//You can change in this file the text for the popup//
$(document).ready(function() {
 

  $.expr[':'].external = function(obj){
      return !obj.href.match(/^mailto\:/)
              && (obj.hostname != location.hostname);
  };
 

  $('a:external').addClass('external');
  $('.external').click(function() {
    var link = $(this).attr('href');
	//FOR CHANGING THE POPUPS TEXT, CHANGE THE TEXT BELOW as in a html, space betwen html tags is not allowed//
    $('<div><h1>You are leaving Otrivin.com</h1><p>Clicking on this link means that you have chosen to leave our website. While we believe that the website which you have selected to visit may be of interest to you, some parts of this website are not under our control. As a result, we do not endorse its content, and we have no responsibility for its content or privacy practices.</p></div>').dialog({
      title: "External Link",
      modal : true,
	  
      overlay: {
        backgroundColor: '#000',
        opacity: 0.5,
		resizable: false
      },
	  
      buttons: {
        'Continue' //CONTINUE BUTTON TEXT//
		: function() {
          $(this).dialog('close').remove();
          window.open(link);
        },
        'Return' //RETURN BUTTON TEXT//
		: function() {
          $(this).dialog('close').remove();
          return false;
        }
      }
    });
    return false;
  });
});