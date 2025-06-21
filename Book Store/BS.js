const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
menuIcon.addEventListener('click', function() {
  navLinks.classList.toggle('show');
});

const images = [
  { src: 'img1.png', title: 'Once Upon a Story' },
  { src: 'img2.png', title: 'Love Find The Way' },
  { src: 'img3.png', title: 'Rose' },
  { src: 'img4.png', title: 'Good Readers' },
  { src: 'img5.png', title: 'Story Books' }
  ];
  
  let currentIndex = 0;
  const sliderContainer = document.querySelector('.slider-container');
  const imageTitle = document.getElementById('image-title');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  
  function updateSlider() {
      sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`; 
      imageTitle.textContent = images[currentIndex].title;
  }
  
  rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
  });
  
  leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
  });

  document.querySelector("#contactForm").addEventListener("submit", async function(e) {e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const message = document.querySelector("#message").value;

  const response = await fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message })
  });

  const result = await response.json();
  alert(result.message);
});
  
document.querySelector("#subscribe-btn").addEventListener("click", async function() {
  const email = document.querySelector("#newsletter-email").value;

  const response = await fetch("http://localhost:3000/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const result = await response.json();
  alert(result.message);
});
