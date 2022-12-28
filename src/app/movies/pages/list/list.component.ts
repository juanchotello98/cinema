import { Component, OnInit, ViewChild} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movies.interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'classification', 'action'];
  dataSource!: MatTableDataSource<Movie>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get usuario () {
    return this.authService.usuario;
  }

  constructor(
    private moviesService: MoviesService, 
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllMovies();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
  openDialog() {
    this.dialog.open(AddComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllMovies();
      }
    })
  }

  getAllMovies(){
    this.moviesService.getMovies()
    .subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => {
        Swal.fire('Error',"Error trayendo los datos", 'error');
      }
    });
  }

  deleteMovie(id:number){
    this.moviesService.deleteMovie(id)
    .subscribe({
      next:(res) => {
        Swal.fire('OK','Película eliminada exitosamente', 'success');
        this.getAllMovies();
        
      },
      error:(err) => {
        Swal.fire('Error',err.error.error, 'error');
      }
    })
  }
}
