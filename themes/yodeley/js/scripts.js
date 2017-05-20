// document.addEventListener("DOMContentLoaded", function(){
//     Typed.new(".element", {
//         strings: ["somar no seu time de comunicação", "subir o nível dos seus conteúdos", "gerenciar seus projetos criativos", "registrar seus momentos importantes", "tirar idéias do papel"],
//         typeSpeed: 100,
// 	    backSpeed: 10,
// 	    startDelay: 550,
// 	    backDelay: 1450,
// 	    loop: false,
// 		cursorChar: "|",
// 		showCursor: true,
//     });
// });

$.adaptiveBackground.run({
  success: function($img, data) {
    console.log('Success!', $img, data);
  }
});

$(function() {
    $(".giftrigger").hover(
        function() {
            $(this).attr("src", "/wp-content/themes/yodeley/img/source.gif");
        },
        function() {
            $(this).attr("src", "/wp-content/themes/yodeley/img/static.jpg");
        }                         
    );                  
});

$(function(){
	$('#menu-button').click(function() {
		$('nav').toggleClass('menuOpen');
	});
});

particlesJS.load('particles-js', '/wp-content/themes/yodeley/assets/particlesjs.json', function() {
  console.log('callback - particlesjs.json config loaded');
});



      var url = $('well iframe').attr('src');
      $('.item').click(function() {
            console.log('oi')
          //Below we remove the URL to stop the video from playing, here we add it back in
          $('well iframe').attr('src', url);
      });
      $('#modaal-shadow').click(function() {
          //Assign the iframe's src to null, which kills the video
          $('well iframe').attr('src', '');
      });
