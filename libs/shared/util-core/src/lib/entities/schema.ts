export interface User {
  id: string;
  email: string;
  name: string | null;
  surname: string | null;
  dateStarted: Date | null;
  dateEnded: Date | null;
  nif: string | null;
  nir: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  phone: string | null;
  mobile: string | null;
  position: string | null;
  department: string | null;
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
  Tutorships: Tutorship[] | null;
  Authorizations: Authorization[] | null;
  Sanctions: Sanction[] | null;
  Invoices: Invoice[] | null;
  Students: Student[] | null;
  Files: File[] | null;
  Diaries: Diary[] | null;
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

export interface Student {
  id: string;
  name: string;
  surname: string | null;
  email: string;
  password: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  admitted: number;
  ingressed: number;
  graduated: number;
  birthdate: Date | null;
  ingressedAt: Date | null;
  inactiveAt: Date | null;
  observations: string | null;
  allergies: string | null;
  diseases: string | null;
  course: string | null;
  typeStudies: number | null;
  studies: string | null;
  turn: string | null;
  gender: number | null;
  motiveIngressed: string | null;
  isNew: number | null;
  photo: string | null;
  code: string | null;
  nif: string | null;
  nir: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  phone: string | null;
  mobile: string | null;
  block: string | null;
  floor: string | null;
  room: string | null;
  bed: string | null;
  Guardians: Guardian[] | null;
  Tutorships: Tutorship[] | null;
  Authorizations: Authorization[] | null;
  Sanctions: Sanction[] | null;
  Invoices: Invoice[] | null;
  Users: User[] | null;
  Attendances: Attendance[] | null;
  Files: File[] | null;
  StudentSeasons: StudentSeason[] | null;
  Diaries: Diary[] | null;
}

export interface Guardian {
  id: string;
  name: string;
  surname: string | null;
  email: string | null;
  password: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  nif: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  phone: string | null;
  mobile: string | null;
  observations: string | null;
  Students: Student[] | null;
  Files: File[] | null;
}

export interface Tutorship {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  date: Date | null;
  name: string | null;
  content: string | null;
  notes: string | null;
  userId: string | null;
  User: User | null;
  studentId: string | null;
  Student: Student | null;
}

export interface Authorization {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  name: string | null;
  date: Date | null;
  from: Date | null;
  to: Date | null;
  content: string | null;
  notes: string | null;
  userId: string | null;
  User: User | null;
  studentId: string | null;
  Student: Student | null;
}

export interface Sanction {
  id: string;
  type: number;
  description: string | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  date: Date | null;
  name: string | null;
  studentId: string | null;
  Student: Student | null;
  userId: string | null;
  User: User | null;
}

export interface Invoice {
  id: string;
  code: string | null;
  date: Date | null;
  description: string | null;
  amount: number | null;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  january: number | null;
  february: number | null;
  march: number | null;
  april: number | null;
  may: number | null;
  june: number | null;
  july: number | null;
  august: number | null;
  september: number | null;
  october: number | null;
  november: number | null;
  december: number | null;
  solicitaBeca: number | null;
  becaConcedida: number | null;
  tipoBeca: string | null;
  obligadoPagoPrecioPublico: number | null;
  localizador: string | null;
  solicitaBonificacion: number | null;
  bonificacionConcedida: string | null;
  seasonId: string | null;
  Season: Season | null;
  studentId: string | null;
  Student: Student | null;
  userId: string | null;
  User: User | null;
}

export interface Attendance {
  id: string;
  date: Date;
  status: number;
  type: number;
  subtype: number;
  from: Date | null;
  to: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  studentId: string | null;
  Student: Student | null;
}

export interface File {
  id: string;
  name: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  type: number | null;
  url: string | null;
  userId: string | null;
  User: User | null;
  studentId: string | null;
  Student: Student | null;
  guardianId: string | null;
  Guardian: Guardian | null;
}

export interface Season {
  id: string;
  name: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  Invoices: Invoice[] | null;
  StudentSeasons: StudentSeason[] | null;
}

export interface StudentSeason {
  id: string;
  studentId: string;
  seasonId: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  from: Date | null;
  to: Date | null;
  active: number;
  Student: Student;
  Season: Season;
}

export interface Diary {
  id: string;
  code: string | null;
  title: string | null;
  description: string | null;
  content: string | null;
  type: number;
  date: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  active: number;
  studentId: string | null;
  Student: Student | null;
  userId: string | null;
  User: User | null;
}
