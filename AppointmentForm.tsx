import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

interface AppointmentFormProps {
  professionalId?: string;
  onSuccess?: () => void;
}

export default function AppointmentForm({ professionalId, onSuccess }: AppointmentFormProps) {
  const { userDetails } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!userDetails || 'license_number' in userDetails) {
        throw new Error('Invalid user type');
      }

      const appointmentDate = new Date(`${date}T${time}`);
      
      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert([
          {
            patient_id: userDetails.id,
            professional_id: professionalId,
            appointment_date: appointmentDate.toISOString(),
            status: 'pending',
            notes: reason,
          },
        ]);

      if (appointmentError) throw appointmentError;
      
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Heure
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Motif de la consultation
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Traitement...' : 'Prendre rendez-vous'}
      </button>
    </form>
  );
}