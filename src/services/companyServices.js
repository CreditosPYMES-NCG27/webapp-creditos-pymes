
//auth services
import { supabase } from '@/auth/supabaseClient';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const companyServices = {};

//Fetch de los datos de la empresa dek usuario
companyServices.getMyCompanyDetails = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) throw new Error('Usuario no encontrado');

        console.log(session.access_token);

        const response = await fetch(`${BACKEND_URL}/api/v1/companies/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Empresa no encontrada');
        }

        const company = response.status !== 204 ? await response.json() : null;
        return company;

    } catch (err) {
        console.error('Error fetching company data:', err);
        return null;
    }
}

// Actualiza los datos de contacto de la empresa del usuario
companyServices.updateCompanyContact = async (contactData) => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) throw new Error('Usuario no encontrado');

        const response = await fetch(`${BACKEND_URL}/api/v1/companies/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify(contactData) // { contact_email, contact_phone }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail?.[0]?.msg || 'Error actualizando datos de empresa');
        }

        const updatedCompany = await response.json();
        return updatedCompany;

    } catch (err) {
        console.error('Error updating company contact:', err);
        return null;
    }
}


export default companyServices;
