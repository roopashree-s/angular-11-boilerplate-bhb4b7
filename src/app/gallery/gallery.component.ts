import { Component } from '@angular/core';

import { ImageService } from './shared/image.service';

@Component({
  template: `
    <div class="images mt-2">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6" *ngFor="let image of images">
          <img
            [src]="image.url"
            class="w-100 shadow-1-strong rounded mb-4"
            [alt]="image.name"
          />
        </div>
        <div *ngIf="!images.length">No images available</div>
      </div>
    </div>
  `,
  providers: [ImageService]
})
export class GalleryComponent {
  images = [];
  constructor(private imageService: ImageService) {}
  ngOnInit() {
    this.imageService
      .getPrivateImages()
      .subscribe(images => (this.images = images));
  }
}
