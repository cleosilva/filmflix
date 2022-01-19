import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { docData, Firestore } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { user } from 'rxfire/auth';
import { from, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private db: Firestore) { }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string, payload: User){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(
      tap((creds) =>{
        payload.uid = creds.user.uid;

        // Salvando o payload no banco de dados
        const users = collection(this.db, 'users');
        const userDoc = doc(users, payload.uid);

        setDoc(userDoc, payload);
      }
    ))
  }

  get user(){
    return user(this.auth).pipe(switchMap((user) => {
      if(user){
        return this.getUserData(user.uid);
      }
      return of(undefined);
    }))
  }

  private getUserData(uid: string){
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid);

    return docData(userDoc).pipe(map((data) => data as User));
  }
}