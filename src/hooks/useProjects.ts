// useProjects.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ProjectItem } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // I-map ang Supabase data papunta sa ProjectItem format
        const formattedProjects: ProjectItem[] = (data || []).map((item: any) => ({
          id: item.id,
          company: item.company,
          category: item.category,
          img: item.img || '', // Palitan kung iba ang column name mo sa DB
          alt: item.alt || item.title || 'Project image',
          captionTitle: item.title || item.caption_title || 'Untitled Project',
          captionBody: item.description || item.caption_body || '',
        }));

        setProjects(formattedProjects);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
}