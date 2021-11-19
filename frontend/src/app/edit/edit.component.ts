import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:any;
  specificPeople:any;
  res:any;
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
    if(this.reactiveForm.get('email')?.value !=''  && this.reactiveForm.get('mobile')?.value !=''  && this.reactiveForm.get('first_name')?.value !='' && this.reactiveForm.get('last_name')?.value !='' ){

       this.peopleService.editPeople(this.id, this.reactiveForm.value).subscribe(
         data =>
         {
          this.res = data;
          alert(this.res['message'])
        })
    }

    else{
      alert("Please enter all details")
    }
}


}
