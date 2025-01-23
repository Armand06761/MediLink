import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { Appointment } from '../../types/database';
import { Calendar, Clock, User } from 'lucide-react';

interface AppointmentWithDetails extends Appointment {
  patients?: {
    first_name: string;
    last_name: string;
  };
  medical_professionals?: {
    first_name: string;
    last_name: string;
  };
}

export default function AppointmentList() {
  const { userType, userDetails } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [userType, userDetails]);

  const fetchAppointments = async () => {
    try {
      if (!userDetails) return;

      const isPatient = !('license_number' in userDetails);
      const query = supabase
        .from('appointments')
        .select(`
          *,
          patients (
            first_name,
            last_name
          ),
          medical_professionals (
            first_name,
            last_name
          )
        `)
        .order('appointment_date', { ascending: true });

      if (isPatient) {
        query.eq('patient_id', userDetails.id);
      } else {
        query.eq('professional_id', userDetails.id);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setAppointments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium">
                  {new Date(appointment.appointment_date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(appointment.appointment_date).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {userType === 'patient'
                  ? `Dr. ${appointment.medical_professionals?.last_name}`
                  : `${appointment.patients?.first_name} ${appointment.patients?.last_name}`}
              </span>
            </div>
          </div>

          {appointment.notes && (
            <p className="mt-2 text-sm text-gray-600">{appointment.notes}</p>
          )}

          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              appointment.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : appointment.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {appointment.status === 'confirmed' ? 'Confirmé' :
               appointment.status === 'pending' ? 'En attente' : 'Annulé'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}