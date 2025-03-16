import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ClipService } from '../../services/clip.service';
import { RouterLink } from '@angular/router';
import { FbTimestampPipe } from '../../shared/pipes/fb-timestamp.pipe';


@Component({
  selector: 'app-clips-list',
  imports: [RouterLink, FbTimestampPipe],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy {
  clipService = inject(ClipService);

  constructor() {
    this.clipService.getClips();
  }


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
      this.clipService.getClips()
    }
  }

}
