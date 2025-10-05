import type { Role } from "./role";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  created: string;            
  lastLogin?: string | null;  
}