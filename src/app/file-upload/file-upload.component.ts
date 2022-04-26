import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  @Input() requiredFileType: string;

  fileName: string = '';
  uploadProgress: number;
  fileUploadError = false;

  fileUploadSuccess = false;
  onValidatorChange = () => {};

  onChange = (fileName: string) => {};
  onTouched = () => {};
  disabled: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if(file) {
      this.fileName = file.name;
      console.log(this.fileName);

      const formData = new FormData();
      formData.append("thumbnail", file);
      this.http.post('/api/thumbnail-upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        catchError(err => {
          this.fileUploadError = true;
          return of(err);
        }),
        finalize(() => {
          this.uploadProgress = null;
        })
      )
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        } else if(event.type === HttpEventType.Response) {
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
          this.onValidatorChange();
        }
      });
    }
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  writeValue(value: string) {
    this.fileName = value
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if(this.fileUploadSuccess) return  null;

    let errors: any = {
      requiredFileType: this.requiredFileType
    }

    if(this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }
}
