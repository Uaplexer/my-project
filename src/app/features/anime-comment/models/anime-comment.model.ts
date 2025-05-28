import { BaseUser } from '@features/user/models/user.model';

export interface BaseComment {
  id: number;
  content: string;
  user: BaseUser;
  entityId: number;
  createdAt: Date;
}
