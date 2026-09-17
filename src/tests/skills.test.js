import { describe, it, expect } from 'vitest';
import { parseSkills, addSkillToString, removeSkillFromString } from '../utils/skills';

describe('parseSkills', () => {
  it('devuelve un arreglo vacío para valores vacíos o nulos', () => {
    expect(parseSkills('')).toEqual([]);
    expect(parseSkills(undefined)).toEqual([]);
    expect(parseSkills(null)).toEqual([]);
  });

  it('separa, recorta y descarta entradas vacías', () => {
    expect(parseSkills('React,  Node.js ,, PHP ,')).toEqual(['React', 'Node.js', 'PHP']);
  });
});

describe('addSkillToString', () => {
  it('agrega una habilidad nueva a una lista vacía', () => {
    expect(addSkillToString('', 'React')).toBe('React');
  });

  it('agrega una habilidad nueva a una lista existente', () => {
    expect(addSkillToString('React, Node.js', 'PHP')).toBe('React, Node.js, PHP');
  });

  it('recorta espacios en la habilidad nueva', () => {
    expect(addSkillToString('React', '  PHP  ')).toBe('React, PHP');
  });

  it('no duplica una habilidad que ya existe', () => {
    expect(addSkillToString('React, Node.js', 'React')).toBe('React, Node.js');
  });

  it('ignora una habilidad en blanco', () => {
    expect(addSkillToString('React', '   ')).toBe('React');
    expect(addSkillToString('React', '')).toBe('React');
  });
});

describe('removeSkillFromString', () => {
  it('quita la habilidad indicada', () => {
    expect(removeSkillFromString('React, Node.js, PHP', 'Node.js')).toBe('React, PHP');
  });

  it('no cambia la lista si la habilidad no existe', () => {
    expect(removeSkillFromString('React, Node.js', 'Java')).toBe('React, Node.js');
  });

  it('devuelve una lista vacía al quitar la última habilidad', () => {
    expect(removeSkillFromString('React', 'React')).toBe('');
  });

  it('maneja una cadena vacía sin lanzar errores', () => {
    expect(removeSkillFromString('', 'React')).toBe('');
  });
});
