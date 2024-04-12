import { Component } from '@angular/core';
import { MasterService } from '../services/master.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DbConfig } from '../model/DbConfig';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.css']
})
export class TutorialPageComponent {

  constructor(private router:Router){}
 ngOnInit() {

 }
            
}
