import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientRegisterDto } from 'src/app/models/DTOs/PatientDtos/patientRegisterDto';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit{

  patientAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private patientService:PatientService, private toastrService:ToastrService) {
  
  }

  ngOnInit(): void {
    this.createPatientAddForm();
  }

  createPatientAddForm(){
    this.patientAddForm = this.formBuilder.group({
      name:["",Validators.required],
      birthdate:["",Validators.required],
      nationalityNumber:["",Validators.required],
      hospitalId:["",Validators.required]
    });
  }

  addPatient(){
    if(this.patientAddForm.valid){
      //let patientModel = Object.assign({}, this.patientAddForm.value);
      let patientToAdd:PatientRegisterDto = this.patientAddForm.value
      this.patientService.addPatient(patientToAdd).subscribe(res => {
        this.toastrService.success("Patient was added","Success!")
      },responseError =>{
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error!");
          }
        }
      })
    }else{
      this.toastrService.error("Patient information is insufficient","Alert!")
    }
    
  }

}
