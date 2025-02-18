import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { CountriesService } from './service/countries.service';
import { Region, SmallCountry } from './interface/country.interfaces';

@Component({
  selector: 'app-selectors-page',
  templateUrl: './selectors-page.component.html',
  styles: [
  ]
})
export class SelectorsPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];;

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.borders = [] ),
        switchMap( (region) => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
      })
  }

  onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('borders')!.setValue('') ),
        tap( () => this.borders = [] ),
        filter( (alphaCode: string) => alphaCode.length > 0 ),
        map( alphaCode => { return this.countriesByRegion.find( ({ cca3 }) => cca3 === alphaCode )! }),
        filter( ({ borders }) => borders.length > 0),
        switchMap( ({ borders }) =>{
          return this.countriesService.getCountryBorderByCodes( borders )
        }),
      )
      .subscribe( countries => {
        this.borders = countries;
      })
  }

  /* onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('borders')!.setValue('') ),
      filter( (alphaCode: string) => alphaCode.length > 0 ),
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),
      switchMap( (country) => this.countriesService.getCountryBorderByCodes( country.borders ) ),
    )
    .subscribe( countries => {
      this.borders = countries;
    });
  } */

}
