import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/userInterface';
import { UserService } from '../../services/userService';
import { ChatViewPage } from '../chat-view/chat-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public form: FormGroup;S
  isValid: boolean = false;
  private user: UserInterface;
  constructor(private formBuilder: FormBuilder, public navCtrl: NavController,public navParam: NavParams, private userServi: UserService) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', (Validators.required,Validators.maxLength(16), Validators.minLength(1))]
    });

    this.form.valueChanges.subscribe((formValue: UserInterface) =>{
      this.user = formValue;
      this.isValid = false;
      if(this.form.status !== 'INVALID' || formValue.name.length>16){
        this.isValid = true;
      }
      console.log(this.form);
    })
  }

  toChat() {
    this.navCtrl.push(ChatViewPage,{user:this.user});
  }

  getMessages() {
    this.userServi.getMessages();
  }

  formSubmit() {
    this.toChat();
  }

  validUser() {
    
  }

}
