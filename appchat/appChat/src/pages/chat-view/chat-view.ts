import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../interfaces/userInterface';
import { UserService } from '../../services/userService';

/**
 * Generated class for the ChatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html',
})
export class ChatViewPage implements OnInit{
  
  form: FormGroup;
  isValid = false;
  user: UserInterface;
  me: boolean = false;
  messages: [];

  constructor(private formBuilder: FormBuilder,
    public navCtrl: NavController,
     public navParams: NavParams,
     private userServ: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatViewPage');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      content: ['', (Validators.required,Validators.minLength(1))]
    });

    this.getMessages();

    this.form.valueChanges.subscribe((formValue) =>{
      this.isValid = false;
      this.user = formValue;
      console.log(formValue);
      if(this.form.status !== 'INVALID' || formValue.name !== ''){
        this.isValid = true;
      }
      console.log(this.form);

      setTimeout(() =>{
        console.log('refresMessages');
        this.getMessages();
      }), 1000
    })
    
    let nom = this.navParams.get("user");
    (nom.name == 'domicb')? this.me = true: this.me = false;

  }

  getMessages() {
    this.userServ.getMessages().subscribe((result:[]) =>{
      this.messages = result;
      console.log(result);
    })
  }

  formSubmit() {
    console.log('Se ha enviado el mensaje '+this.user.content);
    this.userServ.pushMessage(this.user);
  }

}
