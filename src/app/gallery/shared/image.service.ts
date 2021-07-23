import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { CONFIG } from '../../core';

let imagesUrl = CONFIG.baseUrls.images;
let privateImages = [
  {
    name: 'gallery',
    url:
      'https://images.unsplash.com/photo-1515169273894-7e876dcf13da?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA==&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  },
  {
    name: 'balloon',
    url:
      'https://images.unsplash.com/photo-1565876427310-0695a4ff03b7?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA==&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  },
  {
    name: 'balloon',
    url:
      'https://images.unsplash.com/profile-1565194545465-529bb2eff9b4?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff'
  }
];

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  getPrivateImages() {
    return of(privateImages);
  }
}
