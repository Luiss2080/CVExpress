import { useState, useEffect } from 'react';

const defaultData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  languages: [],
  skills: '',
  settings: {
    themeColor: '#3b82f6',
    fontFamily: 'sans-serif'
  }
};

export function useCVData() {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return defaultData;
    const saved = localStorage.getItem('cvData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all defaults exist if migrating from old schema
        return {
           ...defaultData,
           ...parsed,
           settings: { ...defaultData.settings, ...(parsed.settings || {}) }
        };
      } catch (e) {
        console.error("Failed to parse saved CV data", e);
      }
    }
    return defaultData;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cvData', JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [data]);

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSettings = (field, value) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  }

  const setFullData = (newData) => {
    if (typeof newData === 'function') {
      setData(newData);
    } else {
      setData(newData);
    }
  };

  return { data, setData, updatePersonalInfo, updateSettings, setFullData };
}
