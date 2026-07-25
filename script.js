document.getElementById('carSelect').addEventListener('change', function() {
  var carName = this.value;
  var whatsappLink = document.getElementById('whatsappLink');
  
  if(carName) {
    var message = "Hi TINTX, I want to order Window Shades for " + carName;
    var encodedMessage = encodeURIComponent(message);
    whatsappLink.href = "https://wa.me/923112205795?text=" + encodedMessage;
    whatsappLink.style.pointerEvents = "auto";
    whatsappLink.style.opacity = "1";
  } else {
    whatsappLink.href = "#";
    whatsappLink.style.pointerEvents = "none";
    whatsappLink.style.opacity = "0.5";
  }
});
