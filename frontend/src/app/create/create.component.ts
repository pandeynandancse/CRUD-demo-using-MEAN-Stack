import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
   res:any;
  reactiveForm  = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    first_name : new FormControl('',Validators.required),
    last_name : new FormControl('', Validators.required),
    mobile : new FormControl('', Validators.required)
  })
  config:any;
  allPeoples  : any = [];
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
  }

  addPeople(){
  

    if(this.reactiveForm.get('email')?.value !=''  && this.reactiveForm.get('mobile')?.value !=''  && this.reactiveForm.get('first_name')?.value !='' && this.reactiveForm.get('last_name')?.value !='' ){
      if(this.reactiveForm.get('email')?.value.includes('@'))
        {
          this.peopleService.addPeople(this.reactiveForm.value).subscribe(
            data=>{
              this.res = data;
              if(this.res['error']){
                alert(this.res['message'])
              }
              else{
                alert(this.res['message'])
                    this.reactiveForm.setValue({
                      email : "", 
                      first_name: "",
                      last_name :"",
                      mobile : ""
                    });
              }
            }
          )
        }
        else{
          alert("Email is not in proper format")
        }
    }

    else{
      alert("Please enter all details")
    }
  }

}
