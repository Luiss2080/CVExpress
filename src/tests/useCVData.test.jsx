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

  it('debe ignorar JSON invalido guardado en localStorage y usar los valores por defecto', () => {
    localStorage.setItem('cvData', '{esto no es JSON valido');

    const { result } = renderHook(() => useCVData());

    expect(result.current.data.personalInfo.fullName).toBe('');
    expect(result.current.data.experience).toEqual([]);
    expect(result.current.data.settings.themeColor).toBe('#3b82f6');
  });

  it('debe completar los campos faltantes al migrar datos guardados incompletos', () => {
    // Simula un cv_data.json importado (o una version anterior del
    // esquema) al que le faltan campos que el resto de la app espera
    // que siempre existan, como `settings` o `experience`.
    localStorage.setItem('cvData', JSON.stringify({
      personalInfo: { fullName: 'Ana Pérez' }
    }));

    const { result } = renderHook(() => useCVData());

    expect(result.current.data.personalInfo.fullName).toBe('Ana Pérez');
    expect(result.current.data.experience).toEqual([]);
    expect(result.current.data.education).toEqual([]);
    expect(result.current.data.settings.themeColor).toBe('#3b82f6');
    expect(result.current.data.settings.fontFamily).toBe('sans-serif');
  });

  it('setFullData debe aceptar un actualizador de tipo funcion', () => {
    const { result } = renderHook(() => useCVData());

    act(() => {
      result.current.setFullData(prev => ({
        ...prev,
        experience: [...prev.experience, { id: '1', company: 'Acme' }]
      }));
    });

    expect(result.current.data.experience).toEqual([{ id: '1', company: 'Acme' }]);
  });

  it('debe persistir los datos en localStorage despues del debounce', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCVData());

    act(() => {
      result.current.updatePersonalInfo('fullName', 'Carlos Ruiz');
    });

    // Antes de que venza el debounce todavia no se escribio en disco.
    expect(localStorage.getItem('cvData')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const saved = JSON.parse(localStorage.getItem('cvData'));
    expect(saved.personalInfo.fullName).toBe('Carlos Ruiz');
    vi.useRealTimers();
  });
});
