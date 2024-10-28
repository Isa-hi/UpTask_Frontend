import { TeamMember, User } from "../types";

export const isManager = (managerId: User['_id'], userId: TeamMember['_id']) => managerId === userId;