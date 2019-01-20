const Ad = require('./ad.js').Ad;
const Preferences = require('./ad.js').Preferences;

const kijiji = require("kijiji-scraper");
 


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

out = {
    Preferences : new Preferences(0,0,0,0,0,0,0,0,0,0,0),
    Ads : []
}

let options = {
    minResults: 20,
    maxResults: -1
};

let params = {
    locationId: kijiji.locations.QUEBEC.GREATER_MONTREAL.CITY_OF_MONTREAL,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
    categoryId: kijiji.categories.REAL_ESTATE.APARTMENTS_AND_CONDOS_FOR_RENT,  // 
    sortByName: "dateDesc"  // Show the cheapest listings first
};

// Scrape using returned promise
function generateAds(prefs, nbResults){

    out.Preferences = prefs;
    options.minResults = nbResults;

    return kijiji.search(params, options) 
        .then( ads => {
            return getAds(ads);
        })
        .then(function(m_ads) {
            out.Ads = m_ads;
            let json = JSON.stringify(out);
            return json;
        })
        .catch( err => console.log(err));
}

