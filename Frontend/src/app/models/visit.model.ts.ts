export interface VisitModelTs {
    
        created_at: Date | null;
        id: number;
        location_id: number | null;
        purpose: string;
        status: string;
        updated_at: Date | null;
        user_id: number;
        visit_date: string;
        visit_time: string;
      }
      
      export interface GroupedVisits {
        [date: string]: VisitModelTs[];
      }
      


