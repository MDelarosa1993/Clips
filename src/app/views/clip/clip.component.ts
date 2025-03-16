import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ClipsListComponent } from '../../video/clips-list/clips-list.component';

@Component({
  selector: 'app-clip',
  imports: [RouterLink, ClipsListComponent],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent implements OnInit {
  route = inject(ActivatedRoute);
  id = signal('');

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id.set(params['id'])
    })
  }
}
