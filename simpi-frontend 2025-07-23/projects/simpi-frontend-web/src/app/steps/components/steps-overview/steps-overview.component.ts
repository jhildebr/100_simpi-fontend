import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';
import { ChangeOrderRequest, StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { EMPTY_GUID } from '../../../../../../simpi-frontend-common/src/lib/shared/constants';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'sim-steps-overview',
  templateUrl: './steps-overview.component.html',
  styleUrls: ['./steps-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsOverviewComponent implements OnInit, OnDestroy, AfterViewChecked {
  private _componentActive: boolean = false;

  public dragging = {
    dragStartDelay: 500,
    draggableId: EMPTY_GUID,
    timer: undefined,
    selectedStepId: '',
  };

  @ViewChild('stepList')
  public stepList: ElementRef<HTMLDivElement>;

  @Input()
  public selectedStep: StepResponse;

  @Input()
  public steps: StepResponse[];

  @Input()
  public isCopied: boolean;

  @Output()
  public addStep: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public copyStep: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public pasteStep: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public selectStep: EventEmitter<StepResponse> = new EventEmitter<StepResponse>();

  @Output()
  public deleteStep: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public changeStepOrder: EventEmitter<ChangeOrderRequest[]> = new EventEmitter<ChangeOrderRequest[]>();

  @Output()
  public next: EventEmitter<void> = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  public ngOnInit(): void {
    this._componentActive = true;
    this.router.events.pipe(
      tap(ev => {
        if (ev instanceof NavigationStart) {
          this.selectStep.emit(null);
        }
      }),
      takeWhile(() => this._componentActive)
    ).subscribe();
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    const idsAndIndexes: ChangeOrderRequest[] = this.steps.map((x, i) => {
      return { objectId: x.stepId, positionIndex: i };
    });
    this.changeStepOrder.emit(idsAndIndexes);

  }

  public mousedown(stepId: string): void {
    this.dragging.draggableId = EMPTY_GUID;
    this.dragging.selectedStepId = stepId;
    this.dragging.timer = setTimeout(() => {
      this.dragging.draggableId = stepId;
    }, this.dragging.dragStartDelay);
  }

  public mouseup(e: MouseEvent | PointerEvent | TouchEvent): void {
    const target = e.target as HTMLElement;
    if (target.classList.contains('dropdown-toggle')) {
      return;
    }
    clearTimeout(this.dragging.timer);
    if (this.dragging.draggableId === EMPTY_GUID) {
      this.selectStepById(this.dragging.selectedStepId);
    }
  }

  public ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        if (propName === 'selectedStep' && change?.currentValue) {
          this.cdr.detectChanges();
          if ((change.previousValue as StepResponse)?.stepId !== (change.currentValue as StepResponse)?.stepId) {
            this.scrollToSelectedStep();
          }
        }
      }
    }
  }

  public selectStepById(stepId: string): void {
    if (stepId !== null) {
      const step = this.steps.find(x => x.stepId === stepId);
      if (step) {
        this.selectStep.emit(step);
      }
    }
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  private scrollToSelectedStep(): void {
    if (!this.stepList || !this.steps || !this.selectedStep) {
      return;
    }

    if (!this.steps.some(x => x.stepId === this.selectedStep.stepId)) {
      return;
    }

    let stepsToTheLeft: number = 0;
    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i].stepId !== this.selectedStep.stepId) {
        stepsToTheLeft++;
      } else {
        break;
      }
    }

    const scrollToPositionLeft: number = stepsToTheLeft / this.steps.length * this.stepList.nativeElement.scrollWidth
      - this.stepList.nativeElement.clientWidth / 2 + 35;
    this.stepList.nativeElement.scrollTo({ left: scrollToPositionLeft, behavior: 'smooth' });
  }

  public stepTrackBy(index, step: StepResponse): string {
    return step.stepId;
  }

}

