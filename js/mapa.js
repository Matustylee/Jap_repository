document.addEventListener('DOMContentLoaded', () => {

    var map = L.map('map').setView([-34.879625, -56.076622], 38);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.circle([-34.879625, -56.076622],{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
     } ).addTo(map)         
        .bindPopup('Nuestro Local Se encuentra Aquí')
        .openPopup();
    

        navigator.geolocation.getCurrentPosition(
            function(position){
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;               
                L.marker([latitude, longitude]).addTo(map)
               .bindPopup('Usted Se encuentra Aquí')
               .openPopup();
            },
           
        );     
        
 /*    var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }
        
        map.on('click', onMapClick);     
    */
        

})



