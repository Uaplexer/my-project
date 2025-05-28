import { BaseUser } from '@features/user/models/user.model';

export interface BasePost {
  id: string;
  title: string;
  type: string;
  content: string;
  previewImage: string;
  userId: string;
}

export interface Post extends BasePost {
  user: BaseUser;
}
