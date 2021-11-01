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
   <a class="dropdown-item" href="cart.html"><i class='fas fa-shopping-cart'></i> Mi Carrito <span class="badge badge-success" >${JSON.parse(localStorage.getItem("cantidadCarrito"))}</span></a>
   <a class="dropdown-item" href="my-profile.html"><i class='far fa-id-card'></i> Mi Perfil</a>    
    <div class="dropdown-divider"></div>
 <a class="dropdown-item" id="exit" onclick="salir()" href="../jap_repository/index.html"><i class="fa fa-sign-out-alt"></i> Cerrar Sesion</a>
 
</div>`
}

   
});

function salir() {
  var url = "../jap_repository/index.html"
  localStorage.removeItem('userName');
  window.location.href = url;
};

function Fotoanterior() {
  let imgdefault = document.getElementById('userimage');
  let file    = document.querySelector('input[type=file]').files[0];
  let reader  = new FileReader();

  reader.onloadend = function () {
    imgdefault.src = reader.result;    
    
  }

  if (file) {
    reader.readAsDataURL(file);
   
  } else {
    imgdefault.src = "img/face_icon.jpg";
  }
}

function guardar() {
  let imgdefault = document.getElementById('userimage');
  let perfil = {};

  perfil.nombre = document.getElementById('nombres').value 
  perfil.apellidos = document.getElementById('apellidos').value
  perfil.edad = document.getElementById('edad').value
  perfil.email = document.getElementById('email').value
  perfil.telefono = document.getElementById('telefono').value 
  perfil.imagen = imgdefault.src

  localStorage.setItem('usuario', JSON.stringify(perfil));

  Swal.fire({
    icon: 'success',
    title: "Perfil Guardado"
  })

}


/* convertir una imagen para guardar en local storge*//*
function convertir(img) {
  img.crossOrigin="anonymous";
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var contexto = canvas.getContext("2d");
  contexto.drawImage(img, 0, 0,img.width, img.height);
  var dataURL = canvas.toDataURL("image/jpeg");
  return dataURL;
} */


document.addEventListener('DOMContentLoaded',()=>{
  let imgdefault = document.getElementById('userimage');
  let perfil = JSON.parse(localStorage.getItem('usuario'));
 
 
  if (perfil != null){
      
    document.getElementById('nombres').value = perfil.nombre;
    document.getElementById('apellidos').value = perfil.apellidos;
    document.getElementById('email').value = perfil.email;
    document.getElementById('telefono').value = perfil.telefono;
    document.getElementById('edad').value= perfil.edad;
    imgdefault.src = perfil.imagen;

  }else {
    imgdefault.src = "img/face_icon.jpg";
  }
    
})