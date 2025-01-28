import { ToastrService } from 'ngx-toastr';

export function handleMessageError(error: Error | undefined, type: string, toastr: ToastrService) : boolean {
  if (error) {
    toastr.warning(error.message, type);
    return false;
  }
  return true;
}
