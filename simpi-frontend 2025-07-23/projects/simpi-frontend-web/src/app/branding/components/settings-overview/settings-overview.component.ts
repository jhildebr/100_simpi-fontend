import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BrandService } from "projects/simpi-frontend-common/src/lib/services/brand/brand.service";
import { BrandChangeRequest } from "projects/simpi-frontend-common/src/lib/models/http/requests/brandChangeRequest";
import { map, takeWhile, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { BrandResponse } from "projects/simpi-frontend-common/src/lib/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "sim-settings-overview",
  templateUrl: "./settings-overview.component.html",
  styleUrls: ["./settings-overview.component.scss"],
})
export class SettingsOverviewComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  private brandAlias: string;
  public brandId: string;
  public brandForm: FormGroup;

  private corporateIdentityUploadedLogoIds: string[] = [];
  public corporateIdentitySelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._componentActive = true;
    this.buildBrandForm();
    this.getBrandAlias()
      .pipe(takeWhile(() => this._componentActive))
      .subscribe(() => {
        this.fillBrandFormAndBrandId()
          .pipe(takeWhile(() => this._componentActive))
          .subscribe(() => {
            this.corporateIdentitySelected = true;
          });
      });
  }

  ngOnDestroy(): void {
    this._componentActive = false;
  }

  public onCorporateIdentityClick($event: Event): void {
    this.corporateIdentitySelected = true;
    $event.stopPropagation();
  }

  public onUnselectAllSettings(): void {
    this.corporateIdentitySelected = false;
    this.fillBrandFormAndBrandId()
      .pipe(takeWhile(() => this._componentActive))
      .subscribe(() => {
        this.clearCorporateIdentityUploads();
      });
  }

  public onCloseCorporateIdentity(): void {
    this.corporateIdentitySelected = false;
    this.fillBrandFormAndBrandId()
      .pipe(takeWhile(() => this._componentActive))
      .subscribe(() => {
        this.clearCorporateIdentityUploads();
      });
  }

  private clearCorporateIdentityUploads(): void {
    // Corporate identity component allows users to upload logos via a modal dialog.
    // The upload is performed directly inside this dialog. In case the user does not
    // save the changes to the corporate identity, the uploaded logos must be deleted
    // from the server again. The ids of the uploaded logos are not yet stored on the
    // server so the logos could never ever be found, anyways.
    this.corporateIdentityUploadedLogoIds
      .filter(
        (logoImageId) => logoImageId !== this.brandForm.get("logoImageId").value
      )
      .forEach((logoImageId) => {
        this.brandService
          .deleteLogo(logoImageId)
          .pipe(takeWhile(() => this._componentActive))
          .subscribe();
      });
    this.corporateIdentityUploadedLogoIds = [
      this.brandForm.get("logoImageId").value,
    ];
    // could be improved by only removing elements from the list for which the server
    // call succeeded
  }

  public onSaveCorporateIdentity(): void {
    this.changeBrand();
    this.clearCorporateIdentityUploads();
  }

  public onUploadedCorporateIdentityLogo(logoImageId: string): void {
    this.corporateIdentityUploadedLogoIds.push(logoImageId);
  }

  private changeBrand(): void {
    const brandChange: BrandChangeRequest = {
      brandName: this.brandForm.get("brandName").value,
      logoImageId: this.brandForm.get("logoImageId").value,
      primaryBrandColor: this.brandForm.get("primaryBrandColor").value,
      secondaryBrandColor: this.brandForm.get("secondaryBrandColor").value,
      highlightColorOne: this.brandForm.get("highlightColorOne").value,
      highlightColorTwo: this.brandForm.get("highlightColorTwo").value,
      highlightColorThree: this.brandForm.get("highlightColorThree").value,
    };
    this.brandService
      .changeBrand(this.brandId, brandChange)
      .pipe(takeWhile(() => this._componentActive))
      .subscribe();
  }

  private buildBrandForm(): void {
    this.brandForm = this.fb.group({
      brandName: [""],
      logoImageId: [""],
      primaryBrandColor: [""],
      secondaryBrandColor: [""],
      highlightColorOne: [""],
      highlightColorTwo: [""],
      highlightColorThree: [""],
    });
  }

  private getBrandAlias(): Observable<string> {
    return this.route.root.firstChild.paramMap.pipe(
      takeWhile(() => this._componentActive),
      map((routeParamMap) => routeParamMap?.get("brandAlias")),
      tap((brandAlias) => {
        this.brandAlias = brandAlias;
      })
    );
  }

  private fillBrandFormAndBrandId(): Observable<BrandResponse> {
    return this.brandService.getBrandByAlias(this.brandAlias).pipe(
      takeWhile(() => this._componentActive),
      tap((brandResponse) => {
        if (brandResponse) {
          this.brandForm.patchValue({
            brandName: brandResponse.brandName,
            logoImageId: brandResponse.logoImageId,
            primaryBrandColor: brandResponse.primaryBrandColor,
            secondaryBrandColor: brandResponse.secondaryBrandColor,
            highlightColorOne: brandResponse.highlightColorOne,
            highlightColorTwo: brandResponse.highlightColorTwo,
            highlightColorThree: brandResponse.highlightColorThree,
          });
          if (
            brandResponse.logoImageId &&
            !this.corporateIdentityUploadedLogoIds.includes(
              brandResponse.logoImageId
            )
          ) {
            // the logo exists on the server so add it to list of uploaded logos so it can
            // be removed in case the user deletes the logo
            this.corporateIdentityUploadedLogoIds.push(
              brandResponse.logoImageId
            );
          }
          this.brandId = brandResponse.brandId;
        }
      })
    );
  }

  public closeModal(): void {
    this.activeModal.close();
  }

  public onBrandLogoChanged(): void {
    this.changeBrand();
  }

  public onColorChanged(): void {
    this.changeBrand();
  }

  public onLanguageChanged(): void {
    this.changeBrand();
  }

  public onLanguageDeleted(): void {
    this.changeBrand();
  }
}
