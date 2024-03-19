// Importez le Router si vous n'avez pas déjà importé
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

convertedJson:string;
intervenat:any[] = [];
charge_en_ligne: { [key: string]: any } = {};
charge_sur_place: { [key: string]: any } = {};
somme_charge_en_ligne=0;
somme_charge_sur_place=0;
somme_de_totaux=0;
totale: { [key: string]: any } = {};
afficherTableau: boolean = false;
  constructor(private router: Router) { }
  toggleTableau() {
    this.afficherTableau = !this.afficherTableau;
  }
  ngOnInit() {
  }

  creerTableau() {
    // Implémentez ici la logique pour créer un nouveau tableau
    // Par exemple, naviguer vers une autre page où le tableau peut être créé
    this.router.navigate(['/nouveau-tableau']); // Remplacez '/nouveau-tableau' par le chemin de votre nouvelle page
  }
  fileUpload(event:any){
    console.log(event.target.files);
    const selectedfile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedfile);
    fileReader.onload = (event)=>
    {
      console.log(event)
      let binaryData=event.target.result;
      let workbook = XLSX.read(binaryData,{type:'binary'})
      workbook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json((workbook.Sheets[sheet]))
        //console.log(data[1]['__EMPTY_1'])
        this.convertedJson=JSON.stringify(data,undefined,4)
        console.log(data)
         for (let i = 0; i < data.length; i++) {
          if (data[i]['__EMPTY_1'] !== undefined) {
            this.charge_en_ligne[data[i]['__EMPTY_1']] = 0;
            this.charge_sur_place[data[i]['__EMPTY_1']] = 0;
            this.totale[data[i]['__EMPTY_1']] = 0;
          }
         }
         console.log(this.charge_en_ligne['Appui directeur de projet : GIANA'])
         for(let l=0;l<data.length;l++)
         {
          
          if(data[l]['__EMPTY_1']&& data[l]['Charge sur place'])
          {
            const intervenant  = data[l]['__EMPTY_1'];
            const chargeSurPlace = Number(data[l]['Charge sur place']);
            this.somme_charge_sur_place+=chargeSurPlace;
            this.charge_sur_place[intervenant] += chargeSurPlace;
            this.totale[intervenant]+=chargeSurPlace
          }
          if(data[l]['__EMPTY_1']&& data[l]['Charge en ligne'])
          {
            const intervenant  = data[l]['__EMPTY_1'];
            const chargeEnLigne = Number(data[l]['Charge en ligne']);
            this.somme_charge_en_ligne+=chargeEnLigne;
            this.charge_en_ligne[intervenant] += chargeEnLigne;
            this.totale[intervenant]+=chargeEnLigne;
          }

         }
         this.somme_de_totaux=this.tot(this.totale);
         console.log(this.charge_en_ligne)
         console.log(this.charge_sur_place)
         console.log(this.totale)
         console.log(this.somme_charge_en_ligne);
         console.log(this.somme_charge_sur_place)
         console.log(this.somme_de_totaux) 
      })
      console.log(workbook)
    }
  }


   tot(dic : any)
  {
    var t =0
    for(let key in dic)
    {
       t += dic[key]
    }
    return t;
  }
  getKeys() {
    return Object.keys(this.charge_sur_place);
  }
  
}
