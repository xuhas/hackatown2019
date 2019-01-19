const kijiji = require("kijiji-scraper");
 
let options = {
    minResults: 1000,
    maxResults: 900
};
 
let params = {
    locationId: kijiji.locations.QUEBEC.GREATER_MONTREAL,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
    categoryId: kijiji.categories.REAL_ESTATE,  // Same as kijiji.categories.CARS_AND_VEHICLES
    sortByName: "priceAsc"  // Show the cheapest listings first
};
 
// Scrape using returned promise
kijiji.search(params, options).then(function(ads) {
    // Use the ads array
    let i = 0
    for (; i < ads.length; ++i) {
        console.log(ads[i].title);
    }
    console.log('fuigdhfkhdfhgdfhigif : ' + i);
}).catch(console.error);
 
// Scrape using optional callback parameter
function callback(err, ads) {
    if (!err) {
        let i = 0
        // Use the ads array
        for (; i < ads.length; ++i) {
            console.log(ads[i]);
            console.log ('\n //////////////////////////');
        }

        console.log('fuigdhfkhdfhgdfhigif : ' + i);
    }
}
kijiji.search(params, options);