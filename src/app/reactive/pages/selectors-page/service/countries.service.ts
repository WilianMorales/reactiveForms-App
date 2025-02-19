import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { Country, Region, SmallCountry } from "../interface/country.interfaces";
import { combineLatest, map, Observable, of } from 'rxjs';
import { environment } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _endpointRegion: string = `${environment.urlBase}/region`
  private _endpointCountry: string = `${environment.urlBase}/alpha`

  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor(
    private http: HttpClient,
  ) { }

  get regions(): Region[] {
    return [ ...this._regions ];
  }

  get httpParams() {
    return new HttpParams().set('fields', 'cca3,name,borders');
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if(!region) return of( [] );

    const url = `${this._endpointRegion}/${ region }`;

    return this.http.get<Country[]>(url, { params: this.httpParams })
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        })) )
      );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {

    if (!alphaCode) return of({} as SmallCountry);
    // const url = `${ this._endpointCountry }/${ alphaCode }?fields=cca3,name,borders`;
    const url = `${ this._endpointCountry }/${ alphaCode }`;
    return this.http.get<Country>(url, { params: this.httpParams })
     .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))
      );
  }

  getCountryBorderByCodes(borders: string[]): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequest:Observable<SmallCountry>[] = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest( countriesRequest );
  }

}
