import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sim-step-text-sidebar',
  templateUrl: './step-text-sidebar.component.html',
  styleUrls: ['./step-text-sidebar.component.scss']
})
export class StepTextSidebarComponent implements OnInit, OnDestroy {

  private componentActive: boolean = false;

  public swatchColors: string[] = ['#ABF28A', '#8CD6FF', '#F3D361', '#F478A3', '#9488FF', '#000000', '#ffffff'];

  @Input()
  public selectedStep: StepResponse;

  @Input()
  public stepForm: FormGroup;

  @Output()
  public textBackgroundColorChanged: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public titleChanged: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.componentActive = true;
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
