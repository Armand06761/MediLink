import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, User, Calendar, FileText, Bell, LogOut, Users, ClipboardList } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'patient' | 'professional';
}

export default function Layout({ children, userType }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const menuItems = userType === 'patient' 
    ? [
        { icon: User, label: 'Mon Profil', path: '/patient/profile' },
        { icon: Calendar, label: 'Rendez-vous', path: '/patient/appointments' },
        { icon: FileText, label: 'Documents', path: '/patient/documents' },
        { icon: Bell, label: 'Notifications', path: '/patient/notifications' },
      ]
    : [
        { icon: User, label: 'Mon Profil', path: '/professional/profile' },
        { icon: Users, label: 'Mes Patients', path: '/professional/patients' },
        { icon: Calendar, label: 'Planning', path: '/professional/schedule' },
        { icon: ClipboardList, label: 'Consultations', path: '/professional/consultations' },
        { icon: Bell, label: 'Notifications', path: '/professional/notifications' },
      ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 flex items-center space-x-2">
          <Activity className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-semibold text-gray-900">SantéNum</span>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 ${
                  location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 mt-8"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}