import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadTokenGuard } from './guards/validad-token.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    canActivate: [ValidadTokenGuard],
    canLoad: [ValidadTokenGuard]
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule),
    canActivate: [ValidadTokenGuard],
    canLoad: [ValidadTokenGuard]
  },
  {
    path: 'functions',
    loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule),
    canActivate: [ValidadTokenGuard],
    canLoad: [ValidadTokenGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash:true
    })
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
