import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtileService } from '../UtileService';

@Component({
  selector: 'app-manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.scss']
})
export class ManageDocumentsComponent implements OnInit {
  users: any[];
  docs: any[];
  sharedDocs: any[];
  LOGGED_IN_USER_ID: string;
  EDIT_DOC_ID: string;
  DELETE_DOC_ID: string;

  addDocForm: FormGroup;
  editDocForm: FormGroup;

  myUploads: any[];

  constructor(
    private UtileService: UtileService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.UtileService.allowOnlyAuthUser();

    this.users = this.UtileService.getFromLocalStorage("users");
    this.docs = this.UtileService.getFromLocalStorage("docs");
    this.sharedDocs = this.UtileService.getFromLocalStorage("sharedDocs");
    this.LOGGED_IN_USER_ID = this.UtileService.getFromLocalStorage("LOGGED_IN_USER_ID");

    this.addDocForm = this.fb.group({
      fileLabel: ['', [Validators.required]],
      fileName: ['', [Validators.required]]
    })

    this.myUploads = this.docs.filter(doc => doc.addedByUserId === this.LOGGED_IN_USER_ID);

    this.editDocForm = this.fb.group({
      fileLabel: ['', [Validators.required]]
    })


  }

  docEdit(id) {
    console.log("Edit Doc ID : ", id);
    this.EDIT_DOC_ID = id;

    this.editDocForm.patchValue({
      fileLabel: this.UtileService.getDocByID(this.EDIT_DOC_ID).label
    })
  }

  docEditOk() {
    let newFileLabel = this.editDocForm.get('fileLabel')?.value;

    if (this.EDIT_DOC_ID) {
      for (let i = 0; i < this.docs.length; i++) {
        if (this.docs[i].id == this.EDIT_DOC_ID) {
          this.docs[i].label = newFileLabel;
          break;
        }
      }
    }
    this.EDIT_DOC_ID = null;
    this.UtileService.setToLocalStorage("docs", this.docs);
  }

  docDelete(id) {
    console.log("Delete Doc ID : ", id);
    this.DELETE_DOC_ID = id;
  }

  docDeleteOk() {
    if (this.DELETE_DOC_ID) {
      this.docs = this.docs.filter(doc => doc.id !== this.DELETE_DOC_ID);
      // delete shared doc too
    }
    this.UtileService.setToLocalStorage("docs", this.docs);
    this.ngOnInit();
  }

  addUploadSave() {
    let fileLabel = this.addDocForm.get('fileLabel')?.value;
    let fileName = this.addDocForm.get('fileName')?.value;
    fileName = fileName.replace('C:\\fakepath\\', ''); // To clean up the C:\fakepath\

    let fileObj = {
      id: "D" + Number(new Date()), // Epoch as unique ID
      addedByUserId: this.LOGGED_IN_USER_ID,
      fileName: fileName,
      label: fileLabel,
    }

    this.docs.push(fileObj);
    this.UtileService.setToLocalStorage("docs", this.docs);

    this.ngOnInit();
  }


}
