function lineasA_Li(texto) {
  return texto
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `<li>${l}</li>`)
    .join('');
}

function actualizarPreview() {
  document.getElementById('p-nombre').textContent = document.getElementById('nombre').value || 'Tu Nombre';
  document.getElementById('p-titulo').textContent = document.getElementById('titulo').value;
  document.getElementById('p-contacto').textContent = [
    document.getElementById('email').value,
    document.getElementById('telefono').value,
  ].filter(Boolean).join(' · ');
  document.getElementById('p-resumen').textContent = document.getElementById('resumen').value;
  document.getElementById('p-experiencia').innerHTML = lineasA_Li(document.getElementById('experiencia').value);
  document.getElementById('p-educacion').innerHTML = lineasA_Li(document.getElementById('educacion').value);
  document.getElementById('p-habilidades').textContent = document.getElementById('habilidades').value;
}

document.querySelectorAll('#formulario input, #formulario textarea')
  .forEach((el) => el.addEventListener('input', actualizarPreview));

document.getElementById('btn-imprimir').addEventListener('click', () => window.print());

actualizarPreview();
