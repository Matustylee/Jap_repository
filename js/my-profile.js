//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const perfilUser = document.getElementById('saludo');


document.addEventListener("DOMContentLoaded", function (e) {
    var url = "../jap_repository/index.html"
   if(JSON.parse(localStorage.getItem("userName")) == null){
     alert("Debe iniciar sesion para continuar");
     window.location.href = url;
   }else{ perfilUser.innerHTML =
   `<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> `
   + JSON.parse(localStorage.getItem("userName")) + 
  `  </a><div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="my-profile.html"><i class='far fa-id-card'></i> Mi Perfil</a>
     <div class="dropdown-divider"></div>
  <a class="dropdown-item" id="exit" onclick="salir()" href="../jap_repository/index.html">Cerrar Sesion</a>
  
</div>`;}
});




function salir() {
  localStorage.removeItem('userName');
};


