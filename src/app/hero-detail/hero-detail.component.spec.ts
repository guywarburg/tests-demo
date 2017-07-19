import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroService} from '../hero-service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [HeroDetailComponent],
      providers: [HeroService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(HeroDetailComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    heroService = TestBed.get(HeroService);
  });

  it(`should add 1 + 1`, () => {
    expect(1 + 1).toBe(2);
  });

  it(`should return true for new hero name`, () => {
    component.heroes = [
      {
        name: 'HERO 1',
        id: 1
      },
      {
        name: 'HERO 2',
        id: 2
      },
      {
        name: 'HERO 3',
        id: 3
      }
    ];

    const test = component.testName('HERO 4');
    expect(test).toBeTruthy();
  });

  it(`should return false for existing hero name`, () => {
    component.heroes = [
      {
        name: 'HERO 1',
        id: 1
      },
      {
        name: 'HERO 2',
        id: 2
      },
      {
        name: 'HERO 3',
        id: 3
      }
    ];
    const param = 'HERO 1';
    const test = component.testName(param);
    expect(test).toBeFalsy();
  });

  it(`should return true if sidekick is valid`, () => {
    expect(component.testSidekick('John')).toBeTruthy();
  });

  it(`should return false if sidekick is 'Iron-Man'`, () => {
    expect(component.testSidekick('Iron-Man')).toBeFalsy();
  });

  it(`should return false if name is null`, () => {
    component.heroes = [
      {
        name: 'HERO 1',
        id: 1
      },
      {
        name: 'HERO 2',
        id: 2
      },
      {
        name: 'HERO 3',
        id: 3
      }
    ];
    const param = null;
    const test = component.testName(param);
    expect(test).toBeFalsy();
  });

  it(`should return true if form params are valid`, () => {
    component.heroForm.controls['name'].setValue('TEST');
    component.heroForm.controls['power'].setValue('SUPER POWER');
    component.heroForm.controls['sidekick'].setValue('SIDEKICK');

    expect(component.validateForm(component.heroForm.value)).toBeTruthy();
  });
});
