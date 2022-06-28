import { Component, EventEmitter, Inject, Injectable, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Rule } from '../model/rule';
import { RuleService } from '../services/rules/rule.service';


@Component({
  selector: 'app-dialog-add-community-rules',
  templateUrl: './dialog-add-community-rules.component.html',
  styleUrls: ['./dialog-add-community-rules.component.scss']
})

@Injectable({providedIn : "root"})

export class DialogAddCommunityRulesComponent implements OnInit {

  newRule: Rule = {
    ruleId: 0,
    description: '',
    community: 0
  }
  errorMessage: any;
  status: string;

  ruleForm:FormGroup;

  constructor(public dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: number, private ruleService:RuleService, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.ruleForm = this.fb.group({
      ruleDescription: ['', Validators.required ]
    });

  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  addCommunityRules(): void {

    this.newRule.community = this.data;

    if(this.ruleForm.valid){
      this.ruleService.save(this.newRule).subscribe({
        next: data => {
            console.log(data);
            this.status = 'Add successful';
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    });

      this.closeDialog();
    }else{
      confirm("ERROR")
    }



  }

}
