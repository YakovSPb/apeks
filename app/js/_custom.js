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


// Telephone Mask
$("input[type=tel").mask("8(999) 999-9999")



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

// Events
modalBtnForm.addEventListener('click', openModalSuccess);
modalBtnFormHidden.addEventListener('click', openModalSuccess);

for(var i = 0; i < homePageBtn.length; i++){
	homePageBtn[i].addEventListener('click', openModalForm)
}

sectMapBtn.addEventListener('click', openModalForm)


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
	slidesToShow: 1,
	infinite: true,
	arrows: true,
	slidesToShow: 5,
	// responsive: [
	// {
	// 	breakpoint: 1379,
	// 	settings: {
	// 		slidesToShow: 1
	// 	}
	// }
	// ]
});


//Adress town window
$('.adress__town').click(function(e){
	$(this).parent().toggleClass('adress--active');
})
$('.adress__close-btn').click(function(e){
	$(this).parent().parent().parent().toggleClass('adress--active');
})

});
