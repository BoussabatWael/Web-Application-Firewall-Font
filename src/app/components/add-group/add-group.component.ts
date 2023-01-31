import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { Group } from 'src/app/model/group';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { GroupsService } from 'src/app/services/groups.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent implements OnInit {
  user: any;
  d: any;
  acc: any;
  account: any;
  public groupForm!: FormGroup;
  public CategoryFormAdd!: FormGroup;
  AccountsList: Account[] = [];
  CategoriesList: Category[] = [];
  userLogs: UsersLogs = new UsersLogs();
  group: Group = new Group();
  category: Category = new Category();
  submitted = false;
  submitted1 = false;
  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private categoryService: CategoriesService,
    private groupService: GroupsService,
    private usersLogsService: UsersLogsService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.groupForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      status: ['', Validators.required],
      start_date: ['', Validators.required],
      account: this.fb.group({
        id: ['', Validators.required],
      }),
      categories: this.fb.group({
        id: [''],
      }),
    });
    this.CategoryFormAdd = this.fb.group({
      id: [''],
      classe: [''],
      name: ['', Validators.required],
      account: this.fb.group({
        id: ['', Validators.required],
      }),
    });
  }
  getAllAccounts() {
    this.accountsService.getAllAccounts().subscribe(
      (result) => {
        this.AccountsList = result;
      },
      (error) => {}
    );
  }
  getAllCategories(account_id: any) {
    this.categoryService.getAllCategories(account_id).subscribe(
      (result) => {
        this.CategoriesList = result;
      },
      (error) => {}
    );
  }

  getAllGroups() {}

  ngOnInit(): void {
    if (localStorage.getItem('user') === null) {
      this.router.navigateByUrl('');
    }
    this.user = localStorage.getItem('user');
    this.d = JSON.parse(this.user);
    this.acc = this.d['account'];
    this.account = JSON.stringify(this.acc);

    this.getAllGroups();
    this.getAllAccounts();
    this.getAllCategories(this.acc.id);

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (
      parent.getElementsByTagName('LABEL').length &&
      !parent.getElementsByClassName('required-asterisk').length
    ) {
      parent.getElementsByTagName('LABEL')[0].innerHTML +=
        '<span class="required-asterisk">*</span>';
    }
  }
  get form() {
    return this.groupForm.controls;
  }
  get categoryForm() {
    return this.CategoryFormAdd.controls;
  }

  addGroup() {
    debugger;
    this.groupForm.patchValue({ account: this.acc });
    let data = this.groupForm.value;
    if (this.groupForm.invalid || this.groupForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!',
      });
      return;
    }
    if (
      this.groupForm.value.categories.id == '' ||
      this.groupForm.value.categories.id == null
    ) {
      data.categories = undefined;
    }
    this.groupService.saveGroup(data).subscribe(
      (result) => {
        this.group = result;
        this.CreateLogs('create', new Date(), 4, this.group.id!, this.d, 4);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Group Added successfully',
        });
        this.router.navigateByUrl('/groups');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }

  addCategory() {
    this.CategoryFormAdd.patchValue({ account: this.acc });
    let data = this.CategoryFormAdd.value;
    //data.account = this.acc
    data.classe = 1;

    if (
      this.CategoryFormAdd.invalid ||
      this.CategoryFormAdd.value.length == 0
    ) {
      this.submitted1 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!',
      });
      return;
    } else {
      this.categoryService.addCategory(data).subscribe(
        (result) => {
          this.category = result;

          this.CreateLogs(
            'create',
            new Date(),
            19,
            this.category.id!,
            this.d,
            4
          );

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Category Added successfully',
          });
          this.getAllCategories(this.acc.id);
          this.onSubmit();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong !',
          });
        }
      );
    }
  }
  openModalCategory(targetModal: any, category: Category) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.getAllCategories(this.acc.id);
  }

  onSubmit() {
    this.modalService.dismissAll();
    this.CategoryFormAdd.reset();
  }

  CreateLogs(
    action: String,
    action_date: Date,
    element: number,
    element_id: number,
    users: User,
    source: number
  ) {
    this.userLogs.action = action;
    this.userLogs.action_date = action_date;
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5, rules_instances=6
    this.userLogs.element = element;
    this.userLogs.element_id = element_id;
    this.userLogs.users = users;
    // /account = 0, /users=1, /servers=2, /rules=3, /groups=4, /policies=5
    this.userLogs.source = source;

    this.usersLogsService.saveUserLogs(this.userLogs).subscribe(
      (result) => {},
      (error) => {}
    );
  }
}
