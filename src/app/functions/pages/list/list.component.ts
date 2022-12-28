import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { Function } from '../../interfaces/functions.interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'code', 'movie', 'room','date','time', 'action'];
  dataSource!: MatTableDataSource<Function>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private functionsService: FunctionsService, 
    private dialog: MatDialog){ }

  ngOnInit(): void {
    this.getAllFunctions();
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
        this.getAllFunctions();
      }
    })
  } 

  getAllFunctions(){
    this.functionsService.getFunctions()
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

  deleteFunction(id:number){
    this.functionsService.deleteFunction(id)
    .subscribe({
      next:(res) => {
        Swal.fire('OK','Función eliminada exitosamente', 'success');
        this.getAllFunctions();
        
      },
      error:(err) => {
        Swal.fire('Error',err.error.error, 'error');
      }
    })
  }

}
