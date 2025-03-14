import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, Params } from '@angular/router';
import { ClipService } from '../../services/clip.service';
@Component({
  selector: 'app-manage',
  imports: [RouterLink],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  videoOrder = signal('1');
  clipService = inject(ClipService);

  sort($event: Event) {
    const { value } = $event.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder.set(params['sort'] === '2' ? '2' : '1')
    });
    const results = await this.clipService.getUserClips();
    console.log(results);
  }
}
