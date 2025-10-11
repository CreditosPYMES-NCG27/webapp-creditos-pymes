// src/services/creditService.js
import { supabase } from '@/auth/supabaseClient';

// Obtiene las solicitudes del usuario logueado
export async function fetchCreditApplications(userId) {
  try {
    const { data, error } = await supabase
      .from('credit_applications')
      .select('id, requested_amount, status, created_at')
      .eq('user_id', userId) 
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Error al obtener solicitudes:', err);
    return [];
  }
}
