function search(){
    const location = document.querySelector('#location').value;
    let unitGroup = document.querySelector('#unit').value;
    const apiKey = "KVLNCPER3AFYHKHH7V37JH8T8";
    const apiRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;

    if(unitGroup === 'metric'){
        unit = ["C", "km/h"];
    }
    else{
        unit = ["F", "MPH"];
    };
    
    fetch(apiRequest)
    .then(res => {
        return res.json();
    })
    .catch(err =>{
        console.log(err);
        document.querySelector('main').innerHTML = '<img src="logo.svg" alt="" class="logo"><form><label for="location"><h2>Enter a valid location!</h2></label><select id="unit"><option value="metric">Metric</option><option value="us">US</option></select><div class="search"><input type="text" id="location"><button onclick="search()">Search</button></div></form>'
    })
    .then((res) =>{
        shortTermForecast(res, unit);
    });

    document.querySelector("main").innerHTML = '<img src="logo.svg" alt=""><div class="forecast"></div>';
};

function shortTermForecast(res, unit){
    document.querySelector("main").innerHTML = '<img src="logo.svg" alt=""><div class="forecast"></div>';
    document.querySelector(".forecast").innerHTML = '<div ><div id="date"></div><div id="adress"></div></div><div><div id="temp"></div></div><div><div id="wind"></div><div id="uv"></div></div><div><div id="cloud"></div></div><h2>Show long-term forecast</h2>';


    document.querySelector("#date").innerText += res.currentConditions.datetime;
    document.querySelector("#adress").innerText +=  res.resolvedAddress;

    console.log(res.alerts[0])
    console.log(res.description)

    document.querySelector("#temp").innerText += res.currentConditions.temp;
    document.querySelector("#temp").innerText += ` ${unit[0]}`;

    document.querySelector("#wind").innerText += " Windspeed";
    document.querySelector("#wind").innerText += ` ${res.currentConditions.windspeed} ${unit[1]}`;
    document.querySelector("#uv").innerText += res.currentConditions.uvindex;
    document.querySelector("#uv").innerText += " UV";

    document.querySelector("#cloud").innerText += res.currentConditions.cloudcover;
    document.querySelector("#cloud").innerText += res.currentConditions.conditions;

    document.querySelector('h2').addEventListener("click", () =>{
        longTermForecast(res, unit);
    });
};

function longTermForecast(res, unit){
    document.querySelector("main").innerHTML = '<img src="logo.svg" alt=""><div class="forecast"><h2>Show short-term forecast</h2></div>';

    for(let i = 0; i < 15; i++){
        document.querySelector('main').innerHTML += `<div id='day${i+1}' class='days'></div>`;
        document.querySelector(`#day${i+1}`).innerHTML += `<h3>Day ${i+1}</h3><div>${res.days[i].datetime}</div><div>${res.days[i].temp} ${unit[0]}</div><div>Windspeed ${res.days[i].windspeed} ${unit[1]}</div><div>${res.days[i].uvindex} UV</div><div>${res.days[i].cloudcover}</div><div id='conditions'>${res.days[i].conditions}</div>`;
    };

    document.querySelector('h2').addEventListener("click", () =>{
        shortTermForecast(res, unit);
    });
};
