// export class User {
//     // Add properties we have for user.
//     fullName: string;
//     lastName: string;
//     email: string;
//     password: string;
// }

export class FirebaseUserModel {
    image: string;
    name: string;
    provider: string;
  
    constructor(){
      this.image = "";
      this.name = "";
      this.provider = "";
    }
  }