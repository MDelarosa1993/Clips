import { TestBed } from "@angular/core/testing";
import { AboutComponent } from "./about.component";

describe('About Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();
  });
})