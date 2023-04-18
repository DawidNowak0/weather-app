function search(){
    const location = document.querySelector('#location').value;
    const apiKey = "KVLNCPER3AFYHKHH7V37JH8T8";
    const apiRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    if(location === ""){
        return alert("Enter a location");
    };

    document.querySelector("main").innerHTML ='<img src="logo.svg" alt=""><div class="foreCast"></div>';
    document.querySelector(".foreCast").innerHTML ='<div id="date"></div><div id="temp"></div><div id="wind"></div><div id="cloud"></div>';

    fetch(apiRequest)
    .then(res => {
        if(!res.ok){
            return res.text().then(text => { throw new Error(text) })
        }
        else{
            return res.json();
        }
    })
    .catch(err =>{
        alert("Enter valid location");
        console.log(err);
    })
    .then((res) =>{
        document.querySelector("#date").innerText += res.currentConditions.datetime;
        document.querySelector("#date").innerText +=  res.resolvedAddress;

        console.log(res.alerts[0])
        console.log(res.description)

        document.querySelector("#temp").innerText += res.currentConditions.temp;
        document.querySelector("#temp").innerText += " C";

        document.querySelector("#wind").innerText += res.currentConditions.windspeed;
        document.querySelector("#wind").innerText += " Windspeed";
        document.querySelector("#wind").innerText += res.currentConditions.uvindex;
        document.querySelector("#wind").innerText += " UV";

        document.querySelector("#cloud").innerText += res.currentConditions.cloudcover;
        document.querySelector("#cloud").innerText += res.currentConditions.conditions;

        for(let i = 0; i < 15; i++){
            console.log('')
            console.log('day', i+1)

            console.log(res.days[i].cloudcover)
            console.log(res.days[i].conditions)
            console.log(res.days[i].datetime)
            console.log(res.days[i].temp)
            console.log(res.days[i].uvindex)
            console.log(res.days[i].windspeed)
        };
    });
};
