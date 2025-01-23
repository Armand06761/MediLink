import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { Patient, MedicalProfessional } from '../types/database';

export type UserType = 'patient' | 'professional';

interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  userDetails: Patient | MedicalProfessional | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  userDetails: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signUp = async (
  email: string,
  password: string,
  userType: UserType,
  details: Omit<Patient | MedicalProfessional, 'id' | 'user_id' | 'created_at' | 'updated_at'>
) => {
  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (authError) throw authError;
  if (!authData.user) throw new Error('La création de l\'utilisateur a échoué');

  // 2. Create profile based on user type
  const table = userType === 'patient' ? 'patients' : 'medical_professionals';
  const { error: profileError } = await supabase
    .from(table)
    .insert([{ ...details, user_id: authData.user.id }]);

  if (profileError) {
    // Rollback auth user creation if profile creation fails
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw profileError;
  }

  return authData;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};