import {FormControl} from '@angular/forms';

export function imageValidator(control: FormControl): Promise<{[key: string]: any}> {
  const img = new Image();

  let promise = new Promise(resolve => {
    img.onload = () => {
      resolve(true);
    };
    img.onerror = () => {
      resolve(false);
    };
  }).then(result => {
    return result ? null : {imageLinkInvalid: true};
  });

  img.src = control.value;
  return promise;
}