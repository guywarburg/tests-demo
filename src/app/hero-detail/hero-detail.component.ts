import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {Address, Hero, states} from '../data-model';
import {HeroService} from '../hero-service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {
  hero: Hero = {
    id: 1,
    name: 'Whirlwind'
  };
  heroes: Hero[] = [
    {
      id: 1,
      name: 'Whirlwind'
    },
    {
      id: 2,
      name: 'Bombastic'
    },
    {
      id: 3,
      name: 'Magneta'
    },
  ];

  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder,
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

  onSubmit() {
    if (this.validateForm(this.heroForm.value)) {
      this.hero = this.prepareSaveHero();
      this.heroService.updateHero(this.hero).subscribe(/* error handling */);
      this.ngOnChanges();
    }
  }

  validateForm(myForm) {
    const isNameValid = this.testName(myForm.name as string);
    const isPowerValid = this.testPower(myForm.power as string);
    const isSidekickValid = this.testSidekick(myForm.sidekick as string);

    return (isNameValid && isPowerValid && isSidekickValid);
  }

  revert() {
    this.ngOnChanges();
  }

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

  testName(name: string): boolean {
    if (!isNullOrUndefined(name)) {
      return !(this.heroes.filter(hero => {
        return hero.name === name;
      }).length);
    }
    return false;
  }

  testPower(power: string): boolean {
    return true;
  }

  testSidekick(sidekick: string): boolean {
    if (!isNullOrUndefined(sidekick) && sidekick !== 'Iron-Man') {
      // Because Iron-Man will never be sidekick
      return true;
    }
    return false;
  }
}
