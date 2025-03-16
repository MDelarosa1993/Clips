import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  imports: [],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy {

  ngOnInit(){
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 150;
    if(bottomOfWindow) {
      console.log('Bottom!')
    }
  }

}
