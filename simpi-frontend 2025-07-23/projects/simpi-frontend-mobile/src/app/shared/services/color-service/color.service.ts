import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Photo } from '../../models/photo.model';
import ColorThief from 'color-thief-browser'
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ColorService {
    constructor(private httpClient: HttpClient) { }

    public photos: Photo[] = [];

    public getProminentColorOfImage(imageUrl: any): Observable<string> {
        const sub = new Subject<string>();
        const reader = new FileReader();
        this.getImageBase64(imageUrl).subscribe(d => {
            if (d) {
                reader.readAsDataURL(d);
                reader.onload = () => {
                    const content: string = reader.result as string;
                    this.getColor(content).subscribe(d => {
                        if (d) {
                            sub.next(d);
                            sub.complete();
                        }
                    });
                };
            }
        })
        return sub.asObservable();
    }

    private getImageBase64(imageUrl) {
        return this.httpClient.get(imageUrl, { responseType: 'blob' });
    }

    private getColor(img: string): Observable<string> {
        const sub = new Subject<string>();
        const image = new Image();
        image.src = img;

        const colorThief = new ColorThief();
        image.onload = () => {
            const [R, G, B] = colorThief.getColor(image);
            const brightness = ((R * 299) + (G * 587) + (B * 114)) / 1000;
            if (brightness < 125) {
                sub.next('light');
                sub.complete();
            } else {
                sub.next('dark');
                sub.complete();
            }
        }
        return sub.asObservable();
    }
}