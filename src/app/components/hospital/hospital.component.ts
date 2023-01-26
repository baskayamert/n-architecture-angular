import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  hospitals:Hospital[] = [];
  currentHospital:Hospital;

  constructor(private hospitalService:HospitalService){}

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals(){
    this.hospitalService.getHospitals().subscribe(res => {
      this.hospitals = res.data;
    });
  }

  setCurrentHospital(hospital:Hospital){
    this.currentHospital = hospital;
  }

  getCurrentHospitalClass(hospital:Hospital){
    if(hospital == this.currentHospital){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }

  getAllPatientsClass(){
    if(!this.currentHospital){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }

}
