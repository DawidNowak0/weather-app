function search(){
    const location = document.querySelector('.location').value;

    if(location === ""){
        alert("Enter a location");
        return;
    };

    const str1 ='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const str2 = str1.concat(location);

    fetch(str2.concat('?unitGroup=metric&key=KVLNCPER3AFYHKHH7V37JH8T8&contentType=json'))

    .then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {

            document.querySelector("main").innerHTML += "<div>";
            document.querySelector("main").innerHTML += data.currentConditions.datetime;
            document.querySelector("main").innerHTML +=  data.resolvedAddress;
            document.querySelector("main").innerHTML +=  "<div>";

            console.log(data.alerts[0])
            console.log(data.description)
            
            document.querySelector("main").innerHTML += "<div>";
            document.querySelector("main").innerHTML += data.currentConditions.temp;
            document.querySelector("main").innerHTML += " C";
            document.querySelector("main").innerHTML += "</div>";

            document.querySelector("main").innerHTML += "<div>";
            document.querySelector("main").innerHTML += data.currentConditions.windspeed;
            document.querySelector("main").innerHTML += " Windspeed ";
            document.querySelector("main").innerHTML += data.currentConditions.uvindex;
            document.querySelector("main").innerHTML += " UV";
            document.querySelector("main").innerHTML += "</div>";

            document.querySelector("main").innerHTML += "<div>";
            document.querySelector("main").innerHTML += data.currentConditions.cloudcover;
            document.querySelector("main").innerHTML += data.currentConditions.conditions;
            document.querySelector("main").innerHTML += "</div>";
            
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
    document.querySelector("main").classList.add("foreCast");
    document.querySelector("main").innerHTML = '<img src="logo.png" alt="" class="logo">';
};
