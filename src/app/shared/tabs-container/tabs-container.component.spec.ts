import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsContainerComponent } from './tabs-container.component';
import { Component } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
  <app-tabs-container>
    <app-tab tabTitle="Tab One">Hey!</app-tab>
    <app-tab tabTitle="Tab Two">Hi!</app-tab>
  </app-tabs-container>
  `,
  standalone: true,
  imports: [TabsContainerComponent, TabComponent]
})
class TestPostComponent{}

describe('TabsContainerComponent', () => {
  let component: TestPostComponent;
  let fixture: ComponentFixture<TestPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPostComponent, TabsContainerComponent, TabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tabs', () => {
    const tabs = fixture.debugElement.queryAll(By.css('nav > a'));
    expect(tabs.length).withContext('Tabs did not render in the dummy component').toBe(2)
  })
});
