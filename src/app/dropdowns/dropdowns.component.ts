import { Component , OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { DataService } from '../dropdowns/data.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarService } from './snackbar.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss'],
  providers:[DatePipe]
})
export class DropdownsComponent implements OnInit , AfterViewInit{

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

   constructor(private dataService:DataService, private pipe:DatePipe, private snackbarService : SnackbarService) { }

   displayedColumns: string[] = ['srNo', 'district', 'division', 'subdivision', 'total', 'assign', 'closed', 'pending'];
   dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator:any=MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  picker = new Date();
  picker1 = new Date();
  getDistrict:any[]= [];
  getDivision:any[]= [];
  getSubDivision:any[]= [];
  showData:any[] = [];
  data:any[]=[];
  showFilter:boolean = false;
  showExcel:boolean = false;
  showTable:boolean = false;


  dataForm = new FormGroup({
      disData : new FormControl(''),
      divisionData : new FormControl(''),
      subdivisionData : new FormControl(''),
      fromDate: new FormControl(new Date()),
      toDate: new FormControl(new Date()),
    });


     onChangeDistrict(){
    this.getDivision =[];
     const disData = this.dataForm.get('disData')?.value;
      this.dataService.getDivision(disData).subscribe((response:any)=>{

       if(!response.error){
       if(response.status === "Success"){
        if(response.data.length > 0){
            this.getDivision = response.data;
            console.log(this.getDivision);
        }
       }
       else{

         this.snackbarService.backendWarningSnackBar("Data not available");
       }
    }
    else{
       this.snackbarService.errorSnackBar(Error);
    }




      });


     }

      onChangeDivision(){

    this.getSubDivision =[];
      const disData = this.dataForm.get('disData')?.value;
      const divisionData = this.dataForm.get('divisionData')?.value;
      this.dataService.getSubDivision(disData,divisionData).subscribe((response:any)=>{

        if(!response.error){
          if(response.status === "Success"){
            if(response.data.length > 0){

              this.getSubDivision = response.data;
              console.log(this.getSubDivision);

            }

          }
          else{

            this.snackbarService.backendWarningSnackBar("Data not available");
          }

        }
        else{
          this.snackbarService.errorSnackBar(Error);
       }

      });
      }


  ngOnInit(): void {
    this.getDistrict=[];
    this.dataService.getDistrict().subscribe((response:any)=>{
      this.getDistrict = response.data;
      console.log(this.getDistrict);

    })
  }


  onSearch(){
    const disData = this.dataForm.get('disData')?.value;
    const divisionData = this.dataForm.get('divisionData')?.value;
    const subdivisionData = this.dataForm.get('subdivisionData')?.value;

    let fromDate = this.dataForm.get('fromDate')?.value;
    let toDate= this.dataForm.get('toDate')?.value;

    const fromDate1 = this.pipe.transform(fromDate, 'MM/dd/yyyy');
    const toDate1 = this.pipe.transform(toDate, 'MM/dd/yyyy');

     this.dataService.getSummaryReport(disData,divisionData,subdivisionData,fromDate1, toDate1).subscribe((response:any)=>{
        console.log(response);

         this.showFilter = true;
          this.showExcel = true;
          this.showTable = true;


    this.dataSource.data= response[0].data
    this.showData = response[0].data;

        for(let i=0; i<this.showData.length; i++){
            this.data.push({
              "srNo": i+1,
              "district": this.showData[i]['potDistrict'],
              "division": this.showData[i]['potDivision'],
              "subdivision": this.showData[i]['potSubDivision'],
              "total": this.showData[i]['totalCount'],
              "assign": this.showData[i]['assignCount'],
              "closed": this.showData[i]['completedCount'],
              "pending": this.showData[i]['pendingCount'],


            })
        }

     })

      this.dataSource.data = [];

  }

  exportAsExcel(){

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'sample');

  }


  saveAsExcelFile(buffer: any, fileName: string) {

    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + this.EXCEL_EXTENSION);
  }



}
