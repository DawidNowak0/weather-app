function search(){
    const location = document.querySelector('.location').value;

    const fetchPromise = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=KVLNCPER3AFYHKHH7V37JH8T8&contentType=json');

    fetchPromise.then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
            console.log(data.address)
        });
    });
}