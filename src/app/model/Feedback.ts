export interface Feedback {
  id?: string;
  title?: string;
  managers?: string[];
  feedback?: string;
  company?: string;
  department?: string;
  created_at?: string;
  created_by?: string;
  anonymous?: boolean;
}
