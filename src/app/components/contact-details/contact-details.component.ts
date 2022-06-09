import { Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/services/generic-validator';
import { ContactDetailsErrors } from './contactDetailsFormErrors';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  @Input() contact:any;
  contactDetailsForm: any;

  @Output() contactEvent = new EventEmitter<string>();

  displayMessage: { [key: string]: string } = {};
  // private validationMessages: { [key: string]: { [key: string]: string } };
  // private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder) {
    // this.validationMessages = ContactDetailsErrors;
    // this.genericValidator = new GenericValidator(this.validationMessages);
  }
  
  ngOnInit(): void {
    this.contactDetailsForm = this.contact;
  }
  
  ngAfterViewInit(): void {
    // const controlBlurs: Observable<any>[] = this.formInputElements
    //   .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    // merge(this.contactDetailsForm.valueChanges, ...controlBlurs).pipe(
    //   debounceTime(500)
    // ).subscribe((value: any) => {
    //   this.displayMessage = this.genericValidator.processMessages(this.contactDetailsForm);
    // });
  }

  inItForm() {
    // setTimeout(() => {
    //   console.log("contact form init",this.contact);
      
      // this.contactDetailsForm = this.fb.group({
      //   emailAddress: [this.contact.emailAddress || '' ],
      //   phoneNumber: [this.contact.phoneNumber || ''],
      //   fax: [this.contact.fax || '']
      // });
    // }, 400);
  }

  onSubmit() {
    if(this.contactDetailsForm.valid) {
      console.log("CONTACT-DETAILS", this.contactDetailsForm.value);
    }
  }

  saveContact() {
    if(this.isFormValid(this.contact)){
      this.contactEvent.emit(this.contact);
    }
  }
  isFormValid({contactPrefereceCode , phoneNumber , email , fax}){
    if(contactPrefereceCode === 6303 && phoneNumber === '' ){
      return false;
    } else if(contactPrefereceCode === 6301 && email === '') {
      return false;
    } else if(contactPrefereceCode === 6302 && fax === '') {
      return false;
    } 
    return true;
  }

}
