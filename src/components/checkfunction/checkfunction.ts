import { Directive } from '@angular/core';

/**
 * Generated class for the Checkfunction directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[checkfunction]' // Attribute selector
})
export class Checkfunction {

  constructor() {
    console.log('Hello Checkfunction Directive');

  }

  ngOnInit(){

    // alert("tot");
  }

}
