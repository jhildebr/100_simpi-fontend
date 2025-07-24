# Simpi Frontend Code Rules & Style Guide

## Project Overview

This is a multi-project Angular workspace with three main projects:
- **simpi-frontend-web**: Web application (Bootstrap + Angular)
- **simpi-frontend-mobile**: Mobile application (Ionic + Angular) 
- **simpi-frontend-common**: Shared library for common components and services

## Code Formatting Standards

### Indentation & Spacing
- Use **2 spaces** for indentation (no tabs)
- Add trailing commas in multi-line arrays and objects
- Use semicolons at end of statements
- Add spaces around operators: `x + y`, `x === y`
- Arrow functions with proper spacing: `() => {}`

### Bracket Style
- Opening braces on same line: `if (condition) {`
- Closing braces on new line aligned with opening statement
- Object literals with proper spacing: `{ key: value }`

### String Quotes
- Use **single quotes** for strings in TypeScript (as per tslint config)
- Use double quotes in HTML templates

## Naming Conventions

### Variables & Methods
- Use **camelCase** for all variables and methods
- Prefix private members with underscore: `_userInfo`, `_destroyed`
- Use descriptive names: `initializeRendering()`, `handlePointerDown()`
- Boolean variables with "is/has/can" prefixes: `isLoaded`, `hasData`, `canEdit`

### Classes & Interfaces
- Use **PascalCase** for classes and interfaces
- Add descriptive suffixes: `Service`, `Component`, `Module`, `Guard`
- Interface names without "I" prefix: `UserInfo` not `IUserInfo`

### Files & Directories
- Use **kebab-case** for file and directory names
- Consistent file suffixes:
  - `.service.ts` for services
  - `.component.ts` for components  
  - `.module.ts` for modules
  - `.model.ts` for data models
  - `.guard.ts` for route guards

### Constants
- Use **SCREAMING_SNAKE_CASE** for constants: `MEDIATYPE_IMAGE`, `API_BASE_URL`

## Component Structure

### Component Organization
```typescript
@Component({
  selector: "sim-component-name",  // web prefix: "sim-", mobile prefix: "app-"
  templateUrl: "./component-name.component.html",
  styleUrls: ["./component-name.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush  // prefer OnPush when possible
})
export class ComponentNameComponent implements OnInit, OnDestroy {
  // 1. Input/Output properties
  @Input() inputProperty: string;
  @Output() outputEvent = new EventEmitter<any>();
  
  // 2. ViewChild references
  @ViewChild('elementRef') elementRef: ElementRef;
  
  // 3. Public properties
  public publicProperty: string;
  
  // 4. Private properties
  private _privateProperty: string;
  
  // 5. Constructor with dependency injection
  constructor(
    private service: SomeService,
    private cdr: ChangeDetectorRef
  ) {}
  
  // 6. Lifecycle hooks (in order)
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
  
  // 7. Public methods
  public publicMethod(): void {}
  
  // 8. Private methods
  private _privateMethod(): void {}
}
```

### Lifecycle Method Order
1. `ngOnInit`
2. `ngAfterViewInit` 
3. `ngAfterContentInit`
4. `ngOnDestroy`

## Import/Export Standards

### Import Organization
```typescript
// 1. Angular core imports (alphabetical)
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";

// 2. Angular feature imports
import { Router } from "@angular/router";

// 3. Third-party library imports
import { Observable } from "rxjs";

// 4. Application imports (from shared library)
import { UserService } from "simpi-frontend-common";

// 5. Relative imports
import { LocalService } from "./local.service";
```

### Export Patterns
- Use named exports: `export class ComponentName`
- Create barrel exports in `index.ts`: `export * from './component';`
- Avoid default exports

## Service Patterns

### Service Structure
```typescript
@Injectable({ providedIn: 'root' })  // Prefer tree-shakable services
export class ServiceName extends BaseService {
  private readonly _apiUrl = 'https://api.example.com';
  private _dataSubject = new BehaviorSubject<Data>(null);
  
  // Expose observables with $ suffix
  public data$ = this._dataSubject.asObservable();
  
  constructor(private http: HttpClient) {
    super();
  }
  
  public getData(): Observable<Data> {
    return this.http.get<Data>(`${this._apiUrl}/data`);
  }
}
```

### RxJS Patterns
- Use BehaviorSubject for state management
- Observable properties with `$` suffix: `userInfo$`
- Prefer operators: `map`, `tap`, `shareReplay`, `takeWhile`
- Use async/await for simple HTTP calls, observables for streams

## Styling Standards (SCSS)

### CSS Custom Properties
```scss
:root {
  --simpi-primary: #2ac2d6;
  --simpi-text: #707070;
  --simpi-background: #ffffff;
}
```

### BEM-like Naming
```scss
.sim-component {
  &__element {
    color: var(--simpi-text);
  }
  
  &--modifier {
    background: var(--simpi-primary);
  }
}
```

### SCSS Best Practices
- Maximum 3 levels of nesting
- Use variables for repeated values: `$primary: #2ac2d6;`
- Create mixins for reusable styles
- Prefer CSS custom properties for theming

## Module Organization

### Feature Modules
```typescript
@NgModule({
  declarations: [ComponentName],
  imports: [CommonModule, SharedModule],
  providers: [ServiceName],
  exports: [ComponentName]
})
export class FeatureModule {}
```

### Lazy Loading
```typescript
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];
```

## Documentation Standards

### JSDoc Comments
```typescript
/**
 * Brief description of the method or class
 * 
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @example
 * ```typescript
 * const result = methodName('example');
 * ```
 */
public methodName(paramName: string): string {
  return paramName;
}
```

### Inline Comments
- Use `//` for single-line comments
- Keep comments concise and relevant
- Use `// TODO:` for future improvements
- Avoid obvious comments: `// increment i` is unnecessary

## Error Handling

### Service Error Handling
```typescript
public getData(): Observable<Data> {
  return this.http.get<Data>(this.apiUrl).pipe(
    catchError(error => {
      console.error('Error fetching data:', error);
      return throwError(() => new Error('Failed to fetch data'));
    })
  );
}
```

### Component Error Handling
```typescript
ngOnInit(): void {
  this.service.getData().subscribe({
    next: data => this.data = data,
    error: error => this.handleError(error)
  });
}

private handleError(error: any): void {
  // Log error and show user-friendly message
  console.error('Component error:', error);
  this.showErrorMessage('Something went wrong. Please try again.');
}
```

## Testing Standards

### Component Testing
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentName],
      imports: [CommonModule]
    });
    
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Performance Guidelines

### Change Detection
- Use `OnPush` change detection when possible
- Implement `TrackByFunction` for `*ngFor` loops
- Unsubscribe from observables in `ngOnDestroy`

### Memory Management
```typescript
export class ComponentName implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.service.data$
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
```

## Build & Deployment

### Environment Configuration
- Use environment files for configuration: `environment.ts`, `environment.prod.ts`
- Never commit sensitive data (API keys, passwords)
- Use proxy configuration for development: `proxy.config.json`

### Build Commands
```bash
# Development builds
npm run web          # Web development server
npm run mobile       # Mobile development server

# Production builds  
npm run buildweb     # Web production build
npm run buildandroid # Android build
npm run buildios     # iOS build
```

## Git Workflow

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Keep first line under 50 characters
- Use imperative mood: "Add feature" not "Added feature"

### Branch Naming
- Feature branches: `feature/feature-name`
- Bug fixes: `bugfix/issue-description`
- Hotfixes: `hotfix/critical-issue`

---

**Last Updated:** July 2025
**Version:** 1.0