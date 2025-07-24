import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { StepResponse } from '../../../../../simpi-frontend-common/src/lib/models';

@Injectable({
  providedIn: 'root'
})
export class JsonLdService {

  static scriptType = 'application/ld+json';
  static className = 'structured-data';

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  /**
   * Adds structured data to the document's head.
   *
   * The content of the structured data is created from the simpi and its steps.
   * It is appended in json-ld format and describes the simpi as a HowTo.
   *
   * @param simpiTitle Title of the simpi that will be used as the title for the HowTo.
   * @param steps Steps that will be used for the HowTo steps.
   */
  insertStructuredData(simpiTitle: string, steps: StepResponse[]): void {
    let script: HTMLScriptElement;
    let shouldAppend = false;
    if (this._document.head.getElementsByClassName(JsonLdService.className).length) {
      script = this._document.head.getElementsByClassName(JsonLdService.className)[0] as HTMLScriptElement;
    } else {
      script = this._document.createElement('script');
      shouldAppend = true;
    }
    script.setAttribute('class', JsonLdService.className);
    script.type = JsonLdService.scriptType;

    const schema = this.createHowToFromSteps(simpiTitle, steps);
    script.text = JSON.stringify(schema);
    if (shouldAppend) {
      this._document.head.appendChild(script);
    }
  }

  /**
   * Removes all structured data with the class defined in `className` from the document's head.
   *
   * There is no 'change structured data' method. Therefore, to change the strucutred data, you can
   * call 1. removeStructuredData() and 2. insertStructuredData() with new parameters.
   */
  removeStructuredData(): void {
    Array.from(this._document.head.getElementsByClassName(JsonLdService.className))
      .forEach(element => this._document.head.removeChild(element));
  }

  /**
   * Creates a HowTo in JSON-LD schema from the given simpiTitle and steps.
   *
   * The required and optional parameters can be found at https://developers.google.com/search/docs/data-types/how-to
   *
   * @param simpiTitle The title used for the HowTo
   * @param steps Each (not deleted) step will be converted to a single HowToStep
   */
  private createHowToFromSteps(simpiTitle: string, steps: StepResponse[]): Record<string, any> {
    return {
      '@context': 'http://schema.org',
      '@type': 'HowTo',
      name: simpiTitle,
      step: steps.filter(step => !step.deleted).map(step => {
        return {
          '@type': 'HowToStep',
          name: step.title,
          text: step.description || step.title || step.stepId,
          image: step.thumbnailUrl
        };
      })
    };
  }

}
