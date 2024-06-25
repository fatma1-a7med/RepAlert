export interface VisitModelTs {
  id: number;
  purpose: string;
  visit_date: string;
  visit_time: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  user_id: number | null;
  doctor_id: number;
  tools: number[];
}

export interface GroupedVisits {
  [date: string]: VisitModelTs[];
}




