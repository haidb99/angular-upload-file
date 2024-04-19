import { Component, EventEmitter, OnInit } from '@angular/core';
import { FileUploadService } from '../service/upload.service';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { catchError, forkJoin, tap, throwError } from 'rxjs';


// function readBase64(file: any): Promise<any> {
//   var reader = new FileReader();
//   var future = new Promise((resolve, reject) => {
//     reader.addEventListener("load", function () {
//       resolve(reader.result);
//     }, false);

//     reader.addEventListener("error", function (event) {
//       reject(event);
//     }, false);

//     reader.readAsDataURL(file);
//   });
//   return future;
// }
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  constructor(private fileUploadService: FileUploadService) {
    const uploaderOptions: FileUploaderOptions = {
      url: 'https://file.io',
      // isHTML5: true
    };

    this.uploader = new FileUploader(uploaderOptions);
  }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  fileObject: any;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: File[]) {
    const file: File = event[0];
    console.log(file);
  }
  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            this.uploader.addToQueue([file]);
          }
        }
      }
    }
  }

  uploadAll() {
    console.log("upload all");
    console.log(this.uploader.queue);
    this.uploader.clearQueue();

    // const uploadObservables = this.uploader.queue.map(item => {
    //   return this.fileUploadService.upload(item._file).pipe(
    //     tap(() => {
    //       console.log("Uploaded successfully");
    //       item.remove();
    //     }),
    //     catchError(error => {
    //       console.error(error);
    //       return throwError(error);
    //     })
    //   );
    // });
    // forkJoin(uploadObservables).subscribe(
    //   () => console.log('All uploads completed'),
    //   error => console.error('Error occurred during upload: ', error)
    // );
  }

  upload(item: any) {
    console.log(item);
    item.remove();
    // this.fileUploadService.upload(item._file).pipe(
    //   tap(() => {
    //     console.log("Uploaded successfully");
    //     item.remove();
    //   }),
    //   catchError(error => {
    //     console.error(error);
    //     return throwError(error);
    //   })
    // ).subscribe(
    //   () => console.log('uploads completed'),
    //   error => console.error('Error occurred during upload: ', error)
    // )
  }
}
