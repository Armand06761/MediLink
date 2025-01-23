import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { Notification } from '../../types/database';
import { Bell, Calendar, Check } from 'lucide-react';

export default function NotificationList() {
  const { userDetails } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
    subscribeToNotifications();
  }, [userDetails]);

  const fetchNotifications = async () => {
    try {
      if (!userDetails) return;

      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userDetails.user_id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setNotifications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNotifications = () => {
    if (!userDetails) return;

    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userDetails.user_id}`,
        },
        (payload) => {
          setNotifications((current) => [payload.new as Notification, ...current]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (updateError) throw updateError;

      setNotifications((current) =>
        current.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
            !notification.read ? 'border-l-4 border-indigo-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className={`h-5 w-5 ${
                notification.read ? 'text-gray-400' : 'text-indigo-600'
              }`} />
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(notification.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-500"
              >
                <Check className="h-4 w-4" />
                <span>Marquer comme lu</span>
              </button>
            )}
          </div>
        </div>
      ))}

      {notifications.length === 0 && (
        <div className="text-center text-gray-500">
          Aucune notification
        </div>
      )}
    </div>
  );
}