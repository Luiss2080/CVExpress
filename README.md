<div align="center">
  <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  <h1 align="center">📄 CVExpress</h1>
  <p align="center">
    <strong>Arma tu currículum en el navegador y expórtalo a PDF, sin registrarte ni instalar nada.</strong>
  </p>
</div>

---

## Visión general

**CVExpress** es un generador de currículums que corre enteramente en el
navegador: no hay backend ni base de datos, tus datos nunca salen de tu
equipo. Completas un formulario por pestañas, ves el resultado
actualizarse al instante en una vista previa con formato A4, y descargas
el CV como PDF cuando estás conforme.

Pensado para quien necesita armar o actualizar su CV rápido, con dos
plantillas listas para usar y sin curva de aprendizaje.

## Características

Verificadas contra el código en `src/`:

- **Editor por pestañas:** Datos Personales, Experiencia, Educación &
  Habilidades, y Diseño (`src/components/EditorForm.jsx`).
- **Dos plantillas de CV:** Clásica (`src/layouts/LayoutClassic.jsx`) y
  Moderna con barra lateral (`src/layouts/LayoutModern.jsx`), elegibles
  desde el modal de configuración.
- **Vista previa en vivo:** cada cambio en el formulario se refleja de
  inmediato en el documento (`src/components/CVPreview.jsx`).
- **Reordenar arrastrando:** la experiencia laboral y la educación se
  reordenan arrastrando cada tarjeta (`framer-motion`); por ahora es solo
  con mouse/táctil, no hay una alternativa por teclado.
- **Personalización de diseño:** color de acento y tipografía
  (sans-serif, serif o monospace) aplicados en tiempo real.
- **Modo oscuro** para la interfaz del editor (no afecta el CV, que
  siempre se ve sobre fondo blanco).
- **Autoguardado local:** tus datos se guardan en `localStorage` 500 ms
  después de cada cambio (`src/hooks/useCVData.js`), y se recuperan solos
  la próxima vez que abres la app. Si el dato guardado está corrupto o
  incompleto, la app usa valores por defecto en vez de romperse.
- **Exportar a JSON:** botón para descargar todos tus datos como
  `cv_data.json` de respaldo, desde el modal de configuración. (Por ahora
  es solo exportación; todavía no existe una opción para volver a
  importar ese archivo.)
- **Exportación a PDF:** genera un PDF en A4 con `html2pdf.js` desde el
  botón "Descargar PDF".

## Cómo usar

1. Completa tus datos en las pestañas del panel izquierdo.
2. Ábre "Configuración avanzada" (ícono de engranaje) para elegir la
   plantilla (Clásica o Moderna) y, si quieres, exportar tus datos a
   JSON como respaldo.
3. Revisa el resultado en la vista previa de la derecha.
4. Pulsa "Descargar PDF" cuando estés conforme.

Tus datos quedan guardados en el navegador automáticamente: puedes
cerrar la pestaña y seguir editando más tarde desde el mismo navegador.

## Instalación y uso local

### Requisitos
- [Node.js](https://nodejs.org/es/) 18 o superior

### Pasos

```bash
# Clonar y entrar al directorio
git clone https://github.com/Luiss2080/generador-cv-web.git
cd generador-cv-web

# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Ejecutar las pruebas
npm test

# Compilar para producción
npm run build
```

## Tecnologías

Confirmado contra `package.json` y los imports reales en `src/`:

- **Core:** React 19 + Vite 8
- **Animaciones y drag-and-drop:** Framer Motion
- **Iconos:** lucide-react
- **Exportación a PDF:** html2pdf.js
- **Estilos:** CSS plano con variables (sin framework de estilos)
- **Testing:** Vitest + Testing Library (`@testing-library/react`,
  `@testing-library/jest-dom`) sobre jsdom

`react-hook-form` y `react-icons` están listados en `package.json` pero
no se usan en ningún componente actual; se mantienen documentados aquí
para que quede claro que no forman parte del stack real hasta que se
usen o se retiren.

## Tests

```bash
npm test
```

Corre la suite de Vitest: pruebas del hook `useCVData` que cubren los
valores por defecto, la actualización de datos personales y la
actualización de la configuración de diseño (`src/tests/useCVData.test.jsx`).

## Licencia

MIT — ver [LICENSE](LICENSE).
