import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit{
  designationList: any[]= [];
  roleList: any[]= []
    stepsList: any[] = [
    { stepName: 'Basic Details', isComplete: false },
    { stepName: 'Skills', isComplete: false },
    { stepName: 'Experiences', isComplete: false },
  ];
  activeStep: any = this.stepsList[0];

  // Create a variable of line-progress

  stepperComplitionValue: number = 8;

  employeeObj: any={
    "roleId":0,
    "empId":0,
    "empName":"",
    "empEmailId":"",
    "empDesignationId":0,
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

  employeeList: any[]=[];
  isCreateView: boolean= false;
  
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.loadDesignations();
    this.loadRoles();
    this.loadAllEmployee();
  }
  onEdit(id:number){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetEmployeeByEmployeeId?id=" +id).subscribe((res:any)=>{
      this.employeeObj.data;
      this.employeeObj.empId = id;
      this.isCreateView = true;
    })
  }
  addNew(){
    this.isCreateView = true; 
  }

  setActiveStep(activeStep:any) {
    this.activeStep = activeStep;
}
gotoStep2(){
  const currentStep = this.stepsList.find(m=>m.stepName == this.activeStep.stepName);
  currentStep.isComplete = true;
  this.activeStep = this.stepsList[1];
  this.stepperComplitionValue = 50;
}
gotoStep3(){
  const currentStep = this.stepsList.find(m=>m.stepName == this.activeStep.stepName);
  currentStep.isComplete = true;
  this.activeStep = this.stepsList[2];
  this.stepperComplitionValue = 100;
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
    loadAllEmployee(){
      this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllEmployee").subscribe((res:any)=>{
        this.employeeList = res.data;
      })
    }
    loadDesignations(){
      this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation").subscribe((res:any)=>{
        this.designationList = res.data;
      })
    }
    loadRoles(){
      this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles").subscribe((res:any)=>{
        this.roleList = res.data;
      })
    }

  onDelete(id: number){
    const isDelete = confirm("Are You sure want to delete");
    if(isDelete){
      this.http.delete("https://freeapi.gerasim.in/api/EmployeeApp/DeleteEmployeeByEmpId?empId="+id).subscribe((res:any)=>{
        debugger;
        if(res.result){
          alert('Employee Delete Succesfully');
          this.loadAllEmployee();
        }else{
          alert(res.message)
        }
      })
    }
  }

    saveEmployee(){
      this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee",this.employeeObj).subscribe((res:any)=>{
        debugger;
        if(res.result){
          alert('Employee Create Succesfully');
          this.loadAllEmployee();
          this.isCreateView = false
        }else{
          alert(res.message)
        }
      })
    }
    updateEmployee(){
      this.http.put("https://freeapi.gerasim.in/api/EmployeeApp/UpdateEmployee",this.employeeObj).subscribe((res:any)=>{
        debugger;
        if(res.result){
          alert('Employee Create Succesfully')
          this.loadAllEmployee();
          this.isCreateView = false
        }else{
          alert(res.message)
        }
      })
    }
}

