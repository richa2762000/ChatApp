import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UtileService {

  constructor(private router: Router) { }

  setToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  // JSON.stringify(): This method is used to convert a JavaScript object into a JSON string. 
  //const person = { name: 'John', age: 30, city: 'New York' };
  // const jsonString = JSON.stringify(person);
  // console.log(jsonString); // Output: {"name":"John","age":30,"city":"New York"}

  getFromLocalStorage(key: string): any {
    let getFromLocalStorage = JSON.parse(localStorage.getItem(key));
    //  It takes a JSON string as input and returns a JavaScript object
    // const jsonString = '{"name":"John", "age":30, "city":"New York"}';
    // const person = JSON.parse(jsonString);
    // console.log(person.name);
    let data = getFromLocalStorage ? getFromLocalStorage : [];
    return data;
  }

  loggedInUserId(): string {
    let getFromLocalStorage = JSON.parse(
      localStorage.getItem('LOGGED_IN_USER_ID')
    );
    if (getFromLocalStorage === undefined || getFromLocalStorage == null) {
      return null;
    } else {
      return getFromLocalStorage;
    }
  }

  // These functions provide a way to store, retrieve, and access data in the local storage using key-value pairs. The setToLocalStorage function is used to store data, the getFromLocalStorage function is used to retrieve data, and the loggedInUserId function is used specifically to retrieve the logged-in user ID.







  isEmailValid(email: string): boolean {
    let aPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");

    if (aPos < 1 || dotPos - aPos < 2) {
      return false;
    } else {
      return true;
    }
  }

  getUserById(id: string) {
    let users = this.getFromLocalStorage("users");
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        let user = users[i];
        // deleting password
        delete user.password;
        return user;
      }
    }
  }

  getDocByID(id: string) {
    let docs = this.getFromLocalStorage("docs");
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].id == id) {
        return docs[i];
      }
    }
  }


  allowOnlyAuthUser() {
    if (this.loggedInUserId() == null) {
      this.router.navigateByUrl('/welcome');
    }
  }
}
