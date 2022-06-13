import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'aoc-container',
  templateUrl: './aoc-container.component.html',
  styleUrls: ['./aoc-container.component.scss']
})

export class AocContainerComponent implements OnInit {
  vm: any = null;
  guid: number;
  idFound: boolean = true;
  errMsg: string = 'No result Found'
  loader: boolean;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private acRouter: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.acRouter.queryParamMap.subscribe((params: ParamMap | any) => {
      this.guid = params.get('guid');
      this.guid ? this.fetchAOC(this.guid) : this.idFound = false;
    })
  }

  fetchAOC(guid: any): void {

    // GUID is static for now due to the backend but will be made dynamic in future.
    this.spinner.show();
    this.apiService.fetchAOC(guid).subscribe(res => {
      this.vm = res;
      this.idFound = true;

      this.spinner.hide();
    },
      err => {
        this.handleApiError(err , true);
      }

    )
  }

  private handleApiError(err: any , isMain) {
    isMain  ? this.idFound = false : null;
    if (err.status === 400) {
      this.errMsg = 'Something went wrong.';
      this.toastr.error("", this.errMsg, {
        messageClass: 'toast-msg'
      });
    } else if (err.status === 401) {
      this.toastr.error('Session Expired! Please login again',);
      this.authService.clearToken();
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.guid } });
    } else {
      this.errMsg = 'Something went Wrong.';
      this.toastr.error('error!', this.errMsg);
    }
    this.spinner.hide();
  }

  saveContact(event) {
    // this.spinner.show();
    this.loader=true
    this.apiService.updateContact(event).subscribe(res => {
      setTimeout(() => {        
        this.loader=false
      }, 2000);
      // this.spinner.hide();
      this.toastr.success('Success! Information updated successfully!', '');
    },
      err => {
        this.handleApiError(err ,false);
      }

    )
  }

  addComment(event) {
    this.spinner.show();
    event.createdBy = localStorage.getItem('au$#n');
    this.apiService.addComment(this.getCommentPayload(event)).subscribe(res => {
      this.toastr.success('Success!', 'Comment added successfully!');
      this.fetchAOC(this.guid)
    },
      err => {
        this.handleApiError(err , false);
      }

    )
  }

  getCommentPayload(payload){
    return {
        "requestID": this.vm.requestID,
        "clientId": this.vm.clientId,
        "projectId": this.vm.projectId,
        "cadenceIteration": parseInt(this.vm.cadenceIteration.charAt(0)), // as api is expecting this value 1 not 1st
        "comments": payload.comments,
        "callDisposition": parseInt(payload.callDisposition),
        "spokeTo": payload.spokeTo,
        "createdBy": localStorage.getItem('au$#n'),
        "customerId" : payload.hcpId

    }
  }

}
