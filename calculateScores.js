
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
getGlobalScore([o,a])
.then(r => console.log(r));


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