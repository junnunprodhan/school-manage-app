import { IClass } from "../services/tauriServices/classes";

interface ISelectOption { name: string; value: any }


export const classesToSelectOptions = (classes: IClass[]): ISelectOption[] => {
  return SelectOption.maker(classes, "name", "id");
};

export const classSectionsToSelectOptions = ():ISelectOption[] => {
  return [
    { name: "Section A", value: "A" },
    { name: "Section B", value: "B" },
    { name: "Section C", value: "C" },
  ];
};


// export const userTypesToSelectOptions = () : ISelectOption[] => {
//   return USER_TYPES.map(item => ({name: item, value: item.toUpperCase().replace(" ", "_")}));
// }
// export const gendersToSelectOptions = () : ISelectOption[] => {
//   return GENDER.map(item => ({name: item, value: item.toUpperCase().replace(" ", "_")}));
// }

export class SelectOption {
  static maker<T extends Record<any, any>, K extends keyof T>(data:T[], name: K, value: K): ISelectOption[] {
    return data.map(item => ({ name: item[name], value: item[value]}));
  }
}