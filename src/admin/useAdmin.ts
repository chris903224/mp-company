import { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Inquiry, Project } from './adminData';

export function useAdmin() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('dash');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // Function para sa Toast Notification
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  };

  // Fetch Data sa Supabase
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [inqRes, projRes] = await Promise.all([
        supabase.from('inquiries').select('*').order('date', { ascending: false }),
        supabase.from('projects').select('*').order('id', { ascending: true })
      ]);

      if (inqRes.error) throw inqRes.error;
      if (projRes.error) throw projRes.error;

      setInquiries(inqRes.data || []);
      setProjects(projRes.data || []);
    } catch (err: any) {
      showToast(err.message || 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, fetchData]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(i => {
      const matchesSearch = (i.name + i.company + i.email).toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === '' || i.stage.toString() === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [inquiries, search, stageFilter]);

  // Update sa Supabase
  const updateStage = async (id: number, newStage: number) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ stage: newStage })
        .eq('id', id);

      if (error) throw error;

      setInquiries(prev => prev.map(i => i.id === id ? { ...i, stage: newStage } : i));
      setSelectedInquiry(null);
      showToast(`Inquiry stage updated successfully.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update stage');
    }
  };

  // Toggle Sample sa Supabase
  const toggleProjectSample = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ isSample: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.map(p => p.id === id ? { ...p, isSample: !p.isSample } : p));
      showToast('Project status updated.');
    } catch (err: any) {
      showToast(err.message || 'Failed to update project');
    }
  };

  return {
    theme, toggleTheme,
    activeTab, setActiveTab,
    inquiries, filteredInquiries, isLoading,
    search, setSearch,
    stageFilter, setStageFilter,
    selectedInquiry, setSelectedInquiry,
    updateStage,
    projects, toggleProjectSample,
    toastMsg, showToast
  };
}

export type AdminState = ReturnType<typeof useAdmin>;