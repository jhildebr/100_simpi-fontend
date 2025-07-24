import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StepResponse, BrandResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { FormGroup } from '@angular/forms';
import { BrandService } from '../../../../../../simpi-frontend-common/src/lib/services/brand/brand.service';

@Component({
  selector: 'sim-step-text-sidebar',
  templateUrl: './step-text-sidebar.component.html',
  styleUrls: ['./step-text-sidebar.component.scss']
})
export class StepTextSidebarComponent implements OnInit, OnDestroy {

  private componentActive: boolean = false;

  public swatchColors: string[] = [];
  private _defaultSwatchColors: string[] = ['#ABF28A', '#8CD6FF', '#F3D361', '#F478A3', '#9488FF', '#000000', '#FFFFFF'];

  @Input()
  public selectedStep: StepResponse;

  @Input()
  public stepForm: FormGroup;

  @Input()
  public brandAlias: string;

  @Output()
  public textBackgroundColorChanged: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public titleChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private brandService: BrandService) {}

  public ngOnInit(): void {
    this.componentActive = true;
    this.initializeSwatchColors();
  }

  private initializeSwatchColors(): void {
    if (this.brandAlias) {
      this.brandService.getBrandByAlias(this.brandAlias).subscribe({
        next: (brand: BrandResponse) => {
          this.setSwatchColorsFromBrand(brand);
        },
        error: () => {
          this.swatchColors = this._defaultSwatchColors;
        }
      });
    } else {
      this.swatchColors = this._defaultSwatchColors;
    }
  }

  private setSwatchColorsFromBrand(brand: BrandResponse): void {
    const rawColors = [
      brand?.primaryBrandColor,
      brand?.secondaryBrandColor,
      brand?.highlightColorOne,
      brand?.highlightColorTwo,
      brand?.highlightColorThree
    ];
    
    console.log('Raw brand colors from API:', rawColors);
    
    const brandColors = rawColors
      .filter(color => this.isValidHexColor(color))
      .map(color => this.normalizeHexColor(color));
    
    console.log('Valid brand colors after filtering:', brandColors);

    // Always include black and white, and fallback to default colors if no brand colors available
    if (brandColors.length === 0) {
      this.swatchColors = this._defaultSwatchColors;
    } else {
      this.swatchColors = [
        ...brandColors,
        '#000000',
        '#FFFFFF'
      ];
    }
    
    console.log('Final swatch colors:', this.swatchColors);
  }

  private isValidHexColor(color: string): boolean {
    if (!color || typeof color !== 'string') {
      return false;
    }
    
    const trimmedColor = color.trim();
    if (!trimmedColor) {
      return false;
    }
    
    // Check if it's a valid hex color (3 or 6 digits, with or without #)
    const hexColorRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(trimmedColor);
  }

  private normalizeHexColor(color: string): string {
    const trimmedColor = color.trim();
    const withHash = trimmedColor.startsWith('#') ? trimmedColor : `#${trimmedColor}`;
    return withHash.toUpperCase();
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public get textBackgroundColor(): string {
    return this.stepForm?.get('textBackgroundColor')?.value;
  }

  public onTextBackgroundColorChange(event: any): void {
    if (!this.stepForm?.get('textBackgroundColor'))
    {
      return;
    }
    
    if (event?.color)
    {
      this.stepForm.patchValue({ textBackgroundColor: event.color.hex});
      this.textBackgroundColorChanged.emit();
    }

    let isValidHexColor = /^#([A-Fa-f0-9]{6})$/.test(event?.target?.value || "");

    if (isValidHexColor)
    {
      this.stepForm.patchValue({ textBackgroundColor: event.target.value});
      this.textBackgroundColorChanged.emit();
    }
  }

  public onTitleChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.titleChanged.emit(target.value);
  }

  public onTitleClear(): void {
    this.titleChanged.emit("");
  }

  public onSwatchClicked(color: string): void {
    this.stepForm.patchValue({ textBackgroundColor: color});
    this.textBackgroundColorChanged.emit();
  }
}
