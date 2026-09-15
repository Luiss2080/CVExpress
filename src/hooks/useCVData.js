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
  skills: ''
};

export function useCVData() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved CV data", e);
      }
    }
    return defaultData;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cvData', JSON.stringify(data));
    }, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [data]);

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const setFullData = (newData) => {
    setData(newData);
  };

  return { data, setData, updatePersonalInfo, setFullData };
}
