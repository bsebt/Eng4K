import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAgreementComponent } from './terms-agreement.component';

describe('TermsAgreementComponent', () => {
  let component: TermsAgreementComponent;
  let fixture: ComponentFixture<TermsAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
