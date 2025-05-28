export interface Identity<T> {
  id: T;
}

export interface Auditable<T> extends Identity<T> {
  createdAt: Date;
  updatedAt: Date;
}

export interface TitledEntity extends Identity<number> {
  title: string;
}
