import { Component, OnInit } from '@angular/core';
import { AuthHandlerService } from '../services/auth-handler.service';
import { EntityHandlerService } from '../services/entity-handler.service';
import { Role } from '../types/Role';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private entity:EntityHandlerService,
              private router:Router
  ){

  }

  NavigateToMain(){
    this.router.navigate(["editor"])
  }

  NavigateToCreatorPage(){
    this.router.navigate(["creator"]);
  }

  NavigateToLogin(){
    this.router.navigate([""])
    history.replaceState(null, '', '');
  }

  NavigateToKanban(){
    this.router.navigate(["kanban"])
  }

  isManager:boolean = false;

  ngOnInit(): void {
    this.entity.userRoles$.subscribe((roles:Role[])=>{
      this.isManager = roles.some(r=>r.name == "ROLE_MANAGER")
    })
  }



  




}
