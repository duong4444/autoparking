import { GetUserType, Role } from 'src/common/types';
import { ForbiddenException } from '@nestjs/common';

export const checkRowLevelPermission = (
  user: GetUserType,
  requestedUid?: string | string[],
  roles: Role[] = ['admin'],
) => {
  // ko có req_uid thi` false
  if (!requestedUid) return false;

  // user_token_role là admin thì pass
  if (user.roles?.some((role) => roles.includes(role))) {
    return true;
  }

  // uids[] chứa req_uid
  const uids =
    typeof requestedUid === 'string'
      ? [requestedUid]
      : requestedUid.filter(Boolean);

  //phải là chủ của id mới pass     
  if (!uids.includes(user.uid)) {
    throw new ForbiddenException();
  }
};
