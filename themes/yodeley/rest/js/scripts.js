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