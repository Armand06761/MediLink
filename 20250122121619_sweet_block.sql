CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  blood_type text,
  email text NOT NULL,
  phone text,
  address text,
  medical_history jsonb,
  allergies text[],
  gdpr_consent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medical Professionals Table
CREATE TABLE IF NOT EXISTS medical_professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  license_number text NOT NULL,
  specialties text[],
  email text NOT NULL,
  phone text,
  address text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients NOT NULL,
  professional_id uuid REFERENCES medical_professionals NOT NULL,
  appointment_date timestamptz NOT NULL,
  status text NOT NULL,
  notes text,
  cancellation_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medical Documents Table
CREATE TABLE IF NOT EXISTS medical_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients NOT NULL,
  uploaded_by uuid REFERENCES auth.users NOT NULL,
  document_type text NOT NULL,
  document_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients NOT NULL,
  appointment_id uuid REFERENCES appointments,
  amount decimal NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL,
  receipt_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Patients Policies
CREATE POLICY "Users can view own patient profile"
  ON patients FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Medical professionals can view their patients"
  ON patients FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM appointments
    WHERE appointments.patient_id = patients.id
    AND appointments.professional_id IN (
      SELECT id FROM medical_professionals
      WHERE user_id = auth.uid()
    )
  ));

-- Medical Professionals Policies
CREATE POLICY "Users can view own professional profile"
  ON medical_professionals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Patients can view their medical professionals"
  ON medical_professionals FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM appointments
    WHERE appointments.professional_id = medical_professionals.id
    AND appointments.patient_id IN (
      SELECT id FROM patients
      WHERE user_id = auth.uid()
    )
  ));

-- Appointments Policies
CREATE POLICY "Users can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
    OR
    professional_id IN (SELECT id FROM medical_professionals WHERE user_id = auth.uid())
  );

-- Medical Documents Policies
CREATE POLICY "Users can view their medical documents"
  ON medical_documents FOR SELECT
  TO authenticated
  USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
    OR
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.patient_id = medical_documents.patient_id
      AND appointments.professional_id IN (
        SELECT id FROM medical_professionals
        WHERE user_id = auth.uid()
      )
    )
  );

-- Notifications Policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Transactions Policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
    OR
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = transactions.appointment_id
      AND appointments.professional_id IN (
        SELECT id FROM medical_professionals
        WHERE user_id = auth.uid()
      )
    )
  );