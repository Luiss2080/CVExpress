<div align="center">
  <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Generador de CV Pro 🚀</h1>
  <p align="center">
    <strong>El constructor de currículums definitivo, moderno y listo para producción.</strong>
    <br />
    <br />
    <a href="#características-principales">Características</a>
    ·
    <a href="#tecnologías">Tecnologías</a>
    ·
    <a href="#instalación">Instalación</a>
  </p>
</div>

---

## 🌟 Visión General

**Generador de CV Pro** pasó de ser un simple script en Vanilla JS a una arquitectura moderna y robusta, construida a través del estándar **Spec-Driven Development (SDD)**. 

El objetivo es ofrecer a los buscadores de empleo una experiencia _Premium_ de creación de currículums (SaaS-like), con interfaces altamente interactivas, renderizado instantáneo y control granular sobre el diseño final.

---

## ✨ Características Principales

- 🎨 **Diseño Premium (Glassmorphism):** Interfaz deslumbrante con gradientes fluidos animados y **Modo Oscuro nativo**.
- 🛠 **Editor Inteligente por Pestañas:** Olvídate del scroll infinito. El formulario está dividido en pestañas animadas (`Personal`, `Experiencia`, `Educación`, `Diseño`).
- ✋ **Drag & Drop (Arrastrar y Soltar):** Reordena fácilmente tu experiencia laboral y académica utilizando gestos naturales del ratón.
- 🎭 **Múltiples Plantillas (Layouts):**
  - **Clásico:** Formal, enfocado en el contenido con tipografía Serif.
  - **Moderno:** Audaz, con barra lateral (Sidebar) destacada y detalles creativos.
- 🖌 **Motor de Personalización:** Cambia el color de acento y la tipografía base; el documento renderizado se actualizará inmediatamente.
- 💾 **Persistencia Automática:** Tus datos se autoguardan localmente mientras escribes (Debounce).
- 📦 **Importar/Exportar:** Descarga tus datos como archivo `.json` para respaldos, o impórtalo cuando lo necesites.
- 📄 **Exportación PDF Precisa:** Genera archivos PDF de alta calidad estrictamente calibrados para el formato estándar A4.

---

## 💻 Tecnologías

Este proyecto emplea un _Stack_ tecnológico moderno enfocado en la velocidad y la interactividad:

- **Core:** React 18 + Vite (Ultrarrápido)
- **Animaciones:** Framer Motion (Transiciones, Modales, Drag & Drop)
- **Estilos:** Vanilla CSS (CSS Grid, Variables HSL, animaciones nativas)
- **Iconografía:** Lucide React
- **Exportación a PDF:** html2pdf.js
- **Testing (TDD):** Vitest + React Testing Library

---

## 🚀 Instalación y Uso Local

Para correr este proyecto en tu entorno de desarrollo, sigue estos sencillos pasos:

### Prerrequisitos
- [Node.js](https://nodejs.org/es/) (Versión 16.x o superior)

### Pasos

1. **Clonar y acceder al directorio:**
   ```bash
   git clone https://github.com/tu-usuario/generador-cv-web.git
   cd generador-cv-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar servidor en desarrollo:**
   ```bash
   npm run dev
   ```
   > Abre tu navegador en `http://localhost:5173/` y maravíllate.

4. **Ejecutar Pruebas Automatizadas:**
   ```bash
   npm run test
   ```

5. **Construir para Producción:**
   ```bash
   npm run build
   ```

---

## 📚 SDD (Spec-Driven Development)

Este proyecto se desarrolló utilizando un enfoque dirigido por especificaciones. Todos los requerimientos funcionales (EARS) y la documentación oficial de IA se encuentran en la carpeta de respaldos y en la configuración interna de la metodología.

<p align="center">Hecho con ❤️ enfocados en una <b>UX (Experiencia de Usuario) inigualable</b>.</p>
