function closeAd(){
	pexi.close();
}

function playVideo(url){
	//pause slick
	$('.slider').slick('slickPause');

	var videobox = document.querySelector('.video_overlay');
	videobox.classList.toggle('toggle');
	$('.video_overlay').fadeToggle();

	pexi.video('#video', url, false);
	var video = document.querySelector('#video video');
	video.controls = true;
	video.muted = false;
	video.nodownload = true;

	video.play();
	// controls( video );

	return false;
}

function closeVideo(){
	var videobox = document.querySelector('.video_overlay');
	videobox.classList.toggle('toggle');
	$('.video_overlay').fadeToggle();

	$('#video').empty();

	//play after close
	$('.slider').slick('slickPlay');

	pexi.event('video closed');
}

$(document).ready(function(){
	//als de slider verandert van slide dan moeten deze functies uitgevoerd worden
	$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		//als er een slide veranderd maak de juiste thumb active
		var id = nextSlide + 1;
		$('.nav_item').removeClass('active');
		$('#nav_item' + id + '').addClass('active');

		//view slide event
		pexi.event('view_slide_' + id + '');
	});

	$('.slider').on('swipe', function(event, slick, direction){
		console.log('user_swipe_' + direction + '');
		pexi.event('user_swipe_' + direction + '');
	});

	setTimeout(function(){
		//maken van de slick slider
		$('.slider').slick({
			slidesToShow: 1,
			arrows: true,
			infinite: true,
			cssEase: 'linear',
			autoplay: false,
			speed: 300,
			autoplaySpeed: 4000,
			dots: false,
			prevArrow: '<button type="button" class="btn btn-prev"></button>',
			nextArrow: '<button type="button" class="btn btn-next"></button>',
			//fade: true,
			//cssEase: 'linear',

			responsive: [
				{
					breakpoint: 1024,
					settings: {
						dots: false,
					},
				},
				{
					breakpoint: 552,
					settings: {
						// centerPadding: '30px',
						pauseOnFocus: false,
						dots: true,
					},
				},
			],
		});

		//events voor left en right arrows
		$('.btn-next').click(function(){
			pexi.event('user_arrow_right');
		});
		$('.btn-prev').click(function(){
			pexi.event('user_arrow_left');
		});
	}, 500);

	//werking van de thumbs, id selecteren en slickTo..
	$('.nav_item').click(function(){
		var id = this.id;
		var id = id.replace('nav_item', '');
		var idd = id - 1;

		$('.slider').slick('slickGoTo', idd);
		//navigatie click
		pexi.event('user_nav_' + id + '');
	});

	$('.transformer').fadeIn();
});

//we have to block the click on .playbutton
$('.playbutton').click(function(e){
	e.preventDefault();
	return false;
});
