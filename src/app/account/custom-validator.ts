import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { switchMap, map, take, debounceTime } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Observable } from 'rxjs';
@Injectable()
export class CustomValidator {

    static debouncer: any;

    static uniqueUser(account: AccountService) {
        return (control: AbstractControl) => {
            clearTimeout(this.debouncer);
            return new Promise(resolve => {
                this.debouncer = setTimeout(() => {
                    account.checkvalidUser(control.value).subscribe((data) => {
                        if (!data) {
                            resolve({ emailExists: true });
                        } else {
                            resolve(null);
                        }
                    }, (err) => {
                        resolve({ emailExists: true });
                    });

                }, 1000);

            });
        };
    }

}