import React from 'react';
import DocumentList from '../../components/documents/DocumentList';

export default function Documents() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Documents des Patients</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <DocumentList />
      </div>
    </div>
  );
}