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

            document.querySelector(".foreCast").innerText += data.currentConditions.datetime;
            document.querySelector(".foreCast").innerText +=  data.resolvedAddress;

            console.log(data.alerts[0])
            console.log(data.description)
            
            document.querySelector(".foreCast").innerText += data.currentConditions.temp;
            document.querySelector(".foreCast").innerText += " C";

            document.querySelector(".foreCast").innerText += data.currentConditions.windspeed;
            document.querySelector(".foreCast").innerText += " Windspeed ";
            document.querySelector(".foreCast").innerText += data.currentConditions.uvindex;
            document.querySelector(".foreCast").innerText += " UV";

            document.querySelector(".foreCast").innerText += data.currentConditions.cloudcover;
            document.querySelector(".foreCast").innerText += data.currentConditions.conditions;
            
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
};
