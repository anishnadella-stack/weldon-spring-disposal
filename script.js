// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Myth/fact flip cards (links inside the back still work)
document.querySelectorAll('.flip').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.tagName === 'A') return;
    card.classList.toggle('on');
  });
});

// Legend highlight
document.querySelectorAll('.legend li').forEach(li => {
  const c = li.dataset.c;
  const on = () => { li.classList.add('on'); li.style.borderColor = c; };
  const off = () => { li.classList.remove('on'); li.style.borderColor = 'transparent'; };
  li.addEventListener('mouseenter', on);
  li.addEventListener('mouseleave', off);
  li.addEventListener('click', () => li.classList.contains('on') ? off() : on());
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.section .wrap > *').forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Active nav link
const links = [...nav.querySelectorAll('a')];
const secs = links.map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let idx = -1;
  secs.forEach((s, i) => { if (s && s.offsetTop <= y) idx = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === idx));
}, { passive: true });
