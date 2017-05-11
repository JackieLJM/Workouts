var defaultManualSpeed = 500;
var defaultAutoSpeed = 15000;
var defaultAutoSpeedEdge = 7500; // optimal - half of defaultAutoSpeed

function goToPoint1(speed, gearbox, way) {
	if (!speed) speed = defaultManualSpeed;
	if (gearbox != 'auto') showIntroPart('Welcome');
	if (way == 'throughEdge') {

		if (gearbox == 'auto') {

			$('#timeline .inside').animate({
				backgroundPosition: '-7px -42px'
			}, defaultAutoSpeedEdge, function() {
				$('#introNav .nav li').removeClass('active').filter('.p1').addClass('active');
				$('#timeline .inside').css({ backgroundPosition: '-990px -42px' });
				$('#timeline .inside').animate({
					backgroundPosition: '-913px -42px'
				}, defaultAutoSpeedEdge, function() {
					$('#introNav .nav li').removeClass('active').filter('.p1').addClass('active');
					if (gearbox == 'auto') showIntroPart('Welcome');
					setTimeout(function() { introStop(); }, defaultManualSpeed);
				});
			});

		} else {

			$('#timeline .inside').animate({
				backgroundPosition: '-7px -42px'
			}, 250, function() {
				$('#introNav .nav li').removeClass('active').filter('.p1').addClass('active');
				$('#timeline .inside').css({ backgroundPosition: '-990px -42px' });
				$('#timeline .inside').animate({
					backgroundPosition: '-913px -42px'
				}, 250, function() {
					$('#introNav .nav li').removeClass('active').filter('.p1').addClass('active');
					if (gearbox == 'auto') showIntroPart('Welcome');
					setTimeout(function() { introStop(); }, defaultManualSpeed);
				});
			});

		}
	} else {
		if (!speed) speed = defaultManualSpeed;
		$('#timeline .inside').animate({
			backgroundPosition: '-913px -42px'
		}, speed, function() {
			$('#introNav .nav li').removeClass('active').filter('.p1').addClass('active');
			if (gearbox == 'auto') showIntroPart('Welcome');
		});
	}
}
function goToPoint2(speed, gearbox) {
	if (!speed) speed = defaultManualSpeed;
	if (gearbox != 'auto') showIntroPart('Accessibility');
	$('#timeline .inside').animate({
		backgroundPosition: '-709px -42px'
	}, speed, function() {
		$('#introNav .nav li').removeClass('active').filter('.p2').addClass('active');
		if (gearbox == 'auto') showIntroPart('Accessibility');
	});
}
function goToPoint3(speed, gearbox) {
	if (!speed) speed = defaultManualSpeed;
	if (gearbox != 'auto') showIntroPart('Performance');
	$('#timeline .inside').animate({
		backgroundPosition: '-505px -42px'
	}, speed, function() {
		$('#introNav .nav li').removeClass('active').filter('.p3').addClass('active');
		if (gearbox == 'auto') showIntroPart('Performance');
	});
}
function goToPoint4(speed, gearbox) {
	if (!speed) speed = defaultManualSpeed;
	if (gearbox != 'auto') showIntroPart('Featured');
	$('#timeline .inside').animate({
		backgroundPosition: '-300px -42px'
	}, speed, function() {
		$('#introNav .nav li').removeClass('active').filter('.p4').addClass('active');
		if (gearbox == 'auto') showIntroPart('Featured');
	});
}
function goToPoint5(speed, gearbox, way) {
	if (!speed) speed = defaultManualSpeed;
	if (gearbox != 'auto') showIntroPart('Community');
	if (way == 'throughEdge') {

		if (gearbox == 'auto') {

			$('#timeline .inside').animate({
				backgroundPosition: '-990px -42px'
			}, defaultAutoSpeedEdge, function() {
				$('#introNav .nav li').removeClass('active').filter('.p5').addClass('active');
				$('#timeline .inside').css({ backgroundPosition: '-7px -42px' });
				$('#timeline .inside').animate({
					backgroundPosition: '-97px -42px'
				}, defaultAutoSpeedEdge, function() {
					$('#introNav .nav li').removeClass('active').filter('.p5').addClass('active');
					if (gearbox == 'auto') showIntroPart('Community');
				});
			});

		} else {

			$('#timeline .inside').animate({
				backgroundPosition: '-990px -42px'
			}, 250, function() {
				$('#introNav .nav li').removeClass('active').filter('.p5').addClass('active');
				$('#timeline .inside').css({ backgroundPosition: '-7px -42px' });
				$('#timeline .inside').animate({
					backgroundPosition: '-97px -42px'
				}, 250, function() {
					$('#introNav .nav li').removeClass('active').filter('.p5').addClass('active');
					if (gearbox == 'auto') showIntroPart('Community');
				});
			});

		}

	} else {
		$('#timeline .inside').animate({
			backgroundPosition: '-97px -42px'
		}, speed, function() {
			$('#introNav .nav li').removeClass('active').filter('.p5').addClass('active');
			if (gearbox == 'auto') showIntroPart('Community');
		});
	}
}

function introAutoPlay() {
	$('#introNav #playback .play').hide().parent().parent().find('.pause').show();
	if ($('#introNav .nav li.active').size() > 0) {
		var activePointNo = $('#introNav .nav li.active').attr('class').substr(1, 1);
	}
	if (activePointNo < 2) goToPoint2(defaultAutoSpeed, 'auto');
	if (activePointNo < 3) goToPoint3(defaultAutoSpeed, 'auto');
	if (activePointNo < 4) goToPoint4(defaultAutoSpeed, 'auto');
	if (activePointNo < 5) goToPoint5(defaultAutoSpeed, 'auto');
	goToPoint1(defaultAutoSpeed, 'auto', 'throughEdge');
}

function introStop() {
	$('#timeline .inside').stop(function() { $('#timeline .inside').stop(); });
	$('#introNav #playback .pause').hide().parent().parent().find('.play').show();
}

function showIntroPart(part) {
	if ( $.browser.msie )
	{
		$('.introPart').hide();
		$('#intro' + part).show();
	}
	else
	{
		$('.introPart').fadeOut(defaultManualSpeed);
		$('#intro' + part).fadeIn(defaultManualSpeed);
	}
}

$(document).ready(function() {
	$('#introNav #playback .play a').click(function() {
		introAutoPlay();
		return false;
	});
	$('#introNav #playback .pause a').click(function() {
		introStop();
		return false;
	});

	$('#introNav #playback .prev a').click(function() {
		introStop();
		var activePointNo = $('#introNav .nav li.active').attr('class').substr(1, 1);
		switch (activePointNo) {
			case '1': goToPoint5(defaultManualSpeed, '', 'throughEdge'); break;
			case '2': goToPoint1(); break;
			case '3': goToPoint2(); break;
			case '4': goToPoint3(); break;
			case '5': goToPoint4(); break;
		}
		return false;
	});

	$('#introNav #playback .next a').click(function() {
		introStop();
		var activePointNo = $('#introNav .nav li.active').attr('class').substr(1, 1);
		switch (activePointNo) {
			case '1': goToPoint2(); break;
			case '2': goToPoint3(); break;
			case '3': goToPoint4(); break;
			case '4': goToPoint5(); break;
			case '5': goToPoint1(defaultManualSpeed, '', 'throughEdge'); break;
		}
		return false;
	});

	$('#introNav .p1 a').click(function() {
		introStop();
		if (!$(this).parent().hasClass('active')) goToPoint1();
		return false;
	});
	$('#introNav .p2 a').click(function() {
		introStop();
		if (!$(this).parent().hasClass('active')) goToPoint2();
		return false;
	});
	$('#introNav .p3 a').click(function() {
		introStop();
		if (!$(this).parent().hasClass('active')) goToPoint3();
		return false;
	});
	$('#introNav .p4 a').click(function() {
		introStop();
		if (!$(this).parent().hasClass('active')) goToPoint4();
		return false;
	});
	$('#introNav .p5 a').click(function() {
		introStop();
		if (!$(this).parent().hasClass('active')) goToPoint5();
		return false;
	});

	if ($('#mainnav ul').size() > 0) {
		var pointLeft = Math.ceil($('#mainnav > li.withSubnav > a').width() / 2) - 3;
		$('#mainnav > li.withSubnav > a span').after('<div id="subnavPoint"></div>');
		$('#subnavPoint').css('left', pointLeft);
	}

	$('#timeline .inside').css('background-position', '-913px -42px');

	$('#leading, #mainnav ul, #main h2, .demoNav li, .featuresNav li.active').not('h2.title, .customerList h2').append('<span class="corner1"></span><span class="corner2"></span><span class="corner3"></span><span class="corner4"></span>');

	$('.btnDemo a, .btnDownload a, .btnLearn a, .btnBuyNow a, p.downloads a, .boxProductTour p a').hover(function() {
		$(this).fadeTo(200, '0.8');
	}, function() {
		$(this).stop().fadeTo(200, '1');
	});


});

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(function() {
	introAutoPlay();
});