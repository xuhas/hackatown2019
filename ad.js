class Ad{
    constructor(id, title, thumbnail, latitude, longitude, url, price){
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.coordinates = {latitude, longitude};
        this.url = url;
        this.price = price;
    }
}

class Preferences{
    constructor(bus, metro, dentist, clinic, hospital, restaurant, entertainment, grocery, primary, secondary, university){
        this.transports = {bus, metro};
        this.health = {dentist, clinic, hospital};
        this.commerce = {restaurant, entertainment, grocery};
        this.education = {primary, secondary, university};
    }
}

module.exports.Ad = Ad;
module.exports.Preferences = Preferences;

