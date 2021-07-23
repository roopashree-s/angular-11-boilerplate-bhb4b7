import { NgModule } from '@angular/core';

import {
  routedComponents,
  GalleryRoutingModule
} from './gallery-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, GalleryRoutingModule],
  declarations: [routedComponents]
})
export class GalleryModule {}
// avoids having to lazy load with loadChildren: "app/vehicles/vehicle.module#VehicleModule"
