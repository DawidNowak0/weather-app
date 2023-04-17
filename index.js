function search(){
    const location = document.querySelector('#location').value;
    const apiKey = "KVLNCPER3AFYHKHH7V37JH8T8";

    if(location === ""){
        alert("Enter a location");
        return;
    };

    const apiRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    fetch(apiRequest)
    .then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
            document.querySelector("#date").innerText += data.currentConditions.datetime;
            document.querySelector("#date").innerText +=  data.resolvedAddress;

            console.log(data.alerts[0])
            console.log(data.description)
            
            document.querySelector("#temp").innerText += data.currentConditions.temp;
            document.querySelector("#temp").innerText += " C";

            document.querySelector("#wind").innerText += data.currentConditions.windspeed;
            document.querySelector("#wind").innerText += " Windspeed";
            document.querySelector("#wind").innerText += data.currentConditions.uvindex;
            document.querySelector("#wind").innerText += " UV";

            document.querySelector("#cloud").innerText += data.currentConditions.cloudcover;
            document.querySelector("#cloud").innerText += data.currentConditions.conditions;
            
            for(let i = 0; i < 15; i++){
                console.log('')
                console.log('day', i+1)

                console.log(data.days[i].cloudcover)
                console.log(data.days[i].conditions)
                console.log(data.days[i].datetime)
                console.log(data.days[i].temp)
                console.log(data.days[i].uvindex)
                console.log(data.days[i].windspeed)
            };
        });
    });
    document.querySelector("main").innerHTML ='<img src="logo.svg" alt=""><div class="foreCast"></div>';
    document.querySelector(".foreCast").innerHTML ='<div id="date"></div><div id="temp"></div><div id="wind"></div><div id="cloud"></div>';
};
