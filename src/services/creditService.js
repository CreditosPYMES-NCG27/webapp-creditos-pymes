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
export async function fetchAllCreditApplications() {
  try {
    const { data, error } = await supabase
      .from('credit_applications')
      .select(`
        id,
        requested_amount,
        status,
        created_at,
        user_id,
        company_id,
        users:user_id (
          email,
          full_name
        ),
        companies (
          legal_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      ...item,
      applicant_name:
        item.companies?.legal_name ||
        item.users?.full_name ||
        item.users?.email ||
        'Sin identificar'
    }));
  } catch (err) {
    console.error('❌ Error al obtener todas las solicitudes:', err);
    return [];
  }
}
