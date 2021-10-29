document.addEventListener('DOMContentLoaded', () => {

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var marker = L.marker([51.5, -0.09]).addTo(map)
.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
.openPopup();

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

})
