import { Injectable } from '@angular/core';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private createFileName(f: File){
    const ext = f.name.split('.').pop();
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`;
  }

  constructor( private storage: Storage) { }

  upload(image: File, folder: string = 'users/'){
    const fileName = this.createFileName(image);
    const profile = ref(this.storage, folder + fileName);

    return from(uploadBytes(profile, image)).pipe(
      switchMap((_) => {
        return from(getDownloadURL(profile));
      })
    )
  }
}
