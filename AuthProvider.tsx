import React, { createContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { AuthContext, UserType } from '../../lib/auth';
import { Patient, MedicalProfessional } from '../../types/database';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userDetails, setUserDetails] = useState<Patient | MedicalProfessional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserDetails(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserDetails(session.user.id);
      } else {
        setUserType(null);
        setUserDetails(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserDetails = async (userId: string) => {
    // Check if user is a patient
    let { data: patientData } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (patientData) {
      setUserType('patient');
      setUserDetails(patientData);
      setLoading(false);
      return;
    }

    // Check if user is a medical professional
    let { data: professionalData } = await supabase
      .from('medical_professionals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (professionalData) {
      setUserType('professional');
      setUserDetails(professionalData);
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, userType, userDetails, loading }}>
      {children}
    </AuthContext.Provider>
  );
}