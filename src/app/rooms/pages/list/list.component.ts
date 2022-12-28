import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../interfaces/rooms.interfaces';
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

  displayedColumns: string[] = ['id', 'name', 'code', 'capacity', 'action'];
  dataSource!: MatTableDataSource<Room>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roomsService: RoomsService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRooms();
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
        this.getAllRooms();
      }
    })
  } 

  getAllRooms(){
    this.roomsService.getRooms()
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

  deleteRoom(id:number){
    this.roomsService.deleteRoom(id)
    .subscribe({
      next:(res) => {
        Swal.fire('OK','Sala eliminada exitosamente', 'success');
        this.getAllRooms();
      },
      error:(err) => {
        Swal.fire('Error',err.error.error, 'error');
      }
    })
  }
}
