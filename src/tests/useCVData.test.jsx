import { renderHook, act } from '@testing-library/react';
import { useCVData } from '../hooks/useCVData';

describe('useCVData Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe inicializar con los valores por defecto', () => {
    const { result } = renderHook(() => useCVData());
    expect(result.current.data.personalInfo.fullName).toBe('');
    expect(result.current.data.experience).toEqual([]);
    expect(result.current.data.settings.themeColor).toBe('#3b82f6');
  });

  it('debe actualizar la informacion personal correctamente', () => {
    const { result } = renderHook(() => useCVData());
    
    act(() => {
      result.current.updatePersonalInfo('fullName', 'John Doe');
    });

    expect(result.current.data.personalInfo.fullName).toBe('John Doe');
  });

  it('debe actualizar la configuracion correctamente', () => {
    const { result } = renderHook(() => useCVData());
    
    act(() => {
      result.current.updateSettings('themeColor', '#ff0000');
    });

    expect(result.current.data.settings.themeColor).toBe('#ff0000');
  });
});
