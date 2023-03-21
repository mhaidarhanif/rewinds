/* eslint-disable @typescript-eslint/ban-types */
export type Scalars = {
  ID?: string;
  String?: string;
  Boolean?: boolean;
  Int?: number;
  Float?: number;
};

// https://twitter.com/mattpocockuk/status/1622730173446557697
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// https://prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-getting-access-to-the-return-type-of-a-function
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
