import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  roomForm!: FormGroup;

  constructor(
    private roomsService: RoomsService, 
    private formBuilder : FormBuilder, 
    private dialogRef : MatDialogRef<AddComponent> ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: ['',Validators.required],
      code: ['',Validators.required],
      capacity: ['', Validators.required]
    })
  }

  addRoom(): void {
    if(this.roomForm.valid){
      this.roomsService.postRoom(this.roomForm.value)
      .subscribe({
        next:(res) => {
          Swal.fire('OK',res.message, 'success');
          this.roomForm.reset();
          this.dialogRef.close('save')
        },
        error:(err) => {
          Swal.fire('Error',err.error.code, 'error');
        } 
      })
    }
  }

}
