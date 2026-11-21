import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ProjectItem } from '../types';

export interface BusinessInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

// Bagong interface para sa Services
export interface ServicesInfo {
  network_desc: string;
  cctv_desc: string;
  hardware_desc: string;
}

export function useSiteData() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [business, setBusiness] = useState<BusinessInfo | null>(null);
  const [services, setServices] = useState<ServicesInfo | null>(null); // <-- Idinagdag
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, infoRes, svcRes] = await Promise.all([
          // Kukunin lang natin yung mga totoong projects (isSample = false)
          supabase.from('projects').select('*').eq('isSample', false),
          // Mas safe gamitin ang maybeSingle kaysa single para hindi mag-error kung 0 rows
          supabase.from('business_info').select('*').limit(1).maybeSingle(),
          // Kunin din ang services
          supabase.from('services').select('*').limit(1).maybeSingle()
        ]);

        if (projRes.error) throw projRes.error;
        if (infoRes.error) throw infoRes.error;
        if (svcRes.error) throw svcRes.error;

        // I-map natin yung Supabase project data sa ProjectItem type
        if (projRes.data) {
          const mappedProjects: ProjectItem[] = projRes.data.map((p: any) => ({
            img: p.image_url || 'cabling-01.jpg', // Fallback kung walang image
            alt: p.title,
            captionTitle: p.title,
            captionBody: p.category
          }));
          setProjects(mappedProjects);
        }

        if (infoRes.data) {
          setBusiness(infoRes.data);
        }

        // I-set ang services
        if (svcRes.data) {
          setServices(svcRes.data);
        }
      } catch (err) {
        console.error('Error fetching site data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { projects, business, services, isLoading }; // <-- I-return ang services
}