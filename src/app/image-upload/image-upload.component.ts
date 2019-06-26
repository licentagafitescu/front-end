import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service'
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  constructor(private imageService: ImageService, private authService: AuthService, private router: Router,) { }

  imagePath: string;
  imageUrl: any;
  message: string;
  image: string;
  loading = false;
  result: any;
  selectedOption: string  = 'Profile';
  options: string[] = ['Profile', 'Contacts','Public'];
  name: string ;
  profile_picture:string;

  ngOnInit() {
    this.getProfile();
    
  }

  preview(file) {
    if (file.files.length === 0)
      return;

    let fileReader = new FileReader();
    this.imagePath = <string>file.files[0].name;
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onload = () => {
      this.imageUrl = fileReader.result;
    }
    fileReader.onloadend = () => {
      this.image = <string>fileReader.result;
      let reg = new RegExp("^data:image\/[a-zA-Z]+;base64,");
      this.image = this.image.replace(reg, "");

    }
  }
  logout(){
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

  async getProfile(){
    let result =   await this.authService.getProfile();
    this.authService.saveProfile(result);
    this.name = this.authService.getName();
    this.profile_picture = this.authService.getImage();
    console.log(this.profile_picture);

  }


  async upload() {
    this.loading = true;
    let user:string;
    user = this.authService.getUser();
    this.result = await this.imageService.postImage({ user: user, name: this.imagePath, file: this.image, option: this.selectedOption });
    this.result = JSON.parse(this.result);
    this.loading = false;
  }
}
