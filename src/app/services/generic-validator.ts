import { FormGroup } from '@angular/forms';

const VALIDATION_MESSAGES = {
  emailAddress: {
    required: 'Required',
    email: 'Email is invalid'
  },
  phoneNumber: {
    required: 'Required',
    pattern: 'Only numbers allowed'
  },
  fax: {
    required: 'Required',
    pattern: 'Only numbers allowed'
  }
};

export class GenericValidator {
  // By default the defined set of validation messages is pass but a custom message when the class is called can also be passed
  constructor(private validationMessages: { [key: string]: { [key: string]: string } } = VALIDATION_MESSAGES) {}

  // this will process each formcontrol in the form group
  // and then return the error message to display
  // the return value will be in this format `formControlName: 'error message'`;
  processMessages(container: FormGroup, submitted?: boolean): { [key: string]: string} {
    const messages : any = {};
    // loop through all the formControls
    for (const controlKey in container.controls) {
      if (Object.prototype.hasOwnProperty.call(container.controls, controlKey)) {
        // get the properties of each formControl
        const controlProperty = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (controlProperty instanceof FormGroup) {
          const childMessages = this.processMessages(controlProperty);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if (((controlProperty.dirty || controlProperty.touched) && controlProperty.errors) || (submitted && controlProperty.errors)) {
              // loop through the object of errors
              Object.keys(controlProperty.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}