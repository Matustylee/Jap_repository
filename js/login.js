//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



    function userStorage(){
        var name = document.getElementById('Users').value;
        localStorage.setItem('userName', name);
    }





function onSignIn(googleUser) {
   // var url = "../jap_repository/home.html"
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
   //token para el backend
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
   // window.location.href = url;
  }

  function signOut(){    
    
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');     
      
    });
  
  }  