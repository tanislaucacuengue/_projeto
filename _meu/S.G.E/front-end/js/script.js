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


  // Mostrar botão "voltar ao topo" ao rolar
window.onscroll = function () {
    const topBtn = document.querySelector("#topBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  };
  
  // Voltar ao topo da página
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
