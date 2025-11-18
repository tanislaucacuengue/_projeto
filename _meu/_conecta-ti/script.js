//Mostrar ou ocutar o menu mobile
function toggleMenu(){
    const nav = document.getElementById("nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex" ;
}

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

  email = querySelector(".email")
  senha = querySelector(".senha")
  login = querySelector(".logar")
  if (email == tanislaucacuengue && senha == 12345678) {
    login.addEventListener("click", ()=>{
      window.location.href = ("index.html")
    })
  }