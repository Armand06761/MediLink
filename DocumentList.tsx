import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { MedicalDocument } from '../../types/database';
import { FileText, Download, Calendar } from 'lucide-react';

interface DocumentWithUrl extends MedicalDocument {
  signedUrl?: string;
}

export default function DocumentList() {
  const { userType, userDetails } = useAuth();
  const [documents, setDocuments] = useState<DocumentWithUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, [userType, userDetails]);

  const fetchDocuments = async () => {
    try {
      if (!userDetails) return;

      const isPatient = !('license_number' in userDetails);
      const query = supabase
        .from('medical_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (isPatient) {
        query.eq('patient_id', userDetails.id);
      } else {
        // For medical professionals, fetch documents of their patients
        query.in('patient_id', [
          supabase
            .from('appointments')
            .select('patient_id')
            .eq('professional_id', userDetails.id)
        ]);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      // Get signed URLs for each document
      const documentsWithUrls = await Promise.all(
        (data || []).map(async (doc) => {
          const { data: { signedUrl } } = await supabase.storage
            .from('medical-documents')
            .createSignedUrl(doc.document_url, 3600); // 1 hour expiration

          return { ...doc, signedUrl };
        })
      );

      setDocuments(documentsWithUrls);
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
      {documents.map((document) => (
        <div
          key={document.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium">
                  {document.document_type.charAt(0).toUpperCase() + document.document_type.slice(1)}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(document.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>

            {document.signedUrl && (
              <a
                href={document.signedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-500"
              >
                <Download className="h-5 w-5" />
                <span className="text-sm">Télécharger</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}