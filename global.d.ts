/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

declare module "next-auth" {
  interface User {
    id?: string | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    provider?: string | null | undefined;
    referral?: string | null | undefined;
    role?: string | undefined;
    access_token?: string | undefined;
  }

  interface Session {
    user: User;
  }
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  export interface JWT {
    id?: string | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    provider?: string | null | undefined;
    referral?: string | null | undefined;
    role?: string | undefined;
    access_token?: string | undefined;
  }
}
