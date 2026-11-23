/* =========================================================================
   Lógica compartida de la web de ejercicios.
   - renderBlocks(): pinta las tarjetas de bloques en la página principal.
   - initExercisePage(data): pinta un bloque de ejercicios (índice lateral,
     filtros por categoría, bloques de código con botón de copiar).
   ========================================================================= */
(function () {
  "use strict";

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------------- Página principal: tarjetas de bloques --------------- */

  function blockCard(block) {
    const available = block.estado === "disponible";
    const badge = available
      ? '<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>Disponible</span>'
      : '<span class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"><span class="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true"></span>Próximamente</span>';

    const temas = (block.temas || [])
      .map(
        (t) =>
          `<span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">${escapeHtml(t)}</span>`
      )
      .join("");

    const downloadLink = block.sql
      ? `<a href="${block.sql}" download class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" aria-label="Descargar el script SQL completo de ${escapeHtml(block.nombre)}">
           <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
           .sql
         </a>`
      : "";

    const footer = available
      ? `<div class="mt-auto flex flex-wrap gap-2">
           <a href="${block.pagina}" class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Ver ejercicios
             <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3" /></svg>
           </a>
           ${downloadLink}
         </div>`
      : `<p class="mt-auto inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400">
           En preparación
         </p>`;

    return `
      <article class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${available ? "" : "opacity-90"}">
        <div class="flex items-start justify-between gap-3">
          <span class="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-2xl" aria-hidden="true">${block.icono || "🗄️"}</span>
          ${badge}
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-900">${escapeHtml(block.nombre)}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">${escapeHtml(block.descripcion)}</p>
        </div>
        <div class="flex flex-wrap gap-2">${temas}</div>
        ${footer}
      </article>`;
  }

  window.renderBlocks = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container || !window.DB_BLOCKS) return;
    container.innerHTML = window.DB_BLOCKS.map(blockCard).join("");
  };

  /* --------------- Página de ejercicios: render + filtros --------------- */

  function exerciseArticle(ej, index) {
    const num = String(index + 1).padStart(2, "0");
    return `
      <article id="ej-${index + 1}" data-categoria="${ej.categoria}" class="scroll-mt-24 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header class="flex flex-wrap items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white" aria-hidden="true">${num}</span>
          <div class="min-w-0 flex-1">
            <h3 class="text-base font-bold text-slate-900 sm:text-lg">${escapeHtml(ej.titulo)}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${escapeHtml(ej.enunciado)}</p>
          </div>
          <span class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(ej.categoria)}</span>
        </header>
        <div class="relative">
          <button type="button" class="copy-btn absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md bg-slate-700/80 px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur transition hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400" data-index="${index}" aria-label="Copiar consulta SQL del ejercicio ${index + 1}">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
            <span class="copy-label">Copiar</span>
          </button>
          <pre class="!m-0 !rounded-none !rounded-b-2xl"><code class="language-sql">${escapeHtml(ej.sql)}</code></pre>
        </div>
      </article>`;
  }

  function tocItem(ej, index) {
    return `
      <li>
        <a href="#ej-${index + 1}" class="toc-link block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700" data-categoria="${ej.categoria}">
          <span class="mr-1.5 font-mono text-xs text-slate-400">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(ej.titulo)}
        </a>
      </li>`;
  }

  function setupFilters(data) {
    const bar = document.getElementById("filter-bar");
    if (!bar) return;

    const cats = [{ id: "todos", nombre: "Todos" }].concat(data.categorias || []);
    bar.innerHTML = cats
      .map(
        (c, i) => `
        <button type="button" data-filter="${c.id}" aria-pressed="${i === 0}"
          class="filter-btn rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            i === 0
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-700"
          }">${escapeHtml(c.nombre)}</button>`
      )
      .join("");

    bar.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;
      const filter = btn.dataset.filter;

      bar.querySelectorAll(".filter-btn").forEach((b) => {
        const active = b === btn;
        b.setAttribute("aria-pressed", String(active));
        b.className = `filter-btn rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
          active
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-slate-300 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-700"
        }`;
      });

      document.querySelectorAll("[data-categoria]").forEach((el) => {
        el.hidden = filter !== "todos" && el.dataset.categoria !== filter;
      });
    });
  }

  function setupCopyButtons(data) {
    document.addEventListener("click", (event) => {
      const btn = event.target.closest(".copy-btn");
      if (!btn) return;
      const ej = data.ejercicios[Number(btn.dataset.index)];
      if (!ej) return;

      navigator.clipboard.writeText(ej.sql).then(
        () => {
          const label = btn.querySelector(".copy-label");
          const original = label.textContent;
          label.textContent = "¡Copiado!";
          btn.classList.add("!bg-emerald-600");
          setTimeout(() => {
            label.textContent = original;
            btn.classList.remove("!bg-emerald-600");
          }, 1600);
        },
        () => {
          const label = btn.querySelector(".copy-label");
          label.textContent = "Error";
          setTimeout(() => (label.textContent = "Copiar"), 1600);
        }
      );
    });
  }

  window.initExercisePage = function (data) {
    const list = document.getElementById("exercise-list");
    const toc = document.getElementById("toc-list");
    const counter = document.getElementById("exercise-count");

    if (list) list.innerHTML = data.ejercicios.map(exerciseArticle).join("");
    if (toc) toc.innerHTML = data.ejercicios.map(tocItem).join("");
    if (counter) counter.textContent = String(data.ejercicios.length);

    setupFilters(data);
    setupCopyButtons(data);

    if (window.Prism) window.Prism.highlightAll();
  };
})();
