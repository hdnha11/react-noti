import toastr from 'toastr';

toastr.options.closeButton = true;
toastr.options.progressBar = true;

export function showSuccess(message) {
  toastr.success(message);
}

export function showWarning(message) {
  toastr.warning(message);
}

export function showError(message) {
  toastr.error(message);
}
