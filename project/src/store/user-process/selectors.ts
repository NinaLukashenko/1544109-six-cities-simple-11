import { NameSpace } from '../../consts/api';
import { AuthorizationStatus } from '../../consts/app';
import { State } from '../../types/state';
import { AuthUser } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUser = (state: State): AuthUser | null => state[NameSpace.User].user;
