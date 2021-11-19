import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  id:any;
  specificPeople:any;

  reactiveForm  = new FormGroup({
    email : new FormControl('email', [Validators.required, Validators.email]),
    first_name : new FormControl('first_name'),
    last_name : new FormControl('last_name'),
    mobile : new FormControl('mobile')
  })
  constructor(private peopleService: PeopleService, private actRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.getSpecificPeople(this.id);
    
  }
  getSpecificPeople(id:any){
   
    this.peopleService.getSpecificPeople(id).subscribe(
      data =>{
        console.log("getAllPeoples",data);
        this.specificPeople = data;
        this.reactiveForm.setValue({
          email : this.specificPeople[0]['email'], 
          first_name: this.specificPeople[0]['first_name'],
          last_name : this.specificPeople[0]['last_name'],
          mobile : this.specificPeople[0]['mobile']
      });
      }
    )
  }


  editPeople(){
       this.peopleService.editPeople(this.id, this.reactiveForm.value).subscribe(
         data =>
         {
            alert("edited")
         })
  }

}
