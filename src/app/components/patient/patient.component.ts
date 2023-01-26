import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientDeletionDto } from 'src/app/models/DTOs/PatientDtos/patientDeletionDto';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{
  
  patients:Patient[] = [];
  dataLoaded = false;
  filterText="";


  constructor(private patientService:PatientService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["hospitalId"]){
        this.getPatientsByHospitalId(params["hospitalId"]);
      }else{
        this.getPatients();
      }
    })
  }

  getPatients(){
    this.patientService.getPatients().subscribe(res => {
      this.patients = res.data;
      this.dataLoaded = true;
    });
  }

  getPatientsByHospitalId(hospitalId:number){
    this.patientService.getPatientsByHospitalId(hospitalId).subscribe(res => {
      this.patients = res.data;
      this.dataLoaded = true;
    })
  }

  deletePatient(patient:Patient){
    let deletedPatient:PatientDeletionDto = { id: patient.id };
    this.patientService.deletePatient(deletedPatient).subscribe(res => {
      console.log(res);
    })
    this.toastrService.success("Patient deleted", patient.name)
  }
}
