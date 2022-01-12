elements = document.getElementsByClassName('flip-card');

let myFunction = function() {
    this.classList.toggle('flipped');
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', myFunction, false);
}
