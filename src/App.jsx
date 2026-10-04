import { useState, useEffect } from "react";
import site from "./site.js";

const wa = (t = site.waText) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t)}`;
const rp = (n) => "Rp" + n.toLocaleString("id-ID");
const P = {
  check: "M5 12l5 5L20 7",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  clock: "M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  cart: "M3 4h2l2 11h11l2-8H6M9 20h.01M17 20h.01",
  arrow: "M5 12h14M13 6l6 6-6 6",
  bean: "M7 17c-3-4-1-11 6-13 3 4 1 11-6 13zM9 15c2-3 3-5 4-8",
};

function Icon({ n, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[n]} />
    </svg>
  );
}

const Ring = ({ n }) => (
  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent/60 text-accent">
    <Icon n={n} />
  </span>
);

function Pic({ src, alt, className }) {
  const [failed, setFailed] = useState(null);
  return failed !== src ? (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(src)} className={className} />
  ) : (
    <div role="img" aria-label={alt} className={`${className} grid place-items-center bg-gradient-to-br from-[#2a1c14] to-[#150e0a] text-5xl`}>
      ☕
    </div>
  );
}

const Kicker = ({ children }) => <p className="font-script text-2xl text-accent">{children}</p>;
const btnMain = "inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-ink hover:brightness-110";
const btnLine = "inline-flex items-center gap-2 rounded-lg border border-cream/50 px-6 py-3 font-bold hover:bg-white/10";

// NAVBAR
const links = [
  ["Beranda", "#"],
  ["Tentang", "#tentang"],
  ["Menu", "#menu"],
  ["Testimoni", "#testimoni"],
  ["FAQ", "#faq"],
  ["Kontak", "#kontak"],
];
const ids = links.map(([, h]) => h.slice(1));

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => {
      if (window.scrollY < 200) setActive("");
      else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) setActive("kontak");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

// <NAVBAR>
function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" className="font-serif text-xl font-bold">
          <span className="text-accent">{site.name[0]}</span>
          {site.name[1]}
        </a>
        <button className="rounded border border-line px-3 py-1 md:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>
          Menu
        </button>
        <ul className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-4 border-b border-line bg-ink p-4 md:static md:flex md:w-auto md:flex-row md:gap-8 md:border-0 md:p-0`}>
          {links.map(([l, h]) => {
            const on = active === h.slice(1);
            return (
              <li key={h}>
                <a href={h} onClick={() => setOpen(false)} aria-current={on ? "location" : undefined} className={`font-medium transition-colors hover:text-accent ${on ? "text-accent" : "text-cream/90"}`}>
                  {l}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

// HERO
function Hero() {
  const h = site.hero;
  return (
    <section className="relative isolate overflow-hidden">
      <img src="/img/background.png" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/80 to-ink/20" />
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-36">
        <Kicker>{h.kicker}</Kicker>
        <h1 className="mt-2 max-w-2xl font-serif text-5xl font-bold leading-tight md:text-7xl">
          {h.title} <span className="text-accent">{h.accent}</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-mute">{h.desc}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#menu" className={btnMain}>
            Lihat Menu <Icon n="arrow" />
          </a>
          <a href="#tentang" className={btnLine}>
            Cerita Kami
          </a>
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
          {h.badges.map(([n, t]) => (
            <li key={t} className="flex items-center gap-3 text-sm">
              <Ring n={n} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ABOUT
function About() {
  const a = site.about;
  return (
    <section id="tentang" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
      <Pic src="/img/gambar-about.jpg" alt="Suasana kedai" className="aspect-4/3 w-full rounded-2xl object-cover" />
      <div>
        <Kicker>{a.kicker}</Kicker>
        <h2 className="mt-1 font-serif text-4xl font-bold">
          {a.title} <span className="text-accent">{a.accent}</span>
        </h2>
        <p className="mt-4 max-w-md text-mute">{a.desc}</p>
        <ul className="mt-6 space-y-3">
          {a.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="text-accent">
                <Icon n="check" />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <a href={wa()} className={`${btnMain} mt-8`}>
          Hubungi Kami <Icon n="arrow" />
        </a>
      </div>
    </section>
  );
}

// MENU
function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 pb-20">
      <div className="text-center">
        <Kicker>Andalan Kami</Kicker>
        <h2 className="font-serif text-4xl font-bold">Menu Favorit</h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {site.menu.map((m) => (
          <article key={m.name} className="rounded-2xl border border-line bg-card p-4">
            <Pic src={m.img} alt={m.name} className="aspect-square w-full rounded-xl object-cover" />
            <h3 className="mt-4 font-bold">{m.name}</h3>
            <p className="mt-1 min-h-10 text-sm text-mute">{m.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold">{rp(m.price)}</span>
              <a href={wa(`Halo, saya mau pesan ${m.name}.`)} aria-label={`Pesan ${m.name}`} className="grid h-10 w-10 place-items-center rounded-lg border border-accent/60 text-accent hover:bg-accent hover:text-ink">
                <Icon n="cart" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// PERKS
function Perks() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="grid gap-6 rounded-2xl border border-line bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
        {site.perks.map(([n, t, d]) => (
          <div key={t} className="flex items-center gap-4">
            <Ring n={n} />
            <div>
              <p className="font-bold">{t}</p>
              <p className="text-sm text-mute">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// TESTIMONIALS
function Testimonials() {
  return (
    <section id="testimoni" className="mx-auto max-w-6xl px-4 pb-20">
      <div className="text-center">
        <Kicker>Kata Mereka</Kicker>
        <h2 className="font-serif text-4xl font-bold">Testimoni</h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {site.testimonials.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-line bg-card p-6">
            <p className="text-accent" aria-label="Bintang 5 dari 5">
              ★★★★★
            </p>
            <blockquote className="mt-3 text-cream/90">"{t.text}"</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-bold">{t.name}</span>
              <span className="text-mute"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// FAQ
function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-20">
      <div className="text-center">
        <Kicker>Ada Pertanyaan?</Kicker>
        <h2 className="font-serif text-4xl font-bold">Pertanyaan Umum</h2>
      </div>
      <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-card px-6">
        {site.faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-bold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-mute">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// FOOTER
function Footer() {
  const h = "mb-3 font-serif text-lg font-bold text-accent";
  return (
    <footer id="kontak" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-bold">
            <span className="text-accent">{site.name[0]}</span>
            {site.name[1]}
          </p>
          <p className="mt-3 text-sm text-mute">Kopi lokal yang diseduh pelan dan dinikmati santai.</p>
        </div>
        <div>
          <p className={h}>Tautan</p>
          <ul className="space-y-2 text-sm text-mute">
            <li>
              <a href="#tentang" className="hover:text-accent">
                Tentang
              </a>
            </li>
            <li>
              <a href="#menu" className="hover:text-accent">
                Menu
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className={h}>Jam Buka</p>
          <p className="text-sm text-mute">{site.hours}</p>
        </div>
        <div>
          <p className={h}>Kontak</p>
          <ul className="space-y-2 text-sm text-mute">
            <li>
              <a href={wa()} className="hover:text-accent">
                Chat WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-mute">
        &copy; {new Date().getFullYear()} {site.name.join("")}.
      </p>
    </footer>
  );
}

// APP
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Perks />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <a href={wa()} aria-label="Chat WhatsApp" className="fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
