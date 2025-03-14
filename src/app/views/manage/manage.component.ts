import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, Params } from '@angular/router';
import { ClipService } from '../../services/clip.service';
import { Clip } from '../../interfaces/clip';
import { EditComponent } from '../../video/edit/edit.component';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-manage',
  imports: [RouterLink, EditComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  videoOrder = signal('1');
  clipService = inject(ClipService);
  clips = signal<Clip[]>([]);
  activeClip = signal<Clip | null>(null);
  modal = inject(ModalService);

  sort($event: Event) {
    const { value } = $event.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder.set(params['sort'] === '2' ? '2' : '1');
    });
    const results = await this.clipService.getUserClips();
    results.forEach((document) => {
      const data = document.data();
      this.clips.set([...this.clips(), 
        {
          docID: document.id,
          uid: data['uid'],
          displayName: data['displayName'],
          title: data['title'],
          timestamp: data['timestamp'],
          fileName: data['fileName'],
          clipURL: data['clipURL'],
        }
      ])
    })
  }

  openModal($event: Event, clip: Clip) {
    $event.preventDefault();
    this.activeClip.set(clip);
    this.modal.toggle('editClip');
  }

  update($event: Clip) {
    const currentClips = this.clips();
    currentClips.forEach((element, index) => {
      if (element.docID === $event.docID) {
        currentClips[index].title = $event.title
      }
    });
    this.clips.set(currentClips);
  }
}
