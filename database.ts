export interface Patient {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  blood_type: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  medical_history: Record<string, any> | null;
  allergies: string[];
  gdpr_consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface MedicalProfessional {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  license_number: string;
  specialties: string[];
  email: string;
  phone: string | null;
  address: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  professional_id: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface MedicalDocument {
  id: string;
  patient_id: string;
  uploaded_by: string;
  document_type: 'prescription' | 'analysis' | 'imaging' | 'certificate' | 'other';
  document_url: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Transaction {
  id: string;
  patient_id: string;
  appointment_id: string | null;
  amount: number;
  payment_method: 'wave' | 'orange_money' | 'mtn_money' | 'card';
  status: 'pending' | 'completed' | 'failed';
  receipt_url: string | null;
  created_at: string;
}