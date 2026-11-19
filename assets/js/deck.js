/* =========================================================================
   Danone PDV 2027 × 75LAB · motor da apresentação
   HTML, CSS e JS puros, sem dependências.
   Teclas: ← → (ou espaço) navegam · M índice · F tela cheia · Home/End.
   QA: ?static (sem movimento) · ?desktop (força palco no celular)
   ========================================================================= */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const stage = $('#stage');
const Q = location.search;
if (/[?&]static(=|&|$)/.test(Q)) html.classList.add('static');
const MQ = matchMedia('(max-width: 820px), (orientation: portrait) and (max-width: 1100px)');
const forceDesk = /[?&]desktop(=|&|$)/.test(Q);
const mobile = !forceDesk && MQ.matches;
if (mobile) html.classList.add('m');
if (!forceDesk) MQ.addEventListener?.('change', () => location.reload());

const slides = $$('.slide', stage);
const pad = n => String(n).padStart(2, '0');
slides.forEach(s => $$('.rv', s).forEach((el, i) => el.style.setProperty('--i', Math.min(i, 12))));

/* notas de 1 a 5 */
$$('[data-nota]').forEach(el => {
  const n = +el.dataset.nota;
  el.classList.add('nota5');
  el.innerHTML = Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('');
  el.setAttribute('aria-label', `${n} de 5`);
});

/* abas genéricas: [data-abas] com botões [data-aba] e painéis [data-painel] */
$$('[data-abas]').forEach(box => {
  const bts = $$('[data-aba]', box), pns = $$('[data-painel]', box);
  const set = k => { bts.forEach(b => b.setAttribute('aria-selected', b.dataset.aba === k)); pns.forEach(p => p.hidden = p.dataset.painel !== k); };
  bts.forEach(b => b.addEventListener('click', e => { e.stopPropagation(); set(b.dataset.aba); }));
  set(bts.find(b => b.hasAttribute('data-ini'))?.dataset.aba || bts[0].dataset.aba);
});

/* capítulos (trilha do topo) */
const caps = [];
slides.forEach((s, i) => { const c = s.dataset.cap; if (c && !caps.find(x => x.nome === c)) caps.push({ nome: c, i }); });
const trilha = $('#trilha');
caps.forEach(c => {
  const b = document.createElement('button');
  b.textContent = c.nome; b.dataset.cap = c.nome;
  b.addEventListener('click', e => { e.stopPropagation(); go(c.i); });
  trilha.appendChild(b);
});

/* índice (M) */
const ind = $('#indice'), cols = $('.cols', ind);
caps.forEach(c => {
  const col = document.createElement('div');
  col.innerHTML = `<h4>${c.nome}</h4>`;
  slides.forEach((s, i) => {
    if (s.dataset.cap !== c.nome) return;
    const a = document.createElement('a');
    a.href = '#' + s.id; a.dataset.i = i;
    a.innerHTML = `<i>${pad(i + 1)}</i><span>${s.dataset.title}</span>`;
    a.addEventListener('click', e => { e.preventDefault(); toggleInd(false); go(i); });
    col.appendChild(a);
  });
  cols.appendChild(col);
});
function toggleInd(v) { ind.classList.toggle('on', v ?? !ind.classList.contains('on')); }

/* palco */
function fit() {
  if (mobile) return;
  const k = Math.min(innerWidth / 1600, innerHeight / 900);
  stage.style.setProperty('--scale', k.toFixed(4));
}
addEventListener('resize', fit); fit();

/* navegação */
let cur = -1;
function go(i) {
  i = Math.max(0, Math.min(slides.length - 1, i));
  if (i === cur) return;
  slides[cur]?.classList.remove('on');
  cur = i;
  const s = slides[i];
  s.classList.add('on');
  html.classList.toggle('is-dark', s.classList.contains('dark') || s.classList.contains('capa') || s.classList.contains('capitulo'));
  $('#num').textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
  $('#tit').textContent = s.dataset.title;
  $('#barra').style.width = ((i + 1) / slides.length * 100) + '%';
  $$('#trilha button').forEach(b => b.classList.toggle('on', b.dataset.cap === s.dataset.cap));
  $$('a', ind).forEach(a => a.classList.toggle('on', +a.dataset.i === i));
  history.replaceState(null, '', '#' + s.id);
}
const fromHash = () => Math.max(0, slides.findIndex(s => '#' + s.id === location.hash));

if (mobile) {
  // celular: tudo em rolagem; o índice continua acessível pelo topo
  $('#topo').addEventListener('click', () => toggleInd());
  if (location.hash) $(location.hash)?.scrollIntoView();
} else {
  go(fromHash());
  $('.zona.ant').addEventListener('click', () => go(cur - 1));
  $('.zona.prox').addEventListener('click', () => go(cur + 1));
  addEventListener('hashchange', () => go(fromHash()));
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); go(cur + 1); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); go(cur - 1); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'm' || k === 'M') toggleInd();
    else if (k === 'Escape') toggleInd(false);
    else if (k === 'f' || k === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); }
  });
  // toque: deslizar para os lados
  let x0 = null;
  stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); x0 = null; });
}
})();
