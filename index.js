function search(){
    const location = document.querySelector('.location').value;

    const fetchPromise = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=KVLNCPER3AFYHKHH7V37JH8T8&contentType=json');

    fetchPromise.then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
            console.log(data.address);

            console.log('');
            console.log('currentConditions');

            console.log(data.currentConditions.cloudcover);
            console.log(data.currentConditions.conditions);
            console.log(data.currentConditions.datetime);
            console.log(data.currentConditions.temp);
            console.log(data.currentConditions.uvindex);
            console.log(data.currentConditions.windspeed);

            for(let i = 0; i < 15; i++){
                console.log('');
                console.log('days', i+1);

                console.log(data.days[i].cloudcover);
                console.log(data.days[i].conditions);
                console.log(data.days[i].datetime);
                console.log(data.days[i].temp);
                console.log(data.days[i].uvindex);
                console.log(data.days[i].windspeed);
            };
        });
    });
}