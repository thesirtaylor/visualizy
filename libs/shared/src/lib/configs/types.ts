import { Path } from '@nestjs/config';

export type Choose<
  T extends Record<string | number, any>,
  K extends Path<T>,
> = K extends `${infer U}.${infer Rest}`
  ? Rest extends Path<T[U]>
    ? Choose<T[U], Rest>
    : never
  : T[K];
