import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginResponse } from "projects/simpi-frontend-common/src/lib/models";
import { BrandService } from "projects/simpi-frontend-common/src/lib/services/brand/brand.service";
import { StorageService } from '../../../simpi-frontend-common/src/lib/services/storage/storage.service';
import { environment } from '../environments/environment';

@Component({ template: '' })
export class BrandAliasResolverComponent implements OnInit {
    constructor(private router: Router, private brandService: BrandService) { }

    public ngOnInit(): void {
      StorageService.retrieve(environment.authStorageKey)
        .then(userInfoJson => {
          const homeBrandId = (JSON.parse(userInfoJson) as LoginResponse)?.homeBrandId;
          if (homeBrandId) {
            this.brandService.getBrandById(homeBrandId).subscribe(
              brand => this.router.navigate([brand.alias]),
              error => this.router.navigate(['login']));
          } else {
            this.router.navigate(['login']);
          }
        });
    }
}
