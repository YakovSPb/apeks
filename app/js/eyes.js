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

