const Ad = require('./ad.js').Ad;
const Preferences = require('./ad.js').Preferences;

const kijiji = require("kijiji-scraper");
 
let options = {
    minResults: 20,
    maxResults: -1
};

let params = {
    locationId: kijiji.locations.QUEBEC.GREATER_MONTREAL.CITY_OF_MONTREAL,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
    categoryId: kijiji.categories.REAL_ESTATE.APARTMENTS_AND_CONDOS_FOR_RENT,  // 
    sortByName: "dateDesc"  // Show the cheapest listings first
};

function getAds(ads){
    let m_ads = new Array();

    for (let i = 0; i < ads.length; i++) {
        console.log(ads[i].attributes.type);
        if(ads[i].attributes.type == "OFFER"){
            m_ads.push(new Ad(i,ads[i].title, ads[i].image, ads[i].attributes.location.latitude, ads[i].attributes.location.longitude, ads[i].url, ads[i].attributes.price));
        }
    }

    return m_ads;
}

let prefs = new Preferences(1,2,3,4,2,1,1,2,1,1,1);

out={
    Preferences : prefs,
    Ads : []
}

// Scrape using returned promise
kijiji.search(params, options) 
    .then( ads => {
        return getAds(ads);
    })
    .then(function(m_ads){
        out.Ads = m_ads;
        let json = JSON.stringify(out,null,"   ");
        console.log(json);
        console.log('OFFER : ' + m_ads.length);
    })
    .catch( err => console.log(err));


