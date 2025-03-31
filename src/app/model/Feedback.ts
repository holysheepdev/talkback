export interface Feedback {
  id: string;
  title?: string;
  description?: string;
  company?: string;
  department?: string;
  managers?: string[];
  created_at?: string;
  created_by?: string;
}
