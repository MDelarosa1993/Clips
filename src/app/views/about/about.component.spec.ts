import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AboutComponent } from "./about.component";

describe('About Component', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
  })
});