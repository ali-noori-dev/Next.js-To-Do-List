import { GeneralErrorModel } from "../types/definitions";

export function isError(result: any): result is GeneralErrorModel {
  return (result as GeneralErrorModel).message !== undefined;
}
