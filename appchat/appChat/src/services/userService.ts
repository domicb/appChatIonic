import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../interfaces/userInterface";

@Injectable()

export class UserService {
    constructor(private http: HttpClient) {

    }

    getMessages() {
        return this.http.get('http://localhost:3000/users/');
    }

    pushMessage(user:UserInterface): void{
        this.http.post('http://localhost:3000/users/',
            {
                "name": user.name,
                "content": user.content
            }).subscribe();
    }



}