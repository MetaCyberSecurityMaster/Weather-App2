window.addEventListener('load', () => {
    let long;
    let lat;
    let imageURL;
    let tempDescription = document.getElementById('description');
    let tempDegree = document.getElementById('temp');
    let city = document.getElementById('city-name');
    let forecast = document.getElementById('forecast');
  
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
  
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=62c8b80583e1d3c6ec21b785d4d8f9df&units=metric`;
        fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          console.log(data);
          const {temp} = data.main;
          const {description, icon} = data.weather[0];
          const cityName = data.name;
          
          imageURL = `https://openweathermap.org/img/w/${icon}.png`;
  
          tempDegree.textContent = Math.round(temp);
          tempDescription.textContent = description;
          city.textContent = cityName;
  
          forecast.innerText = `${description} for the day.`;
  
          document.getElementById('icon').setAttribute('src', imageURL);
        }).catch(error => {
          alert("Error Occurred - " + error.message)
        })
  
      });
  
    } else {
      alert('Please enable location access to use the app');
    }
  
  });