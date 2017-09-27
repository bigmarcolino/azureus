//Script para index.html

var paused = false;
var timeS = 60;
var timetoOver;
var score = 0;

$(document).ready(function() {
	$("a[rel=modalExit]").click( function(ev) {
		ev.preventDefault();

		var id = $(this).attr("href");
		var alturaTela = $(document).height();
		var larguraTela = $(window).width();

		$('#mascara').css({'width':larguraTela, 'height':alturaTela});
		$('#mascara').fadeIn(1000);
		$('#mascara').fadeTo("slow",0.8);

		var left = ($(window).width() / 2) - ( $(id).width() / 2 ) - 23;
		var top = ($(window).height() / 2) - ( $(id).height() / 2 ) - 23;

		$(id).css({'top':top,'left':left});
		$(id).show();  
	});

	$("#mascara").click( function() {
		$(this).hide();
		$("#modalExit").hide();
	});
});

$("#yes").click(function() {
	window.close();
});

$("#no").click(function() {
	$(document).ready( function() { $("#modalExit").css("display","none"); } );
	$(document).ready( function() { $("#mascara").css("display","none"); } );
});


//Script para game.html
$(document).ready(function() {
	$("a[rel=modalPause]").click( function(ev) {
		ev.preventDefault();
		
		paused = true;

		var id = $(this).attr("href");
		var alturaTela = $(document).height();
		var larguraTela = $(window).width();

		$('#mascara').css({'width':larguraTela,'height':alturaTela});
		$('#mascara').fadeIn(1000);
		$('#mascara').fadeTo("slow",0.8);

		var left = ($(window).width() / 2) - ( $(id).width() / 2 ) - 23;
		var top = ($(window).height() / 2) - ( $(id).height() / 2 ) - 23;

		$(id).css({'top':top,'left':left});
		$(id).show();  
	});

	$("#mascara").click( function() {
		$(this).hide();
		$("#modalPause").hide();
	});
});

function confirmExitToMenu() {
	var r = confirm("Are you sure?");
	
	if (r==true)
		location.href="index.html"
}

function confirmLeaveGame() {
	var r = confirm("Are you sure?");
	
	if (r==true)
		window.close();
}

$("#resume, #mascara").click(function() {
	$(document).ready( function() { $("#modalPause, #modalExit").css("display","none"); } );
	$(document).ready( function() { $("#mascara").css("display","none"); } );
	timetoOver = setTimeout(function() {	
		confirmGameOver(score);
		game.stop();
	}, timeS*1000 + 500);
	paused = false;
	game.resume();
});

$("#exitToMenu").click(function() {
	confirmExitToMenu();
});

$("#leaveGame").click(function() {
	confirmLeaveGame();
});

$(document).ready(function() {
	$("#tips1").fadeIn(1500);
	$("#tips2").delay(1600).fadeIn(1500);
	$("#go").delay(3100).fadeIn(200);
});

$("#pageTips").click(function() {
	location.href = "game.html";
});
