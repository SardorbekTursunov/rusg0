import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const columns = [
  {
    title: "Platforma",
    links: [
      { href: "/#kurslar", label: "Kurslar" },
      { href: "/#qanday-ishlaydi", label: "Qanday ishlaydi?" },
      { href: "/#biz-haqimizda", label: "Biz haqimizda" },
      { href: "/register", label: "Ro‘yxatdan o‘tish" },
    ],
  },
  {
    title: "O‘rganish",
    links: [
      { href: "/learn", label: "O‘rganish yo‘li" },
      { href: "/vocabulary", label: "Lug‘at" },
      { href: "/review", label: "Takrorlash" },
      { href: "/leaderboard", label: "Reyting" },
    ],
  },
  {
    title: "Yordam",
    links: [
      { href: "/login", label: "Kirish" },
      { href: "/settings", label: "Sozlamalar" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size={32} />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Rus tilini oson o‘rgan! Har kuni 10 daqiqa — haqiqiy natija.
            </p>
            <p className="mt-4 text-xs font-semibold text-ink-faint">
              © {new Date().getFullYear()} RusGo. Barcha huquqlar himoyalangan.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-extrabold text-ink">{col.title}</h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-soft transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
