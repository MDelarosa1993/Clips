import { Component, inject, signal, OnInit, viewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ClipsListComponent } from '../../video/clips-list/clips-list.component';
import videojs from 'video.js';


@Component({
  selector: 'app-clip',
  imports: [RouterLink, ClipsListComponent],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent implements OnInit {
  route = inject(ActivatedRoute);
  id = signal('');
  target = viewChild.required<ElementRef<HTMLVideoElement>>('videoPlayer');

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id.set(params['id'])
    })
    const player = videojs(this.target().nativeElement);
  }
}
