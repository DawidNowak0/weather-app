function search(){
    const location = document.querySelector('#location').value;
    const unit = document.querySelector('#unit').value;
    const apiKey = "KVLNCPER3AFYHKHH7V37JH8T8";
    const apiRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`;

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
        forecast(res);
    });

    document.querySelector("main").innerHTML = '<img src="logo.svg" alt=""><div class="forecast"></div>';
    document.querySelector(".forecast").innerHTML = '<div class="aa"><div id="date"></div><div id="adress"></div></div><div class="aa"><div id="temp"></div></div><div class="aa"><div id="wind"></div><div id="uv"></div></div><div class="aa"><div id="cloud"></div></div>';
};

function forecast(res){
    document.querySelector("#date").innerText += res.currentConditions.datetime;
    document.querySelector("#adress").innerText +=  res.resolvedAddress;

    console.log(res.alerts[0])
    console.log(res.description)

    document.querySelector("#temp").innerText += res.currentConditions.temp;
    document.querySelector("#temp").innerText += " C/F";

    document.querySelector("#wind").innerText += res.currentConditions.windspeed;
    document.querySelector("#wind").innerText += " Windspeed";
    document.querySelector("#uv").innerText += res.currentConditions.uvindex;
    document.querySelector("#uv").innerText += " UV";

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
};
