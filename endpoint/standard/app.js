/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const Ad = require('./ad.js').Ad;
const Preferences = require('./ad.js').Preferences;

const kijiji = require("kijiji-scraper");


let request = require('request-promise');
let stm = require('./stm/stm_arrets').features;
let schools = require('./schools/schools');
let googlekey = "AIzaSyB-5jEijHBRF9jWO9cmEwO9C99qVFkGo0U";
let cliniaSearch = 'https://api.clinia.ca/search/v1/search';
let cliniaToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3NjEzMzRkODgzNWE5MDQyOWU3ZTc0ODliMjMzNjU3IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NDc5MDQ5NTksImV4cCI6MTU0ODE2NDE1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MDAwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NzAwMC9yZXNvdXJjZXMiLCJjYXRhbG9nIiwic2VhcmNoIiwic3BlY2lhbGl0eSJdLCJjbGllbnRfaWQiOiJoYWNrYXRvd24iLCJzY29wZSI6WyJjYXRhbG9nIiwic2VhcmNoIiwic3BlY2lhbGl0eSJdfQ.hgPQEZYVu1S3uK6fySM05GJ-ivwMX4DahbnKNXHz2W5R9pdRWQIdUD6Xnq2kMnScSiAiUtSYXvR1DZTcyfHlHj_jGtOLeGGEHqwbcpBbdiYSmO0Ap7YvuPTJwmd87seS6roZX2h5Q2g4Rk7B1JDeQIk8g8WHdn6jDameb8Abl0aH22At6ZfQY9nc6r6KassM_KaYLoSyT2aPIJJ7jOfED6xks2NCqeFBW9e5ITRqCScWmAteCRBhkHfOWuBZKZH0tMzh54lGEpPmbRLc4xnsoqmIKNN4aVtezmP5G_zv-cZQzzZuojHg2xexW0GqykyrLvbXFLbPcMf1INQw_sELow';


// [START gae_node_request_example]
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.post('/pref', (req, r) => {
  try {
    console.log(req);

    let prefs = {
      transport : 5,
      dentist: 4,
      hospital: 4,
      bar: 8
    };
    console.log('\n' + prefs + '\n');
    if (perfs) {
      console.log('in there');
      return generateAds(prefs, 20)
        .then(res => {
          return getPonderatedScores(res, prefs)
            .then(res => {
              return r.status(200).json(res);
            })
        })
    }
  } catch (err) {
    return generateAds(prefs, 20);
  }
  
  // res.status(200).json({message: "hello"});
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]




////////

 


function getAds(ads){
    let m_ads = new Array();

    for (let i = 0; i < ads.length; i++) {
        if(ads[i].attributes.type == "OFFER"){
            m_ads.push(new Ad(i,ads[i].title, ads[i].image, ads[i].attributes.location.latitude, ads[i].attributes.location.longitude, ads[i].url, ads[i].attributes.price));
        }
    }

    return m_ads;
}

let out = {
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
            console.log(JSON.parse(json));
            return json;
        })
        .catch( err => console.log(err));
}

////////



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
// getGlobalScore(   [ { id: 0,
//     title: 'Condo meublé, 3 CAC 2 SDB centre-ville Plateau Montréal parking',
//     thumbnail: 'https://i.ebayimg.com/00/s/NTMzWDgwMA==/z/qNAAAOSwd7xcRIXz/$_35.JPG',
//     coordinates: [Object],
//     url: 'https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/condo-meuble-3-cac-2-sdb-centre-ville-plateau-montreal-parking/1410652441',
//     price: 3300 },
//   { id: 2,
//     title: '5 1/2  dans le mile-end, plateau mt-royal',
//     thumbnail: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/89UAAOSwH1pcLRtl/$_35.JPG',
//     coordinates: [Object],
//     url: 'https://www.kijiji.ca/v-appartement-condo/ville-de-montreal/5-1-2-dans-le-mile-end-plateau-mt-royal/1407118619',
//     price: 1500 }]);

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
