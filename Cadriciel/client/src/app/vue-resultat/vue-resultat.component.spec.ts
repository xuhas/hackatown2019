import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueResultatComponent } from './vue-resultat.component';


describe('VueResultatComponent', () => {
  let component: VueResultatComponent;
  let fixture: ComponentFixture<VueResultatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueResultatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
