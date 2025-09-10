export interface User {
  id: string;
  email: string;
  name: string | null;
  surname: string | null;
  permissions: string | null;
  password: string | null;
  secure2FA: number | null;
  secure2FAMode: string | null;
  role: number | null;
  blockPermissions: number | null;
  photo: string | null;
  forgetToken: string | null;
  magicLinkToken: string | null;
  code2FA: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  roleId: string | null;
  Role: Role | null;
  UserSession: UserSession[] | null;
  UserPermissions: UserPermission[] | null;
}

export interface UserSession {
  id: string;
  id_user: string;
  tokenid: string;
  active: number;
  init_session: Date | null;
  last_change: Date | null;
  ip: string | null;
  user: User;
}

export interface ApiKeytoken {
  id: string;
  token: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  access_on: Date | null;
  ip: string | null;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  RolePermissions: RolePermission[] | null;
  Users: User[] | null;
}

export interface RolePermission {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  roleId: string | null;
  Role: Role | null;
  createdBy: string | null;
  deletedBy: string | null;
}

export interface UserPermission {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  userId: string | null;
  User: User | null;
  createdBy: string | null;
  deletedBy: string | null;
}
