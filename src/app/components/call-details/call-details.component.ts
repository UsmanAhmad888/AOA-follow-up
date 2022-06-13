import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/services/generic-validator';
import { CallDetailsErrors } from './callDetailsFormErrors';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.scss']
})
export class CallDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  @Output() callDetailsItems = new EventEmitter<any>();
  callDetails: any = {};
  @Input() vm: any=  {};
  callDetailsForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validationMessages = CallDetailsErrors;
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.inItForm()
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(this.callDetailsForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe((value: any) => {
      this.displayMessage = this.genericValidator.processMessages(this.callDetailsForm);
    });
  }

  inItForm() {
      this.callDetailsForm = this.fb.group({
        callDisposition: [this.vm.callDisposition || '', [Validators.required] ],
        spokeTo: [this.vm.spokeTo || '', [Validators.required]],
        comments: [this.vm.comments || '', [Validators.required]]
      });
  }

  addComment() {
    if(this.callDetailsForm.valid) {
      // this.callDetailsItems.emit(this.vm);
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.callDetailsItems.emit(this.callDetailsForm.value);
  
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
    else {
      this.displayMessage = this.genericValidator.processMessages(this.callDetailsForm, true);
    }
  }

}
