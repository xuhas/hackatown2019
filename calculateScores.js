
'use strict'
let request = require('request-promise');
let stm = require('./stm/stm_arrets').features;
let schools = require('./schools/schools');
let googlekey = "AIzaSyB-5jEijHBRF9jWO9cmEwO9C99qVFkGo0U";
let cliniaSearch = 'https://api.clinia.ca/search/v1/search';
let cliniaToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3NjEzMzRkODgzNWE5MDQyOWU3ZTc0ODliMjMzNjU3IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NDc5MDQ5NTksImV4cCI6MTU0ODE2NDE1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MDAwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NzAwMC9yZXNvdXJjZXMiLCJjYXRhbG9nIiwic2VhcmNoIiwic3BlY2lhbGl0eSJdLCJjbGllbnRfaWQiOiJoYWNrYXRvd24iLCJzY29wZSI6WyJjYXRhbG9nIiwic2VhcmNoIiwic3BlY2lhbGl0eSJdfQ.hgPQEZYVu1S3uK6fySM05GJ-ivwMX4DahbnKNXHz2W5R9pdRWQIdUD6Xnq2kMnScSiAiUtSYXvR1DZTcyfHlHj_jGtOLeGGEHqwbcpBbdiYSmO0Ap7YvuPTJwmd87seS6roZX2h5Q2g4Rk7B1JDeQIk8g8WHdn6jDameb8Abl0aH22At6ZfQY9nc6r6KassM_KaYLoSyT2aPIJJ7jOfED6xks2NCqeFBW9e5ITRqCScWmAteCRBhkHfOWuBZKZH0tMzh54lGEpPmbRLc4xnsoqmIKNN4aVtezmP5G_zv-cZQzzZuojHg2xexW0GqykyrLvbXFLbPcMf1INQw_sELow';

/// ADJUST
let transportTreshold = 1;
let schoolTreshold = 2;
let universityTreshold = 20;
let dentistTreshold = 10;
let hospitalTreshold = 10;
let clinicTreshold = 5;
let restaurantTreshold = 5;
let barTreshold = 1;

let o = {
    latitude: 45.5016889,
    longitude: -73.567256
}
let a = {
    latitude: 45.7896889,
    longitude: -73.564256
}
getPonderatedScores([{"Preferences":{},"Ads":[{"id":1,"title":"Haut de triplex Cartierville Gouin coin lacadie bord de l’eau ","thumbnail":"https://i.ebayimg.com/00/s/MTYwMFgxMjAx/z/MGoAAOSw8VtcRKMh/$_35.JPG","coordinates":{"latitude":45.5430116,"longitude":-73.7033344},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/haut-de-triplex-cartierville-gouin-coin-lacadie-bord-de-l-eau/1410677466","price":1000},{"id":2,"title":"Cession de bail: 3 1/2, tout inclus","thumbnail":"https://i.ebayimg.com/00/s/NjAwWDgwMA==/z/15IAAOSwvwRcRKLG/$_35.JPG","coordinates":{"latitude":45.5492856,"longitude":-73.5780568},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/cession-de-bail:-3-1-2-tout-inclus/1410677259","price":665},{"id":3,"title":"Logement 4 1/2 a louer - St-Leonard","thumbnail":"https://i.ebayimg.com/00/s/NjAwWDgwMA==/z/o8gAAOSwvEhcRKKG/$_35.JPG","coordinates":{"latitude":45.5827113,"longitude":-73.58440399999999},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/logement-4-1-2-a-louer-st-leonard/1410676738","price":850},{"id":5,"title":"Grand 3 1/2 dans le coeur de \"La Petite Italie\" Montreal","thumbnail":"https://i.ebayimg.com/00/s/NzIwWDcyMA==/z/qPMAAOSwxJ9cRKEA/$_35.JPG","coordinates":{"latitude":45.5311694,"longitude":-73.6088838},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/grand-3-1-2-dans-le-coeur-de-la-petite-italie-montreal/1410675324","price":895},
{"id":6,"title":"5 1/2  dans le mile-end, plateau mt-royal","thumbnail":"https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/89UAAOSwH1pcLRtl/$_35.JPG","coordinates":{"latitude":45.5236269,"longitude":-73.5973884},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/5-1-2-dans-le-mile-end-plateau-mt-royal/1407118619","price":1500},{"id":8,"title":"McGill Ghetto 1 Bedroom Fully Furnished And All Included Apt.","thumbnail":"https://i.ebayimg.com/00/s/NTMzWDgwMA==/z/cKkAAOSwXINcRJ9v/$_35.JPG","coordinates":{"latitude":45.5094045,"longitude":-73.5769445},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/mcgill-ghetto-1-bedroom-fully-furnished-and-all-included-apt/1410673434","price":1500},{"id":10,"title":"Plateau - condo rénové - mars - meublé - chambre + bureau ","thumbnail":"https://i.ebayimg.com/00/s/NTM0WDgwMA==/z/H80AAOSwfgNcRJm6/$_35.JPG","coordinates":{"latitude":45.50169,"longitude":-73.56725},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/plateau-condo-renove-mars-meuble-chambre-bureau/1410668002","price":1200},{"id":11,"title":"Luxury Condo 2 bedrooms 4 1/2 .New Building New 6 Appliances","thumbnail":"https://i.ebayimg.com/00/s/NjEwWDgwMA==/z/XOEAAOSwYTtcRJ8g/$_35.JPG","coordinates":{"latitude":45.4703683,"longitude":-73.592959},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/luxury-condo-2-bedrooms-4-1-2-new-building-new-6-appliances/1410673227","price":1550},{"id":12,"title":"NEWLY renovated 5 1/2 in heart of mile end","thumbnail":"https://i.ebayimg.com/00/s/MTYwMFgxMjAx/z/DgwAAOSwew9cRJ7N/$_35.JPG","coordinates":{"latitude":45.52592509999999,"longitude":-73.5994946},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/newly-renovated-5-1-2-in-heart-of-mile-end/1410672902","price":1850},{"id":13,"title":"Spacious 3 1/2 in the heart of \"Little Italy\" Montreal","thumbnail":"https://i.ebayimg.com/00/s/NzIwWDcyMA==/z/YnoAAOSwRGhcRJ4J/$_35.JPG","coordinates":{"latitude":45.5311694,"longitude":-73.6088838},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/spacious-3-1-2-in-the-heart-of-little-italy-montreal/1410672485","price":895},{"id":14,"title":"ÉCHANGE/ SWAP TRÈS GRAND 4 1/2 METRO LIONEL GROULX","thumbnail":"https://i.ebayimg.com/00/s/NjQwWDk2MA==/z/ZZsAAOSwAaxcRJrl/$_35.JPG","coordinates":{"latitude":45.4810238,"longitude":-73.5786978},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/echange-swap-tres-grand-4-1-2-metro-lionel-groulx/1410671981","price":0},{"id":15,"title":"Condo 2 ch. fermées sur la place Valois (Homa) - 1er avril","thumbnail":"https://i.ebayimg.com/00/s/NjAwWDgwMA==/z/F6IAAOSw~rhcRJqz/$_35.JPG","coordinates":{"latitude":45.5480181,"longitude":-73.5437661},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/condo-2-ch-fermees-sur-la-place-valois-homa-1er-avril/1410670623","price":1230},{"id":16,"title":"1 1/2 -- Confort et sécurité B1","thumbnail":"https://i.ebayimg.com/00/s/NzY4WDExNTI=/z/SUQAAOSwohVcRI8B/$_35.JPG","coordinates":{"latitude":45.519805,"longitude":-73.58155959999999},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/1-1-2-confort-et-securite-b1/1410658919","price":1195},{"id":17,"title":"Loft meublé 1500$/mois près du métro Place des Arts","thumbnail":"https://i.ebayimg.com/00/s/NDI2WDY0MA==/z/CFgAAOSwCNlcRJwT/$_35.JPG","coordinates":{"latitude":45.50448,"longitude":-73.56654},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/loft-meuble-1500-mois-pres-du-metro-place-des-arts/1410670257","price":1500},{"id":19,"title":"2 ½ 3 ½ 4 ½ 5 ½  Appartements, apartment, Montréal","thumbnail":"https://i.ebayimg.com/00/s/Mzk4WDYwMA==/z/nwEAAOSwSK1bBhQN/$_35.JPG","coordinates":{"latitude":45.4553216,"longitude":-73.640805},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/2-3-4-5-appartements-apartment-montreal/1330627182","price":0},{"id":20,"title":"2 1/2 FEVRIER OU MARS","thumbnail":null,"coordinates":{"latitude":45.5868704,"longitude":-73.54102519999999},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/2-1-2-fevrier-ou-mars/1410669671","price":590},{"id":21,"title":"Rosement 3 1/2 chauffé","thumbnail":"https://i.ebayimg.com/00/s/NDUwWDgwMA==/z/IvoAAOSw4zdcRJrY/$_35.JPG","coordinates":{"latitude":45.5784451,"longitude":-73.5752582},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/rosement-3-1-2-chauffe/1410669536","price":630},{"id":22,"title":"Grand logement entièrement rénover","thumbnail":"https://i.ebayimg.com/00/s/ODAwWDQ1MA==/z/bO0AAOSw5cZcRJnc/$_35.JPG","coordinates":{"latitude":45.4997283,"longitude":-73.64919069999999},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/grand-logement-entierement-renover/1410669199","price":1300},{"id":23,"title":"Association des propriétaires du Québec","thumbnail":"https://i.ebayimg.com/00/s/NTAwWDUwMA==/z/UkAAAOSwKc1cRI8t/$_35.JPG","coordinates":{"latitude":45.5504065,"longitude":-73.6715464},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/association-des-proprietaires-du-quebec/1410659049","price":0},{"id":24,"title":"Association des propriétaires du Québec","thumbnail":"https://i.ebayimg.com/00/s/NTAwWDUwMA==/z/43oAAOSwaSVcRI8s/$_35.JPG","coordinates":{"latitude":45.5504065,"longitude":-73.6715464},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/association-des-proprietaires-du-quebec/1410659043","price":0},{"id":25,"title":"Grand 4 1/2 Saint-Laurent (métro Du Collège)","thumbnail":"https://i.ebayimg.com/00/s/ODAwWDYwMA==/z/p1QAAOSwCgtcRJqA/$_35.JPG","coordinates":{"latitude":45.5048743,"longitude":-73.6780781},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/grand-4-1-2-saint-laurent-metro-du-college/1410668882","price":995},{"id":26,"title":"6 condos 3 1/2 complètement rénovés à Ville-Émard","thumbnail":"https://i.ebayimg.com/00/s/ODAwWDYwMA==/z/OZcAAOSwLr1cRJnb/$_35.JPG","coordinates":{"latitude":45.4567232,"longitude":-73.5971058},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/6-condos-3-1-2-completement-renoves-a-ville-emard/1410668405","price":975},{"id":27,"title":"2 ½ 3 ½ 4 ½ 5 ½  Appartements, apartment, Montréal","thumbnail":"https://i.ebayimg.com/00/s/Mzk4WDYwMA==/z/5NoAAOSw4Q5bBhQN/$_35.JPG","coordinates":{"latitude":45.4553216,"longitude":-73.640805},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/2-3-4-5-appartements-apartment-montreal/1330627183","price":0},
{"id":28,"title":"Appartement Condo. 4 1/2. Ville Saint Laurent. Tours Bois Franc.","thumbnail":"https://i.ebayimg.com/00/s/NTM0WDgwMA==/z/5IoAAOSw5-hb9yVB/$_35.JPG","coordinates":{"latitude":45.5088494,"longitude":-73.6970699},"url":"https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/appartement-condo-4-1-2-ville-saint-laurent-tours-bois-franc/1396301378","price":1550}]}], 
{
    "transport":{
        'bus': 2,
        'metro':2
    },
    'health': {
        'dentist': 4,
        'hospital': 2,
        'clinic': 3
    },
    'commerce': {
        'entertainment':2,
        'restaurant': 2,
        'grocery':3
    },
    'education': {
        'university': 3,
        'primary': 4,
        'secondary':2
    }
})
.then(res => console.log(JSON.stringify(res)));

function getPonderatedScores(arr, prefs) {
    let maxScore = o;
    return getGlobalScore(arr)
        .then(res => {
            res.forEach(n => {
                n.scoreTransport = n.scoreTransport * prefs.transports;
                n.scoreSchool = n.scoreSchool * (prefs.education.primary + prefs.education.secondary);
                n.scoreUniversity = n.scoreUniversity * prefs.education.university;
                n.scoreDentist = n.scoreDentist * prefs.health.dentist;
                n.scoreHospital = n.scoreHospital * prefs.health.hospital;
                n.scoreClinic = n.scoreClinic * prefs.health.clinic;
                n.scoreRestaurant = n.scoreRestaurant * (prefs.commerce.restaurant + prefs.commerce.grocery);
                n.scoreBar = n.scoreBar * prefs.commerce.entertainment;
                n.globalScore = n.scoreTransport + n.scoreSchool + n.scoreUniversity + n.scoreDentist + n.scoreHospital + n.scoreClinic + n.scoreRestaurant + n.scoreBar;

                if (n.globalScore > maxScore) maxScore = n.globalScore;
            });
            // normalize
            res.forEach(n => {
                n.globalScore / maxScore;
            });

            // sort
            res.sort((a, b) => {
                return a.globalScore - b.globalScore;
            });

            // crop
            return res.slice(0, 20);
        });
}


function getGlobalScore(arr) {
    // array should be of 20 approx

    // TRANSPORT
    // compute score for transport
    arr.forEach(n => {
        let t = calculateProximityTransport(n);
        n.scoreTransport = t;
    });

    // EDUCATION
    let promises = [];
    // schools
    arr.forEach(n => {
        promises.push(
            new Promise((resolve, reject) => {
                getProximitySchool(n, schoolTreshold)
                    .then(r => resolve(r))
                    .catch(e => reject(e));
            })
        );
    });
    return Promise.all(promises)
        .then(res => {
            promises = [];
            // universities
            res.forEach(n => {
                promises.push(
                    new Promise((resolve, reject) => {
                        getProximityUni(n, universityTreshold)
                            .then(r => resolve(r))
                            .catch(e => reject(e));
                    })
                )
            })
            return Promise.all(promises);
        })
        .then(res => {
            // HEALTH
            promises = [];
            // dentists
            res.forEach(n => {
                promises.push(
                    new Promise((resolve, reject) => {
                        getProximityDentist(n, dentistTreshold)
                            .then(r => resolve(r))
                            .catch(e => reject(e));
                    })
                )
            })
            return Promise.all(promises);
        })
        .then(res => {
            promises = [];
            // hospitals
            res.forEach(n => {
                promises.push(
                    new Promise((resolve, reject) => {
                        getProximityHospital(n, hospitalTreshold)
                            .then(r => resolve(r))
                            .catch(e => reject(e));
                    })
                )
            });
            return Promise.all(promises);
        })
        .then(res => {
            promises = [];
            // clinics
            res.forEach(n => {
                promises.push(
                    new Promise((resolve, reject) => {
                        getProximityClinic(n, clinicTreshold)
                            .then(r => resolve(r))
                            .catch(e => reject(e));
                    })
                )
            });
            return Promise.all(promises);
        })
        .then( res => {
            // LEISURE
            promises = [];
            //restaurants
            res.forEach(n => {
                promises.push(
                    new Promise((resolve, reject) => {
                        getProximityRestaurant(n, restaurantTreshold)
                            .then(r => resolve(r))
                            .catch(e => reject(e));
                    })
                )
            });
            return Promise.all(promises);
        })
        .then( res => {
            promises = [];
            // bars
            res.forEach(n => {
                promises.push(
                    new Promise((resolve, reject) => {
                        getProximityBar(n, barTreshold)
                            .then(r => resolve(r))
                            .catch(e => reject(e));
                    })
                )
            });
            return Promise.all(promises);
        })
        .then(arr => {
            // normalisation
            let maxScoreTrans = 0;
            let maxScoreSchool = 0;
            let maxScoreUni = 0;
            let maxScoreDentist = 0;
            let maxScoreHospital = 0;
            let maxScoreClinic = 0;
            let maxScoreRestaurant = 0;
            let maxScoreBar = 0;

            arr.forEach(n => {
                if (n.scoreTransport > maxScoreTrans) {
                    maxScoreTrans = n.scoreTransport;
                }
                if (n.scoreSchool > maxScoreSchool) {
                    maxScoreSchool = n.scoreSchool;
                }
                if (n.scoreUniversity > maxScoreUni) {
                    maxScoreUni = n.scoreUniversity;
                }
                if (n.scoreDentist > maxScoreDentist) {
                    maxScoreDentist = n.scoreDentist;
                } 
                if (n.scoreHospital > maxScoreHospital) {
                    maxScoreHospital = n.scoreHospital;
                }
                if (n.scoreClinic > maxScoreClinic) {
                    maxScoreClinic = n.scoreClinic;
                }
                if (n.scoreRestaurant> maxScoreRestaurant) {
                    maxScoreRestaurant = n.scoreRestaurant;
                }
                if (n.scoreBar > maxScoreBar) {
                    maxScoreBar = n.scoreBar;
                }
            });
            arr.forEach(n => {
                n.scoreTransport / maxScoreTrans;
                n.scoreSchool / maxScoreSchool;
                n.scoreUniversity / maxScoreUni; 
                n.scoreDentist / maxScoreDentist;
                n.scoreHospital / maxScoreHospital;
                n.scoreClinic / maxScoreClinic;
                n.scoreRestaurant / maxScoreRestaurant;
                n.scoreBar / maxScoreBar;
            });
            return arr;
        })
        .catch(e => {
            console.log('oups :', e);
        });
}




function getAllSchools() {
    var options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs:
        {
            location: '45.531506,-73.61203',
            radius: '20000',
            keyword: 'school',
            key: 'AIzaSyB-5jEijHBRF9jWO9cmEwO9C99qVFkGo0U'
        },
        headers:
        {
            'cache-control': 'no-cache'
        }
    };

    return request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if (response.next_page_token && next_page_token !== '') {
            return getNextPage(body, response.next_page_token);
        }
        else return body;
    });
}

function getNextPage(arr, token) {
    var options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs:
        {
            pagetoken: token,
            key: 'AIzaSyB-5jEijHBRF9jWO9cmEwO9C99qVFkGo0U'
        },
        headers:
        {
            'cache-control': 'no-cache'
        }
    };

    return request(options, function (error, response, body) {
        if (error) throw new Error(error);
        arr.push(...body);
        if (response.next_page_token && next_page_token !== '') {
            return getNextPage(body, response.next_page_token);
        }
        else return arr;
    });
}


// template
function getProximityGoogle(query, origin, treshold) {
    return googlePlaceSearchQuery(query, origin, treshold)
        .then(r => {
            return r.results.length;
        });
}
// dentists
function getProximityDentist(origin, treshold) {
    return googlePlaceSearchQuery('dentist', origin, treshold)
        .then(r => {
            origin.scoreDentist = r.results.length;
            return origin;
        });
}
// hospitals
function getProximityHospital(origin, treshold) {
    return googlePlaceSearchQuery('hospital', origin, treshold)
        .then(r => {
            origin.scoreHospital = r.results.length;
            return origin;
        });
}
// clinics
function getProximityClinic(origin, treshold) {
    return googlePlaceSearchQuery('clinic', origin, treshold)
        .then(r => {
            origin.scoreClinic = r.results.length;
            return origin;
        });
}
// schools
function getProximitySchool(origin, treshold) {
    return googlePlaceSearchQuery('school', origin, treshold)
        .then(r => {
            origin.scoreSchool = r.results.length;
            return origin;
        });
}
// universities
function getProximityUni(origin, treshold) {
    return googlePlaceSearchQuery('university', origin, treshold)
        .then(r => {
            origin.scoreUniversity = r.results.length;
            return origin;
        });
}
// restaurants
function getProximityRestaurant(origin, treshold) {
    return googlePlaceSearchQuery('restaurant', origin, treshold)
        .then(r => {
            origin.scoreRestaurant = r.results.length;
            return origin;
        });
}
// bars
function getProximityBar(origin, treshold) {
    return googlePlaceSearchQuery('bar', origin, treshold)
        .then(r => {
            origin.scoreBar = r.results.length;
            return origin;
        });
}

function getSchoolProximity(origin, treshold) {
    let s = schools.filter( n => {
        let dist = calcDistance(origin.latitude, origin.longitude, n.geometry.location.lat, n.geometry.location.lng);
        return dist < treshold;
    });
    return s.length;
}


function googlePlaceSearchQuery(query, origin, treshold) {
    let options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs: {
            location: origin.latitude + ',' + origin.longitude,
            radius: treshold,
            keyword: query,
            key: googlekey
        },
        headers: {
            'cache-control': 'no-cache'
        }
    }
    return request(options)
    .then(response => {
        return JSON.parse(response);
    })
    .catch(err => console.log('oh no : ', err));
}

function cliniaSearchQuery(query, origin) {
    var options = {
        method: 'GET',
        url: cliniaSearch,
        qs: {
            query: query,
            location: origin.latitude + ',' + origin.longitude 
        },
        headers: {
            Authorization: 'Bearer ' + cliniaToken,
            'cache-control': 'no-cache'
        }
    };

    return request(options)
        .then(response => {
            return JSON.parse(response);
        })
        .catch(err => console.log('oh no : ', err));
}

function calculateProximityTransport(origin) {
    let score = 0;
        
    stm.forEach(n => {
        n.distance = calcDistance(origin.latitude, origin.longitude, n.geometry.coordinates[1], n.geometry.coordinates[0]);
    });

    let s = stm.filter(n => n.distance < transportTreshold);
    score = s.length;

    return score;
}

function getDistance(origin, destination) {
    let lat = origin.latitude;
    let long = origin.longitude;

    let options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
        qs:
        {
            units: 'metric',
            mode: 'walking',
            origins: lat +',' + long,
            destinations: destination.latitude + ',' + destination.longitude,
            key: googlekey
        },
        headers:
        {
            'cache-control': 'no-cache'
        }
    };
    
    return request(options, function (error, response, body) {
        if (error) throw new Error(error);
        return body;
    });
}

function calcDistance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
        }
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344 
		return dist;
	}
}