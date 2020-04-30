document.addEventListener("DOMContentLoaded", function() {

// Header menu
$('.burger').on('click', function(event){
	event.preventDefault();
	$('.header-info').toggleClass('m-menu__active')
	$('.hamburger').toggleClass('is-active')
});

//Home-page slider
$('.homepage-slider').slick({
	prevArrow: $('.y_prevArrow'),
	nextArrow: $('.y_nextArrow'),
	slidesToShow: 1,
	infinite: true,
	arrows: true,
	// responsive: [
	// {
	// 	breakpoint: 1379,
	// 	settings: {
	// 		slidesToShow: 1
	// 	}
	// }
	// ]
});


// Galery slider
function setProgress(index) {
	var calc = ((index + 1) / ($slider.slick('getSlick').slideCount)) * 100;

	$progressBar
	.css('background-size', calc + '% 100%')
	.attr('aria-valuenow', calc );

	$progressBarLabel.text(calc + '% completed');
}

var $slider = $('.gallery-slider');
var $progressBar = $('.progress');
var $progressBarLabel = $( '.slider__label' );

$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
	setProgress(nextSlide);
});

$slider.slick({ 
	prevArrow: $('.g_prevArrow'),
	nextArrow: $('.g_nextArrow'),
	slidesToShow: 1, 
	slidesToScroll: 1, 
	asNavFor: '.gallery-dotted',
	infinite: true
});


setProgress(0);


$('.gallery-dotted').slick({ 
	slidesToShow: 5, 
	asNavFor: '.gallery-slider', 
	focusOnSelect: true,
	infinite: true,
	arrows: false
});



// Modal window
const modal = document.querySelector('.modal');
const modalSuccess = document.querySelector('.success-window')
const modalForm = document.querySelector('.form-window')

// Modal btn
const modalBtnForm = document.querySelector('.form__btn');
const modalBtnFormHidden = document.querySelector('.form__btn--hidden');
const closeBtn = document.getElementsByClassName('close');
const homePageBtn = document.querySelectorAll('.homepage-slider__btn')
const sectMapBtn = document.querySelector('.sect-map__btn')
const cardBtn = document.querySelector('.card__btn')

// Events
if(cardBtn){
	cardBtn.addEventListener('click', openModalForm)
}


if(modalBtnForm){
	modalBtnForm.addEventListener('click', openModalSuccess);
}
modalBtnFormHidden.addEventListener('click', openModalSuccess);

for(var i = 0; i < homePageBtn.length; i++){
	homePageBtn[i].addEventListener('click', openModalForm)
}

if(sectMapBtn){
	sectMapBtn.addEventListener('click', openModalForm)
}


for(var i = 0; i < closeBtn.length; i++){
	closeBtn[i].addEventListener('click', closeModal)
}
window.addEventListener('click', outsideClick);

// Open

function openModalSuccess(e) {
	closeModal()
	e.preventDefault()
	modalSuccess.style.display = 'block';
}
function openModalForm(e) {
	e.preventDefault()
	modalForm.style.display = 'block';
}

// Close
function closeModal() {
	modal.style.display = 'none';
	modalForm.style.display = 'none';
	modalSuccess.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
	if (e.target == modal || e.target == modalForm || e.target == modalSuccess) {
		modal.style.display = 'none';
		modalForm.style.display = 'none';
		modalSuccess.style.display = 'none';
	}
}



//Clients slider
$('.clients-slider').slick({
	prevArrow: $('.c_prevArrow'),
	nextArrow: $('.c_nextArrow'),
	infinite: true,
	arrows: true,
	slidesToShow: 5,
	responsive: [
	{
		breakpoint: 1200,
		settings: {
			slidesToShow: 4
		}
	},
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1
		}
	},
	]
});


//Adress town window
$('.adress__town').click(function(e){
	$(this).parent().toggleClass('adress--active');
})
$('.adress__close-btn').click(function(e){
	$(this).parent().parent().parent().toggleClass('adress--active');
})



//Circle moving
var eyelids = document.querySelectorAll('.eyes-wrapper__inner__eye__eyelid'),
iris = document.querySelectorAll('.eyes-wrapper__inner__eye__iris'),
eyesWrapper = document.querySelector('.eyes-wrapper');

var createRandomNumber = function (min, max) {
	return Math.random() * (max - min) + min;
}

var blink = function (interval) {
	setTimeout(function () {
		for (var i = 0; i < eyelids.length; i++) {
			eyelids[i].classList.remove('blink');
		}
		setTimeout(function () {
			for (var j = 0; j < eyelids.length; j++) {
				eyelids[j].classList.add('blink');
			}
			blink(createRandomNumber(2000, 15000));
		}, 10)
	}, interval)
}

blink(createRandomNumber(2000, 15000));

var calcSkew = function (max, windowWidth, cursorX, cursorY, skewY) {

    // setup
    var halfWidth = windowWidth / 2; // get the half width of the window
    var halfCurrentPos = cursorX - halfWidth; // get position of x/y releative to halfWidth
    var percentageDecimal = halfCurrentPos / halfWidth, // turn halfCurrentPos into a percentage decimal
    skewDegree;

    if (cursorY < window.innerHeight / 2) return 0;

    if (!skewY) { // calculations for posX
    	if (halfCurrentPos > 0) {
            skewDegree = -Math.abs(Math.floor(percentageDecimal * max)); // flip skewDegree to negetive for pos on right side
          } else {
            skewDegree = Math.abs(Math.floor(percentageDecimal * max)); // calc skewDegree for left side
          }
    } else { // calculations for posY   
    	if (halfCurrentPos > 0) {
            skewDegree = Math.abs(Math.floor(percentageDecimal * max)); // calc skewDegree for right side
          } else {
            skewDegree = -Math.abs(Math.floor(percentageDecimal * max)); // flip skewDegree to negetive for pos on left side
          }
        }
        return skewDegree;
      }

      window.addEventListener('mousemove', function (e) {

    // config
    var self = this,
    evnt = e,
    cursorX = evnt.pageX,
    cursorY = evnt.pageY,
    windowWidth = self.innerWidth,
    windowHeight = self.innerHeight,
        posLeftPercetange = (cursorX / windowWidth) * 100, // turn cursorX pos into a percentage
        posTopPercentage = (cursorY / windowHeight) * 100; // turn cursorY pos into a percentage

        for (var i = 0; i < iris.length; i++) {
        	iris[i].style.left = posLeftPercetange + '%';
        	iris[i].style.transform = 'translate(-50%, -50%) skewX(' + calcSkew(12, windowWidth, cursorX, cursorY) +
        	'deg) skewY(' + calcSkew(8, windowWidth, cursorX, cursorY, 'skewY') + 'deg)';
        }

        for (var j = 0; j < iris.length; j++) {
        	iris[j].style.top = posTopPercentage + '%';
        	iris[j].style.transform = 'translate(-50%, -50%) skewX(' + calcSkew(12, windowWidth, cursorX, cursorY) +
        	'deg)  skewY(' + calcSkew(8, windowWidth, cursorX, cursorY, 'skewY') + 'deg)';
        }

        evnt.stopPropagation();

      });


//Licenses slider

$('.about_licenses_slider').slick({
	prevArrow: $('.l_prevArrow'),
	nextArrow: $('.l_nextArrow'),
	infinite: true,
	arrows: true,
	slidesToShow: 2,
	slidesToScroll: 2,
	responsive: [
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
	]
});

// Fancybox
$(".fancybox").fancybox({ 
	showCloseButton: true
});

$("a[rel=group]").fancybox({
	'transitionIn' : 'none',
	'transitionOut' : 'none',
	'titlePosition' : 'over',
	'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
		return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? '   ' + title : '') + '</span>';
	}
});


// Get width gutter
function getWidthGutter(){
	var widthWindow = document.body.clientWidth;
	var widthContainer = document.querySelector('.container').offsetWidth
	var gutters = document.getElementsByClassName('gutter');
	var guttersWidth = (widthWindow -widthContainer)/2;
	for(var i = 0; i<gutters.length;i++){
		gutters[i].style.width = guttersWidth + 15 + 'px';
	}
}
getWidthGutter();

// Akcii slice
$('.akcii_slider').slick({
	slidesToShow: 3,
	slidesToScroll: 3,
	infinite: true,
	dots: true,
	arrows: false,
	autoplay: true,
	speed: 1000,
	autoplaySpeed: 4000,
	responsive: [
	{
		breakpoint: 1200,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		}
	},
	{
		breakpoint: 700,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
	]
});

//Reviews slice
$('.reviews_slider').slick({
	slidesToShow: 3,
	slidesToScroll: 3,
	infinite: true,
	dots: true,
	arrows: false,
	autoplay: true,
	speed: 1000,
	autoplaySpeed: 4000,
	responsive: [
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
	]
});

//Reviews slice
$('.reviews_video_slider').slick({
	slidesToShow: 3,
	slidesToScroll: 3,
	infinite: true,
	dots: true,
	arrows: false,
	speed: 300,
	draggable: true,
	touchMove: true,
	swipe: true,
	touchThreshold: 100,
	swipeToSlide: true,
	responsive: [
	{
		breakpoint: 1200,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		}
	},
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
	]
});

// Card slider
$('.card_slider').slick({
	prevArrow: $('.card_prevArrow'),
	nextArrow: $('.card_nextArrow'),
	slidesToShow: 3,
	slidesToScroll: 1,
	infinite: true,
	speed: 1000,
	responsive: [
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
		}
	}
	]
});




// button scrollTop
$(window).scroll(function() {
	if($(this).scrollTop() != 0) {
		$('#topNubex').fadeIn();
	} else {
		$('#topNubex').fadeOut();
	}
});
$('#topNubex').click(function() {
	$('body,html').animate({scrollTop:0},700);
});



// youtube popup
$('a.fancy_popup').click(function () {
	$.fancybox(
	{
		'type' : 'iframe',
				// hide the related video suggestions and autoplay the video
				'href' : this.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '?rel=0&autoplay=1',
				'overlayShow' : true,
				'centerOnScroll' : true,
				'speedIn' : 100,
				'speedOut' : 50,
				'width' : 640,
				'height' : 480
			}
			);
	return false;
});


var phonesNovosibirsk = `
<div class="phones__number"><i class="phones__icon fa fa-phone"></i><a href="tel:+79134814870">+7 (913) 481 48 70</a></div>
<div class="phones__number"><a href="tel:+73832093669">+7 (383) 209-36-69</a></div>
`
var phonesBarnaul =`
<div class="phones__number"><i class="phones__icon fa fa-phone"></i><a href="tel:+79293973263">+7 (929) 397 32 63</a></div>
<div class="phones__number"><a href="tel:+73852573263">+7 (385) 257 32 63</a></div>
`

// Selecte town
$('.adress__link').click(function(e){
	e.preventDefault();
	var value = $(this).text()
	localStorage.setItem('keycity', value)
	setCity()
	$('.adress').removeClass('adress--active')
})


function setCity(){
	let town = 'Новосибирск'

	if(localStorage.getItem('keycity')){
		town = localStorage.getItem('keycity')
	}

	if(town == 'Новосибирск'){
		$('.adress__dinamik_town').text('Новосибирск')
		$('.adress__location').text('Красный проспект, 59​,  1 этаж')	
		$('.phones').html(phonesNovosibirsk)
		$('.sect-map__img').html('<img src="img/@2x/map.jpg" alt="map">')
		$('.contact-map__link').attr('src', 'img/@2x/map-big.jpg')
	} else{
		$('.adress__dinamik_town').text('Барнаул')
		$('.adress__location').text('Партизанская, 105, 1 этаж')	
		$('.phones').html(phonesBarnaul)
		$('.sect-map__img').html('<img src="img/@2x/map2.jpg" alt="map">')
		$('.contact-map__link').attr('src', 'img/@2x/map2.jpg')
	}
}
setCity()




});
