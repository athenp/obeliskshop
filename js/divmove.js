var speed = 10;
var direction = 1;

var boxElement = document.getElementById('box');

if (boxElement) {
    boxElement.addEventListener('mouseover', function () {
        // Calculate and store some of the box coordinates:
        var boxLeftPos = boxElement.offsetLeft,
        boxRightPos = boxLeftPos + boxElement.offsetWidth;
        // When right side of the box goes too far - change direction:
        if (boxRightPos > document.body.offsetWidth) {
            direction = -1;
        }
        // When left side of the box goes too far - change direction:
        if (boxLeftPos < 0) {
            direction = 1;
        }
        // Recalculate position:
        boxElement.style.left = (boxLeftPos + speed * direction) + 'px';
    });
}
