import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { User } from '../models/user/user';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FollowersModalComponent } from '../_modals/followers/followers-modal/followers-modal.component';
import { FollowingsModalComponent } from '../_modals/followings/followings-modal/followings-modal.component';
import { MessagesService } from '../_services/messages.service';
import { Message } from '../models/message';
import { UsersSearchComponent } from '../_modals/user/users-search/users-search.component';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserInfo } from '../models/user/userInfo';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  userJwt: UserJwt | null = null;
  isChatVisible: boolean = false;
  conversations: Message[] = [];
  recipient: User | null = null;
  selectedFile: File | null = null;
  selectedImage!: SafeResourceUrl;
  userInfo: UserInfo | null = null;

  userIdFromRoute: string = '';

  constructor(public dialogRef: MatDialog, public usersService: UsersService, private accountService: AccountService,
    private activatedRoute: ActivatedRoute, private messagesService: MessagesService, private toastr: ToastrService,
    private sanitizer: DomSanitizer) {
    this.accountService.currentUser$.subscribe((userJwt) => {
      this.userJwt = userJwt;
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getConversations();
  }

  followUser() {
    if(!this.userIdFromRoute) {
      this.toastr.error('An error occured.Reload page');
      return;
    }

    if(!this.user) {
      this.toastr.error('An error occured.Reload page');
      return;
    }

    this.usersService.followUserById(this.userIdFromRoute, this.user?.userName).subscribe((response) => {
      console.log(response);
      this.toastr.info('Successfully subscribed');
    }, (error) => {
      this.toastr.error(error.error);
      console.log(error);
    });
  }

  openFollowersModal() {
    this.dialogRef.open(FollowersModalComponent, {
      height: '550px',
      width: '400px',
      data: {
        userId: this.userJwt?.id
      },
    });
  }

  openFollowingsModal() {
    this.dialogRef.open(FollowingsModalComponent, {
      height: '550px',
      width: '400px',
      data: {
        userId: this.userIdFromRoute
      },
    });
  }

  openUsersSearchModal() {
    this.dialogRef.open(UsersSearchComponent, {
      height: '550px',
      width: '400px',
    });
  }

  getUser() {
    this.userIdFromRoute = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (this.userIdFromRoute) {
      this.usersService.getUserById(this.userIdFromRoute).subscribe((user) => {
        this.user = user;
        this.recipient = user;
        this.userInfo = new UserInfo(user.userName, user.email, user.firstName ?? '', user.lastName ?? '', user.description ?? '');
        console.log(user);
      }, (error) => {
        console.log(error);
      })
    }
  }

  getConversations() {
    if (this.userJwt) {
      this.messagesService.getConversations().subscribe({
        next: (conversations) => {
          this.conversations = conversations;
          console.log(conversations);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  initiateChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  startChatting(message: Message) {
    const recipientId = message.senderId !== this.user!.id ? message.senderId : message.recipientId;
    this.usersService.getUserById(recipientId).subscribe((user) => {
      this.recipient = user;
      this.isChatVisible = true;
    });
  }

  changeUserProfileImage() {
    const formData = new FormData();

    formData.append('profilePhoto', this.selectedFile!);

    this.usersService.changeProfilePhoto(formData).subscribe({
      next: (response) => {
        if (!this.user) {
          return;
        }
        let userJwtWithUpdatedPhotoUrl = this.userJwt;
        userJwtWithUpdatedPhotoUrl!.profilePhotoUrl = response.photoUrl;

        this.user.profilePhotoUrl = response.photoUrl
        this.accountService.setCurrentUser(userJwtWithUpdatedPhotoUrl!);

        this.toastr.info('Profile photo changed successfully');
      },
      error: (error) => {
        this.toastr.error(error.error);
        console.log(error);
      }
    });
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onSelect(event: any) {
    const files = event.target.files || event.dataTransfer.files;

    if (!files) {
      return;
    }

    this.selectedFile = files[0];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        this.selectedImage = imageUrl;
      };
      reader.readAsDataURL(file);
    }
    this.changeUserProfileImage();
  }

  updateUserInfo() {
    if (!this.userInfo) {
      return;
    }

    this.usersService.updateUsersInfo(this.userInfo).subscribe({
      next: (response) => {
        console.log("RESPONSE")
        console.log(response);

        if (!this.user) {
          return;
        }

        let updatedUserJwt = this.userJwt;
        updatedUserJwt!.firstName = response.firstName;
        updatedUserJwt!.lastName = response.lastName;
        updatedUserJwt!.description = response.description;
        updatedUserJwt!.email = response.email;
        updatedUserJwt!.username = response.userName;

        this.user = response;
        this.accountService.setCurrentUser(updatedUserJwt!);
        
        this.toastr.info('User info updated successfully');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    });

  }
}
