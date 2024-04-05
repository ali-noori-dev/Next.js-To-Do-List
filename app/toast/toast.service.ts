import { IToastService } from "../lib/definitions";
import ToastAdaptor from "./toast.adaptor";

class ToastService {
  private readonly toast: IToastService;

  constructor(_toast: IToastService) {
    this.toast = _toast;
  }

  success(msg: string, id?: string) {
    this.toast.success(msg, id);
  }

  error(msg: string, id?: string) {
    this.toast.error(msg, id);
  }
}

const toastService = new ToastService(new ToastAdaptor());
export default toastService;
