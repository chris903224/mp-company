import { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Inquiry, Project } from './adminData';

export function useAdmin() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('dash');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [servicesInfo, setServicesInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [inqRes, projRes, bizRes, svcRes] = await Promise.all([
        supabase.from('inquiries').select('*').order('date', { ascending: false }),
        supabase.from('projects').select('*').order('id', { ascending: true }),
        supabase.from('business_info').select('*').limit(1).maybeSingle(),
        supabase.from('services').select('*').limit(1).maybeSingle()
      ]);

      if (inqRes.error) throw inqRes.error;
      if (projRes.error) throw projRes.error;
      
      setInquiries(inqRes.data || []);
      setProjects(projRes.data || []);
      
      if (bizRes.data) setBusinessInfo(bizRes.data);
      if (svcRes.data) setServicesInfo(svcRes.data);
      
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

  const updateStage = async (id: number, newStage: number) => {
    try {
      const { error } = await supabase.from('inquiries').update({ stage: newStage }).eq('id', id);
      if (error) throw error;
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, stage: newStage } : i));
      setSelectedInquiry(null);
      showToast(`Inquiry stage updated successfully.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update stage');
    }
  };

  const toggleProjectSample = async (id: number, currentStatus: boolean) => {
    try {
      // ✅ BINAGO NATIN ITO: Nilagyan ng quotes ang "isSample" para makilala ng PostgreSQL
      const { error } = await supabase
        .from('projects')
        .update({ "isSample": !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      setProjects(prev => prev.map(p => p.id === id ? { ...p, isSample: !p.isSample } : p));
      showToast('Project status updated.');
    } catch (err: any) {
      showToast(err.message || 'Failed to update project');
    }
  };

  const updateBusinessInfo = async (newInfo: any) => {
    try {
      const payload = { 
        phone: newInfo.phone, 
        email: newInfo.email, 
        address: newInfo.address, 
        hours: newInfo.hours 
      };

      if (!newInfo || !newInfo.id) {
        const { error } = await supabase.from('business_info').insert([payload]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('business_info').update(payload).eq('id', newInfo.id);
        if (error) throw error;
      }
      
      await fetchData(); 
      showToast('Business info saved successfully!');
    } catch (err: any) {
      showToast(err.message || 'Failed to save business info');
    }
  };

  const updateServicesInfo = async (newInfo: any) => {
    try {
      const payload = { 
        network_desc: newInfo.network_desc, 
        cctv_desc: newInfo.cctv_desc, 
        hardware_desc: newInfo.hardware_desc 
      };

      if (!newInfo || !newInfo.id) {
        const { error } = await supabase.from('services').insert([payload]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').update(payload).eq('id', newInfo.id);
        if (error) throw error;
      }
      
      await fetchData();
      showToast('Services saved successfully!');
    } catch (err: any) {
      showToast(err.message || 'Failed to save services');
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
    businessInfo, updateBusinessInfo,
    servicesInfo, updateServicesInfo,
    toastMsg, showToast
  };
}

export type AdminState = ReturnType<typeof useAdmin>; 