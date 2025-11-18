window.addEventListener('DOMContentLoaded', () => {
    let princial= 0;
    const slide = document.getElementById('slideContainer');
    const totalSlides = slide.children.length;
    function updateSlide(){
      slide.style.transform = `translateX(-${princial * 100}%)`;
    }
    setInterval(()=>{
      princial = (princial + 1)% totalSlides;
      updateSlide();
    },2000);
  }); 


  // lovely