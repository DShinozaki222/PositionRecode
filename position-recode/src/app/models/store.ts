import { Observable, Subject, lastValueFrom } from "rxjs";
import { RequestService } from "../services/request.service";
import { User } from "./user";
import { TStore } from "../types/t-store";
import { Urls } from "./urls";
import { TParameterBodyRequestOption } from "../types/t-parameter-body-request-option";
import { HttpHeaders } from "@angular/common/http";
import { TNominatimAddress, TNominatimReverse } from "../types/t-nominatim-reverse";
import { TGetRequestOption } from "../types/t-get-request-option";

export class Store {
    private _id = 0;
    public get id(): number {
        return Number(this._id);
    }
    private _storeName = '';
    public get storeName(): string {
        return this._storeName;
    }

    private _latitude = 0;
    public get latitude(): number {
        return Number(this._latitude);
    }

    private _longitude = 0;
    public get longitude(): number {
        return Number(this._longitude);
    }

    private _address: TNominatimAddress = {
        "ISO3166-2-lvl4": '',
        country: '',
        country_code: '',
        county: '',
        neighbourhood: '',
        postcode: '',
        province: '',
        town: '',
        city: ''
    };
    public get address(): TNominatimAddress {
        return this._address;
    }

    private _favorite = 0;
    public get favorite() {
        return Number(this._favorite);
    }

    private _evaluation = 0;
    public get evaluation(): number {
        return Number(this._evaluation);
    }

    private _note = '';
    public get note(): string {
        return this._note;
    }

    private _registAt = '';
    public get registAt() {
        return this._registAt;
    }

    constructor(id = 0, storeName = '', latitude = 0, longitude = 0, favorite = 0, evaluation = 0, country = '', countryCode = '', county = '', neighbourhood = '', postcode = '', province = '', town = '', city = '', note = '', registAt = '') {
        this._id = id;
        this._storeName = storeName;
        this._latitude = latitude;
        this._longitude = longitude;
        this._favorite = favorite;
        this._evaluation = evaluation;
        this._registAt = registAt;
        this._note = note;
        this._address = {
            country: country,
            country_code: countryCode,
            county: county,
            neighbourhood: neighbourhood,
            postcode: postcode,
            province: province,
            town: town,
            city: city
        };
    }

    public nowPosition(request: RequestService): Subject<Store> {
        const sub = new Subject<Store>();
        const errorSub = new Subject<void>();
        try {
            if (!navigator.geolocation) {
                errorSub.subscribe({
                    next: () => {
                        sub.next(this);
                        sub.complete();
                    }
                }).add(() => {
                    if (!errorSub.closed) {
                        errorSub.unsubscribe();
                    }
                });
                throw new Error();
            }

            navigator.geolocation.getCurrentPosition(async (p) => {
                this._latitude = p.coords.latitude;
                this._longitude = p.coords.longitude;
                this._address = await this.geocodeReverse(request, p.coords.latitude, p.coords.longitude);
                sub.next(this);
                sub.complete();
            });
            return sub;
        } catch (e) {
            errorSub.next();
            return sub;
        }
    }

    public simpleRegist(request: RequestService, user: User): Subject<Store> {
        const sub = new Subject<Store>();
        const errorSub = new Subject<void>();
        try {
            if (!navigator.geolocation) {
                errorSub.subscribe({
                    next: () => {
                        sub.next(this);
                        sub.complete();
                    }
                }).add(() => {
                    if (!errorSub.closed) {
                        errorSub.unsubscribe();
                    }
                });
                throw new Error();
            }
            navigator.geolocation.getCurrentPosition(async (p) => {
                this._latitude = p.coords.latitude;
                this._longitude = p.coords.longitude;
                this._address = await this.geocodeReverse(request, p.coords.latitude, p.coords.longitude);

                const location = {
                    mail: user.mail,
                    lat: this._latitude,
                    lng: this._longitude,
                    country: this._address.country,
                    countryCode: this._address.country_code,
                    county: this._address.county,
                    neighbourhood: this._address.neighbourhood,
                    postcode: this._address.postcode,
                    province: this._address.province,
                    town: this._address.town,
                    city: this._address.city,
                };
                const param = 'location=' + JSON.stringify(location);
                const httpOptions: TParameterBodyRequestOption = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }),
                    withCredentials: true,
                    observe: 'response',
                    reportProgress: true,
                    responseType: 'json'
                };
                request.postRequest<TStore, string>(Urls.SimpleRegist, param, false, httpOptions).subscribe({
                    next: (result) => {
                        if (!result.body) {
                            sub.next(this);
                            sub.complete();
                            return;
                        }
                        this._id = result.body.id;
                        this._registAt = result.body.registAt;
                        sub.next(this);
                        sub.complete();
                    },
                    error: (error) => {
                        sub.next(this);
                        sub.complete();
                    }
                });
            });
            return sub;
        } catch {
            errorSub.next();
            return sub;
        }
    }

    public regist(request: RequestService, user: User, storeName: string, favorite: number, evaluation: number, latitude: number, longitude: number, address: TNominatimAddress, note: string) {
        const registParams = {
            mail: user.mail,
            lat: latitude,
            lng: longitude,
            storeName: storeName,
            favorite: favorite,
            evaluation: evaluation,
            country: address.country,
            countryCode: address.country_code,
            county: address.county,
            neighbourhood: address.neighbourhood,
            postcode: address.postcode,
            province: address.province,
            town: address.town,
            city: address.city,
            note: note
        };
        const param = 'regist=' + JSON.stringify(registParams);
        const sub = new Subject<Store>();
        const httpOptions: TParameterBodyRequestOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
            withCredentials: true,
            observe: 'response',
            reportProgress: true,
            responseType: 'json'
        };
        request.postRequest<TStore, string>(Urls.LocationRegist, param, false, httpOptions).subscribe({
            next: (v) => {
                if (!v.body) {
                    sub.next(this);
                    sub.complete();
                    return;
                }
                this._id = v.body.id;
                this._storeName = storeName;
                this._favorite = favorite;
                this._evaluation = evaluation;
                this._latitude = latitude;
                this._longitude = longitude;
                this._address = address;
                this._note = note;
                this._registAt = v.body.registAt;
                sub.next(this);
                sub.complete();
            },
            error: (e) => {
                sub.next(this);
                sub.complete();
            }
        }).add(() => {
            if (!sub.closed) {
                sub.unsubscribe();
            }
        });
        return sub;
    }

    public update(request: RequestService, storeName: string, favorite: number, evaluation: number, latitude: number, longitude: number, address: TNominatimAddress, note: string) { 
        const updateParams = {
            id: this._id,
            lat: latitude,
            lng: longitude,
            storeName: storeName,
            favorite: favorite,
            evaluation: evaluation,
            country: address.country,
            countryCode: address.country_code,
            county: address.county,
            neighbourhood: address.neighbourhood,
            postcode: address.postcode,
            province: address.province,
            town: address.town,
            city: address.city,
            note: note
        };
        const param = 'update=' + JSON.stringify(updateParams);
        const sub = new Subject<Store>();
        const httpOptions: TParameterBodyRequestOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
            withCredentials: true,
            observe: 'response',
            reportProgress: true,
            responseType: 'json'
        };
        request.putRequest<TStore, string>(Urls.LocationUpdate, param, false, httpOptions).subscribe({
            next: (v) => {
                if (!v.body) {
                    sub.next(new Store());
                    sub.complete();
                    return;
                }
                this._storeName = storeName;
                this._favorite = favorite;
                this._evaluation = evaluation;
                this._latitude = latitude;
                this._longitude = longitude;
                this._address = address;
                this._note = note;
                this._registAt = v.body.registAt;
                sub.next(this);
                sub.complete();
            },
            error: (e) => {
                sub.next(new Store());
                sub.complete();
            }
        }).add(() => {
            if (!sub.closed) {
                sub.unsubscribe();
            }
        });
        return sub;
    }

    public delete(request: RequestService) {
        const sub = new Subject<boolean>();
        const uri = Urls.LocationDelete + '?id=' + this._id;
        request.deleteRequest<{[k: string]: boolean}>(uri).subscribe({
            next: (v) => {
                if (!v.body) {
                    sub.next(false);
                    sub.complete();
                    return;
                }
                sub.next(v.body['result']);
                sub.complete();
            },
            error: (e) => {
                sub.next(false);
                sub.complete();
            }
        }).add(() => {
            if (!sub.closed) {
                sub.unsubscribe();
            }
        });
        return sub;
    }

    public async geocodeReverse(request: RequestService, lat: number, lng: number) {
        let nominatiAddress: TNominatimAddress = {
            country: '',
            country_code: '',
            county: '',
            neighbourhood: '',
            postcode: '',
            province: '',
            town: '',
            city: ''
        };
        if (!google) {
            const getOption: TGetRequestOption = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': 'nominatim.openstreetmap.org',
                }),
                withCredentials: false,
                observe: 'response',
                reportProgress: false,
                responseType: 'json'
            };
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
            const reverse = await lastValueFrom(request.getRequest<TNominatimReverse>(url, true, getOption));
            if (!reverse.body) {
                return nominatiAddress;
            }
            return reverse.body.address
        } else {
            const gmapGeo = new google.maps.Geocoder();
            const geoResult = await gmapGeo.geocode({ location: { lat: lat, lng: lng } });
            const addressList: { [k: string]: string } = {
                premise: '',
                sublocality_level_4: '',
                sublocality_level_3: '',
                sublocality_level_2: '',
                sublocality_level_1: '',
                locality: '',
                administrative_area_level_4: '',
                administrative_area_level_3: '',
                administrative_area_level_2: '',
                administrative_area_level_1: '',
                country: '',
                postal_code: ''
            };
            const typeKW: string[] = [];
            Object.keys(addressList).map((k) => {
                typeKW.push(k);
            });
            for (let i = 0; i < geoResult.results[0].address_components.length; i++) {
                for (let j = 0; j < typeKW.length; j++) {
                    if (geoResult.results[0].address_components[i].types.includes(typeKW[j])) {
                        addressList[typeKW[j]] = geoResult.results[0].address_components[i].long_name;
                        break;
                    }
                }
            }
            let neighbourhood = '';
            if (addressList['sublocality_level_1'] !== '' && addressList['sublocality_level_1'] !== undefined && addressList['sublocality_level_1'] !== null) {
                neighbourhood += addressList['sublocality_level_1'];
            }
            if (addressList['sublocality_level_2'] !== '' && addressList['sublocality_level_2'] !== undefined && addressList['sublocality_level_2'] !== null) {
                neighbourhood += addressList['sublocality_level_2'];
            }
            if (addressList['sublocality_level_3'] !== '' && addressList['sublocality_level_3'] !== undefined && addressList['sublocality_level_3'] !== null) {
                neighbourhood += addressList['sublocality_level_3'];
            }
            if (addressList['sublocality_level_1'] !== '' && addressList['sublocality_level_1'] !== undefined && addressList['sublocality_level_1'] !== null) {
                neighbourhood += addressList['sublocality_level_1'];
            }
            if (addressList['sublocality_level_4'] !== '' && addressList['sublocality_level_4'] !== undefined && addressList['sublocality_level_4'] !== null) {
                neighbourhood += addressList['sublocality_level_4'] + 'ー';
            }
            if (addressList['premise'] !== '' && addressList['premise'] !== undefined && addressList['premise'] !== null) {
                neighbourhood += addressList['premise'];
            }
            nominatiAddress = {
                country: addressList['country'],
                country_code: '',
                county: addressList['administrative_area_level_2'],
                neighbourhood: neighbourhood,
                postcode: addressList['postal_code'],
                province: addressList['administrative_area_level_1'],
                town: '',
                city: addressList['locality']
            };
            return nominatiAddress;
        }
    }

    public async geocodeAddress(request: RequestService, address: string) {
        let location: { address: TNominatimAddress, lat: number, lng: number } = {
            address: {
                "ISO3166-2-lvl4": '',
                country: '',
                country_code: '',
                county: '',
                neighbourhood: '',
                postcode: '',
                province: '',
                town: '',
                city: ''
            },
            lat: 0,
            lng: 0
        };
        if (!google) {
            const getOption: TGetRequestOption = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': 'nominatim.openstreetmap.org',
                }),
                withCredentials: false,
                observe: 'response',
                reportProgress: false,
                responseType: 'json'
            };
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&addressdetails=1`;
            const reverse = await lastValueFrom(request.getRequest<TNominatimReverse>(url, true, getOption));
            if (!reverse.body) {
                return location;
            }
            location = {
                address: reverse.body.address,
                lat: Number(reverse.body.lat),
                lng: Number(reverse.body.lon)
            };
            return location;
        } else {
            const gmapGeo = new google.maps.Geocoder();
            const geoResult = await gmapGeo.geocode({ address: address });
            const addressList: { [k: string]: string } = {
                premise: '',
                sublocality_level_4: '',
                sublocality_level_3: '',
                sublocality_level_2: '',
                sublocality_level_1: '',
                locality: '',
                administrative_area_level_4: '',
                administrative_area_level_3: '',
                administrative_area_level_2: '',
                administrative_area_level_1: '',
                country: '',
                postal_code: ''
            };
            const typeKW: string[] = [];
            Object.keys(addressList).map((k) => {
                typeKW.push(k);
            });
            for (let i = 0; i < geoResult.results[0].address_components.length; i++) {
                for (let j = 0; j < typeKW.length; j++) {
                    if (geoResult.results[0].address_components[i].types.includes(typeKW[j])) {
                        addressList[typeKW[j]] = geoResult.results[0].address_components[i].long_name;
                        break;
                    }
                }
            }
            let neighbourhood = '';
            if (addressList['sublocality_level_1'] !== '' && addressList['sublocality_level_1'] !== undefined && addressList['sublocality_level_1'] !== null) {
                neighbourhood += addressList['sublocality_level_1'];
            }
            if (addressList['sublocality_level_2'] !== '' && addressList['sublocality_level_2'] !== undefined && addressList['sublocality_level_2'] !== null) {
                neighbourhood += addressList['sublocality_level_2'];
            }
            if (addressList['sublocality_level_3'] !== '' && addressList['sublocality_level_3'] !== undefined && addressList['sublocality_level_3'] !== null) {
                neighbourhood += addressList['sublocality_level_3'];
            }
            if (addressList['sublocality_level_1'] !== '' && addressList['sublocality_level_1'] !== undefined && addressList['sublocality_level_1'] !== null) {
                neighbourhood += addressList['sublocality_level_1'];
            }
            if (addressList['sublocality_level_4'] !== '' && addressList['sublocality_level_4'] !== undefined && addressList['sublocality_level_4'] !== null) {
                neighbourhood += addressList['sublocality_level_4'] + 'ー';
            }
            if (addressList['premise'] !== '' && addressList['premise'] !== undefined && addressList['premise'] !== null) {
                neighbourhood += addressList['premise'];
            }
            const nominatiAddress = {
                country: addressList['country'],
                country_code: '',
                county: addressList['administrative_area_level_2'],
                neighbourhood: neighbourhood,
                postcode: addressList['postal_code'],
                province: addressList['administrative_area_level_1'],
                town: '',
                city: addressList['locality']
            };
            location = {
                address: nominatiAddress,
                lat: geoResult.results[0].geometry.location.lat(),
                lng: geoResult.results[0].geometry.location.lng()
            };
            return location;
        }
    }
}


