import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Address, Hero, states } from '../data-model';
import { HeroService } from '../hero-service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;

  heroForm: FormGroup;
  states = states;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService) {

    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: '',
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  onSubmit() {
    this.validateForm();
    this.ngOnChanges();
  }

  validateForm() {
    if (this.heroForm.controls.name !== undefined &&
      this.heroForm.controls.power !== undefined
      && this.sidekickExists()) {
      // and an additional validation:
      // hero name is unique ...

      // save and POST hero
      this.hero = this.prepareSaveHero();
      this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    } else {
      return;
    }
  }

  revert() { this.ngOnChanges(); }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string
    };
    return saveHero;
  }

  sidekickExists() {
    // AJAX test if address is real
    return true;
  }
}
