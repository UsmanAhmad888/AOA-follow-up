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
  contactDetailsForm: FormGroup;
  @Input() contact:any;

  @Output() contactEvent = new EventEmitter<string>();

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.validationMessages = ContactDetailsErrors;
    this.genericValidator = new GenericValidator(this.validationMessages);
    // this.contactDetailsForm = this.contact;
    this.inItForm()
  }
  
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(this.contactDetailsForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe((value: any) => {
      this.displayMessage = this.genericValidator.processMessages(this.contactDetailsForm);
    });
  }
  
  changeDataValidation(dataType:'mail' | 'email' | 'fax' | 'phone'){
    this.contactDetailsForm=this.fb.group({
      emailAddress: [this.contact.emailAddress || '',dataType=='email' || dataType=='mail' ?[Validators.required]:[] ],
      phoneNumber: [this.contact.phoneNumber || '',dataType=='phone' ? [Validators.required]:[]],
      fax: [this.contact.fax || '',dataType=='fax' ? [Validators.required]:[]]
    })
  }

  inItForm() {
    // setTimeout(() => {
    //   console.log("contact form init",this.contact);
      
      this.contactDetailsForm = this.fb.group({
        emailAddress: [this.contact.emailAddress || '',  ],
        phoneNumber: [this.contact.phoneNumber || ''],
        fax: [this.contact.fax || '',[Validators.required]]
      });
    // }, 400);
  }

  onSubmit() {
    if(this.contactDetailsForm.valid) {
      console.log("CONTACT-DETAILS", this.contactDetailsForm.value);
    }
  }

  saveContact() {
    if(this.contactDetailsForm.valid){

      this.contactEvent.emit(this.contact);
    }else{
      this.displayMessage = this.genericValidator.processMessages(this.contactDetailsForm, true);

    }
    // if(this.isFormValid(this.contact)){
    // }
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
