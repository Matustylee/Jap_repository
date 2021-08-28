//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    var url = "../jap_repository/index.html"
   if(localStorage.getItem('userName') == null){
     alert("Debe iniciar sesion para continuar");
     window.location.href = url;
   }else{ document.getElementById('saludo').innerHTML = "<h6>Bienvenido/a: " + localStorage.getItem('userName') + " !!<i class='far fa-user-circle' style='font-size:21px'></i> </h6>";}
});

//document.getElementById('saludo').innerHTML = "Hola, " + localStorage.getItem('userName')+"!!";}


document.getElementById("exit").addEventListener("click", function(){
    localStorage.removeItem('userName');
});


