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
            console.log(data.resolvedAddress)

            console.log('')
            console.log('currentConditions')

            console.log(data.alerts[0])
            console.log(data.description)
            

            console.log(data.currentConditions.cloudcover)
            console.log(data.currentConditions.conditions)
            console.log(data.currentConditions.datetime)
            console.log(data.currentConditions.temp)
            console.log(data.currentConditions.uvindex)
            console.log(data.currentConditions.windspeed)

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

    document.querySelector("main").innerHTML = '<img src="logo.png" alt="" class="logo">';
};
