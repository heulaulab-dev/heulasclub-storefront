import Link from "next/link";
import { InstagramLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-2xl font-bold tracking-[0.15em] uppercase mb-4">HEULASCLUB</p>
            <p className="text-sm text-[var(--text-secondary)] max-w-[28ch] leading-relaxed">
              Premium streetwear for the underground. Every drop is limited. Every piece is made to last.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <InstagramLogo size={20} weight="light" strokeWidth={1.5} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <XLogo size={20} weight="light" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-tertiary)] mb-4">Shop</p>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "All Products" },
                { href: "/products?category=Tops", label: "Tops" },
                { href: "/products?category=Bottoms", label: "Bottoms" },
                { href: "/products?category=Outerwear", label: "Outerwear" },
                { href: "/products?category=Accessories", label: "Accessories" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-tertiary)] mb-4">Info</p>
            <ul className="space-y-3">
              {[
                { href: "#", label: "About" },
                { href: "#", label: "Sizing Guide" },
                { href: "#", label: "Shipping" },
                { href: "#", label: "Returns" },
                { href: "#", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-tertiary)]"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p>&copy; {year} HEULASCLUB. All rights reserved.</p>
          <p className="font-mono text-[10px] tracking-wider">BUILT FOR THE COLLECTIVE</p>
        </div>
      </div>
    </footer>
  );
}