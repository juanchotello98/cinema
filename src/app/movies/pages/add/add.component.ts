import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  movieForm!: FormGroup;

  constructor(
    private moviesService: MoviesService, 
    private formBuilder : FormBuilder, 
    private dialogRef : MatDialogRef<AddComponent> ) { }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      name: ['',Validators.required],
      code: ['',Validators.required],
      classification: ['', Validators.required]
    })
  }

  addMovie(): void {
    if(this.movieForm.valid){
      this.moviesService.postMovie(this.movieForm.value)
      .subscribe({
        next:(res) => {
          Swal.fire('OK',res.message, 'success');
          this.movieForm.reset();
          this.dialogRef.close('save')
        },
        error:(err) => {
          Swal.fire('Error',err.error.code, 'error');
        } 
      })
    }
  }

}
