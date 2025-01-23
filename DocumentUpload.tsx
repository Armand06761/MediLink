import React, { useState, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { Upload, File } from 'lucide-react';
import { MedicalDocument } from '../../types/database';

interface DocumentUploadProps {
  onSuccess?: () => void;
}

export default function DocumentUpload({ onSuccess }: DocumentUploadProps) {
  const { userDetails } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<MedicalDocument['document_type']>('other');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Le fichier doit faire moins de 10MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userDetails || 'license_number' in userDetails) {
      setError('Information manquante ou type d\'utilisateur incorrect');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${userDetails.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('medical-documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 2. Create document record in the database
      const { error: dbError } = await supabase
        .from('medical_documents')
        .insert([
          {
            patient_id: userDetails.id,
            uploaded_by: userDetails.user_id,
            document_type: type,
            document_url: filePath,
          },
        ]);

      if (dbError) throw dbError;

      setFile(null);
      setType('other');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du téléchargement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type de document
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as MedicalDocument['document_type'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="prescription">Ordonnance</option>
          <option value="analysis">Résultats d'analyse</option>
          <option value="imaging">Imagerie médicale</option>
          <option value="certificate">Certificat médical</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Document
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Télécharger un fichier</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PDF, PNG, JPG jusqu'à 10MB</p>
          </div>
        </div>
      </div>

      {file && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <File className="h-4 w-4" />
          <span>{file.name}</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading || !file}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Téléchargement...' : 'Télécharger'}
      </button>
    </form>
  );
}