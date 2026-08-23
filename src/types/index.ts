export type OutreachMethod =
  | "Email"
  | "Phone"
  | "Meeting"
  | "Text";

export type OutreachStatus =
  | "Completed"
  | "Awaiting Response"
  | "Follow-Up Due"
  | "Scheduled";

export type Priority =
  | "Low"
  | "Medium"
  | "High";

export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Completed";

export interface OutreachRecord {
  id: number;
  studentName: string;
  program: "Upward Bound" | "Talent Search";
  method: OutreachMethod;
  subject: string;
  date: string;
  status: OutreachStatus;
  followUpDate?: string;
}

export interface Task {
  id: number;
  title: string;
  studentName?: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  assignedTo: string;
}

export interface FamilyEngagementRecord {
  id: number;
  familyName: string;
  studentName: string;
  method: OutreachMethod;
  date: string;
  purpose: string;
  outcome: string;
  followUpRequired: boolean;
}