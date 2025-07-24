import { UserStatusTypeRequest } from './userStatusTypeRequest';

export interface CreateUserRequest {
    id?: string;
    firstName: string;
    lastName: string;
    status: UserStatusTypeRequest;
}