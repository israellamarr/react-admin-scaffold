// @flow
import type { TypeSelectList } from '../index';


export function selectListValidate ( field: string, datas: Array<TypeSelectList> ): boolean {
  const values = datas.filter( data => data.value === field ).length;

  return values === 1;
}
