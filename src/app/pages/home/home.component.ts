import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../core/service/url.service';
import { Url } from '../../core/model/url';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  urlForm: FormGroup;

  errorMessage: string = '';

  urlShortend: String = '';

  constructor(private urlService: UrlService){
    this.urlForm = new FormGroup({
      urlName: new FormControl('', Validators.required),
      originalUrl: new FormControl('', Validators.required),
      shortenedUrl: new FormControl('')
    });
  }

  ngOnInit(): void {
    
  }

  createShortUrl(): void {

    if(this.urlForm.valid){

      this.urlService.createUrlShort(this.urlForm.value).subscribe({
        
        next: (url: Url) => {
          console.log('URL encurtada criada com sucesso:', url);
          this.urlForm.reset();
          this.urlShortend = url.shortenedUrl;
        },
        error: (err) => {
          console.error('Erro ao criar URL encurtada:', err)
          if (err.error && typeof err.error === 'object') {
            Object.entries(err.error).forEach(([field, message]) => {
              if (this.urlForm.get(field)) {
                this.urlForm.get(field)?.setErrors({ serverError: message });
              }
            });
          }
        }
      })
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }




}
