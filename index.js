  // Clone the slider items and append them to the parent element
  let sliderItems = document.querySelectorAll('.panaroma-slider-wrapper .slider-item');
  let panaroma = document.querySelector('.panaroma-slider .panaroma');
  const centerStageElement = document.querySelector('.panaroma-slider-wrapper .cmp-carousel__center-stage');


  sliderItems.forEach(function(item) {
    let clone = item.cloneNode(true);
    panaroma.appendChild(clone);
  });

  // Add the 'cmp-carousel__item--active' class to the first child
  panaroma.querySelector('.panaroma-slider-wrapper .slider-item:first-child').classList.add('cmp-carousel__item--active');

  document.addEventListener('DOMContentLoaded', function() {
    let sliderItems = document.querySelectorAll('.owl-carousel .slider-item');
    let currentIndex = 0; // Keep track of the current slide index
    let sliderItemsLength = sliderItems.length;
    // Function to update the slider based on the current index
    function updateSlider() {
      let rorateValue = 360 / sliderItemsLength;

      sliderItems.forEach(function(element, index) {
        let rotateY = (index - currentIndex) * -(rorateValue);
        if (index === currentIndex) {
          element.style.transform = 'rotateY(0deg) translateZ(-47.25rem)';

          //element.classList.add('cmp-carousel__item--active');
        } else {
          element.style.transform = 'rotateY(' + rotateY + 'deg) translateZ(-47.25rem)';
          //element.classList.remove('cmp-carousel__item--active');
        }

      });
    }

    // Initialize the slider
    updateSlider();

    // Next button click event
    let nextButton = document.querySelector('.panaroma-slider-wrapper .cmp-carousel-accessibility-border-next-btn');
    if(nextButton){
      nextButton.addEventListener('click', function() {
        currentIndex++; // Increment the index to move to the next slide
        updateSlider();
        let activeSlide = document.querySelector('.panaroma-slider-wrapper .slider-item.cmp-carousel__item--active');
        let nextSlide = activeSlide.nextElementSibling;
        if (!nextSlide) {
          nextSlide = document.querySelector('.panaroma-slider-wrapper .slider-item:first-child');
        }
        activeSlide.classList.remove('cmp-carousel__item--active');
        nextSlide.classList.add('cmp-carousel__item--active');
        // Find the '.cmp-bp-card__details' element within the active slider item
        const cardDetails = activeSlide.querySelector('.cmp-bp-card__details');
        // Find the first anchor element within the '.cmp-bp-card__details' element and get its 'href' attribute
        const cardHrefElement = cardDetails.querySelector('a');
        const cardHref = cardHrefElement.getAttribute('href');
        // Find the element with class 'cmp-carousel__center-stage' and set its 'href' attribute
        centerStageElement.setAttribute('href', cardHref);
      });
    }

    // Previous button click event (if needed)
    let previousButton = document.querySelector('.panaroma-slider-wrapper .cmp-carousel-accessibility-border-previous-btn');
    if (previousButton) {
      previousButton.addEventListener('click', function() {
        currentIndex--; // Decrement the index to move to the previous slide 
        updateSlider();
        let activeSlide = document.querySelector('.panaroma-slider-wrapper .slider-item.cmp-carousel__item--active');
        let previousSlide = activeSlide.previousElementSibling;

        if (!previousSlide) {
          previousSlide = document.querySelector('.panaroma-slider-wrapper .slider-item:last-child');
        }

        activeSlide.classList.remove('cmp-carousel__item--active');
        previousSlide.classList.add('cmp-carousel__item--active');
        const cardDetails = activeSlide.querySelector('.cmp-bp-card__details');
        // Find the first anchor element within the '.cmp-bp-card__details' element and get its 'href' attribute
        const cardHrefElement = cardDetails.querySelector('a');
        const cardHref = cardHrefElement.getAttribute('href');
        centerStageElement.setAttribute('href', cardHref);
      });
    }

  });


  const card = document.querySelector('.panaroma-slider-wrapper a.cmp-carousel__center-stage');
  const exploreBtn = document.querySelector('.panaroma-slider-wrapper .cmp-carousel__explore-btn');
  if(card!==null){
    card.addEventListener('mousemove', (event) => {
      // Move the button with the cursor
      const x = event.clientX - card.getBoundingClientRect().left;
      const y = event.clientY - card.getBoundingClientRect().top;

      // Center the button under the cursor
      const buttonWidth = exploreBtn.offsetWidth;
      exploreBtn.style.transform = `translate(${x - buttonWidth / 2}px, ${y}px)`;
    });
    // Add a click event listener to the .cmp-carousel__center-stage element
    card.addEventListener('click', function() {
      const activeSliderItem = panaroma.querySelector('.slider-item.cmp-carousel__item--active');

      // Find the '.cmp-bp-card__details' element within the active slider item
      const cardDetails = activeSliderItem.querySelector('.cmp-bp-card__details');

      // Find the first anchor element within the '.cmp-bp-card__details' element and get its 'href' attribute
      const cardHrefElement = cardDetails.querySelector('a');
      const cardHref = cardHrefElement.getAttribute('href');

      // Set the 'href' attribute of .cmp-carousel__center-stage
      centerStageElement.setAttribute('href', cardHref);
      // Adding style to explore button
      card.classList.add('overlay');
      //e.preventDefault();
      // Delay the redirection for 1000 milliseconds (1 second)
      setTimeout(function() {
        // Redirect to the URL specified in the 'href' attribute after the delay
        window.location.href = cardHref;
      },3000); // Adjust the delay time as needed
    });
  }
