import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Offre } from 'app/class/offre';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  addoffre :FormGroup;
  public offre = new Offre
  constructor(private UserService:UserService) { }

  ngOnInit() {
    this.addoffre =new FormGroup({
      id: new FormControl(),  
      reference :new FormControl() ,
      titre :new FormControl() ,
      categories:new FormControl(),
      date_pub :new FormControl(),
      date_limite :new FormControl(),
    });
  }
  submit(){
    this.offre.titre=this.addoffre.get("titre")?.value;
    this.offre.reference=this.addoffre .get("reference")?.value;
    this.offre.id=this.addoffre.get("id")?.value;
    this.offre.categories=this.addoffre.get("categories")?.value.name;
    this.offre.date_publication=this.addoffre.get("date_publication")?.value;
    this.offre.date_limite=this.addoffre.get("date_limite")?.value;
    this.UserService.addoffre(this.offre).subscribe();
}
}
