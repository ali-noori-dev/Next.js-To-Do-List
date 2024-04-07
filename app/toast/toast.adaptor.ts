import { toast } from "react-toastify";
import { IToastService } from "../types/definitions";

class ToastAdaptor implements IToastService {
  success(msg: string, id?: string): void {
    toast.success(msg, {
      toastId: id,
    });
  }

  error(msg: string, id?: string): void {
    toast.error(msg, {
      toastId: id,
    });
  }
}

export default ToastAdaptor;
