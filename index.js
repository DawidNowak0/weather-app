function search(){
    const location = document.querySelector('#location').value;
    let unit = document.querySelector('#unit').value;
    const apiKey = "KVLNCPER3AFYHKHH7V37JH8T8";
    const apiRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`;

    if(unit === 'metric'){
        unit = 'C';
    }
    else{
        unit = 'F';
    };
    
    fetch(apiRequest)
    .then(res => {
        if(!res.ok){
            return res.text().then(text => {throw new Error(text)})
        }
        else{
            return res.json();
        }
    })
    .catch(err =>{
        console.log(err);
        document.querySelector('main').innerHTML = '<img src="logo.svg" alt="" class="logo"><form><label for="location"><h2>Enter a valid location!</h2></label><select id="unit"><option value="metric">Metric</option><option value="us">US</option></select><div class="search"><input type="text" id="location"><button onclick="search()">Search</button></div></form>'
    })
    .then((res) =>{
        shortTermForecast(res, unit);
    });

    document.querySelector("main").innerHTML = '<img src="logo.svg" alt=""><div class="forecast"></div>';
    document.querySelector(".forecast").innerHTML = '<div class="aa"><div id="date"></div><div id="adress"></div></div><div class="aa"><div id="temp"></div></div><div class="aa"><div id="wind"></div><div id="uv"></div></div><div class="aa"><div id="cloud"></div></div><h2>Show long-term forecast</h2>';
};

function shortTermForecast(res, unit){
    document.querySelector("#date").innerText += res.currentConditions.datetime;
    document.querySelector("#adress").innerText +=  res.resolvedAddress;

    console.log(res.alerts[0])
    console.log(res.description)

    document.querySelector("#temp").innerText += res.currentConditions.temp;
    document.querySelector("#temp").innerText += ` ${unit}`;

    document.querySelector("#wind").innerText += res.currentConditions.windspeed;
    document.querySelector("#wind").innerText += " Windspeed";
    document.querySelector("#uv").innerText += res.currentConditions.uvindex;
    document.querySelector("#uv").innerText += " UV";

    document.querySelector("#cloud").innerText += res.currentConditions.cloudcover;
    document.querySelector("#cloud").innerText += res.currentConditions.conditions;

    document.querySelector('h2').addEventListener("click", () =>{
        longTermForecast(res, unit);
    });
};

function longTermForecast(res, unit){
    document.querySelector(".forecast").innerHTML = '';

    for(let i = 0; i < 15; i++){
        document.querySelector('main').innerHTML += `<h2>Day ${i+1}</h2><div>${res.days[i].datetime}</div><div>${res.days[i].temp} ${unit}</div><div>${res.days[i].windspeed} Windspeed</div><div>${res.days[i].uvindex} UV</div><div>${res.days[i].cloudcover}</div><div>${res.days[i].conditions}</div>`;
    };
};
