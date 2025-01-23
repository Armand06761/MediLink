import React from 'react';
import { Users, Clock, Calendar, Activity } from 'lucide-react';

export default function ProfessionalDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Professionnel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rendez-vous du Jour */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Aujourd'hui</h2>
            <Clock className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="font-medium">09:00 - M. Dupont</p>
              <p className="text-sm text-gray-600">Consultation routine</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="font-medium">10:30 - Mme Martin</p>
              <p className="text-sm text-gray-600">Suivi traitement</p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Statistiques</h2>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Patients du jour</p>
              <p className="font-medium">8</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Patients cette semaine</p>
              <p className="font-medium">35</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Nouveaux patients</p>
              <p className="font-medium">3</p>
            </div>
          </div>
        </div>

        {/* Planning de la Semaine */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Cette Semaine</h2>
            <Calendar className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Lundi: 8 patients</p>
            <p className="text-sm text-gray-600">Mardi: 10 patients</p>
            <p className="text-sm text-gray-600">Mercredi: 6 patients</p>
            <p className="text-sm text-gray-600">Jeudi: 9 patients</p>
            <p className="text-sm text-gray-600">Vendredi: 7 patients</p>
          </div>
        </div>
      </div>

      {/* Dernières Consultations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dernières Consultations</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Activity className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="font-medium">Mme Bernard - Consultation</p>
              <p className="text-sm text-gray-600">14/03/2024 - Suivi post-opératoire</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Activity className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="font-medium">M. Dubois - Consultation</p>
              <p className="text-sm text-gray-600">14/03/2024 - Renouvellement ordonnance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}