import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  stepsList: any[] = [
    { stepName: 'Basic Details', isComplete: false },
    { stepName: 'Skills', isComplete: false },
    { stepName: 'Experiences', isComplete: false },
  ];
  activeStep: any = this.stepsList[0];

  employeeObj: any={
    "roleId":0,
    "empId":0,
    "empName":"",
    "empEmailId":"",
    "empDestiganationId":0,
    "empContactNo": "",
    "empAltContactNo":"",
    "empPersonalEmailId":"",
    "empExpTotalYear":0,
    "empExpTotalMonth":0,
    "empCity":"",
    "empState": "",
    "empPinCode":"",
    "empAddress":"",
    "empPerCity":"",
    "empPerState": "",
    "enpPerPinCode":"",
    "empperAddress":"",
    "password":"",
    erpEmployeeSkills:[],
    ermEmpExperiences:[]
  }

  
  empExpObj : any = {
    "empExpId":0,
    "empId":0,
    "CompanyName":"string",
    "starDate":"2024-03-01T16:58:07.710Z",
    "endDate":"2024-03-01T16:58:07.710Z",
    "designation":"string",
    "projectsWorkedOn":"string",


  }
  
  constructor(private http:HttpClient){

  }
  setActiveStep(activeStep:any) {
    this.activeStep = activeStep;
}
    addSkills(){
      const skillObj ={
        "empSkillId": 0,
        "empId": 0,
        "skill":"",
        "totalYearExp": 0,
        "lastVersionUsed":""
      }
      this.employeeObj.erpEmployeeSkills.unshift(skillObj)
    }
    addExp(){
      const expObj ={
        "empExpId":0,
        "empId":0,
        "CompanyName":"string",
        "starDate":"2024-03-01T16:58:07.710Z",
        "endDate":"2024-03-01T16:58:07.710Z",
        "designation":"string",
        "projectsWorkedOn":"string",
      }
      this.employeeObj.ermEmpExperiences.unshift(expObj)
    }
    saveEmployee(){
      this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee",this.employeeObj).subscribe((res:any)=>{
        debugger;
        if(res.result){
          alert('Employee Create Succesfully')
        }else{
          alert(res.message)
        }
      })
    }
}

