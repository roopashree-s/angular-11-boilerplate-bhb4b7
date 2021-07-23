import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { AuthGuard, CanDeactivateGuard, UserProfileService } from './core';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

/***************************************************************
 * Lazy Loading to Eager Loading
 *
 * 1. Remove the module and NgModule imports in `app.module.ts`
 *
 * 2. Remove the lazy load route from `app.routing.ts`
 *
 * 3. Change the module's default route path from '' to 'pathname'
 *****************************************************************/
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard, CanDeactivateGuard, UserProfileService]
})
export class AppRoutingModule {}
