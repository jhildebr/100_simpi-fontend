import {SimpiResponse} from './http';

export interface SimpiGroup {
  groupName: string;
  simpis: SimpiResponse[];
}
