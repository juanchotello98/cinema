import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { FunctionsService } from '../../services/functions.service';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { Movie } from 'src/app/movies/interfaces/movies.interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { Room } from 'src/app/rooms/interfaces/rooms.interfaces';
import { RoomsService } from 'src/app/rooms/services/rooms.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  functionForm!: FormGroup;
  movies : Movie[] = []
  rooms : Room[] = []

  constructor(
    private functionsService: FunctionsService,
    private moviesService: MoviesService,
    private roomsService:RoomsService, 
    private formBuilder : FormBuilder, 
    private dialogRef : MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.functionForm = this.formBuilder.group({
      code: ['',Validators.required],
      movie: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.getAllMovies();
    this.getAllRooms();
  }

  addFunction(): void {
    if(this.functionForm.valid){
      this.functionsService.postFunction(this.functionForm.value)
      .subscribe({
        next:(res) => {
          Swal.fire('OK',res.message, 'success');
          this.functionForm.reset();
          this.dialogRef.close('save');
        },
        error:(err) => {
          Swal.fire('Error',err.error.code[0], 'error');
        } 
      })
    }
  }

  getAllMovies(){
    this.moviesService.getMovies()
    .subscribe({
      next:(res) => {
        this.movies = res;
      },
      error:(err) => {
        Swal.fire('Error',"Error trayendo los datos", 'error');
      }
    });
  }

  getAllRooms(){
    this.roomsService.getRooms()
    .subscribe({
      next:(res) => {
        this.rooms = res;
      },
      error:(err) => {
        Swal.fire('Error',"Error trayendo los datos", 'error');
      }
    });
  }
}
