export class Preferences {
    public bus: number;
    public metro: number;
    public dentist: number;
    public clinic: number;
    public hospital: number;
    public restaurant: number;
    public entertainment: number;
    public grocery: number;
    public primary: number;
    public secondary: number;
    public university: number;

    public constructor(bus: number, metro: number, dentist: number, clinic: number,
                        hospital: number, restaurant: number, entertainment: number,
                        grocery: number, primary: number, secondary: number, university: number){
    this.bus = bus;
    this.metro = metro;
    this.dentist = dentist;
    this.clinic = clinic;
    this.hospital = hospital;
    this.restaurant = restaurant;
    this.entertainment = entertainment;
    this.grocery = grocery;
    this.primary = primary;
    this.secondary = secondary;
    this.university = university;

    }
}
