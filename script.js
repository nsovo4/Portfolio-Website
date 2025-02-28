document.querySelector('.profile-container').addEventListener('click', function() {
  this.classList.toggle('flipped');
  document.body.classList.toggle('overlay-active');
}); 