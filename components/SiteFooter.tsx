import Image from "next/image";
import Link from "next/link";
import { brand, contact, navigation, services, socials } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={1254}
              height={1254}
              className="footer-logo"
              loading="lazy"
            />
            <p className="footer-motto">{brand.motto}</p>
            <p>{brand.footerBlurb}</p>
          </div>
          <nav aria-label="Footer">
            <strong>Pages</strong>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <strong>Services</strong>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`}>{s.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/whatsapp-ai-agent">WhatsApp AI Agent</Link>
              </li>
            </ul>
          </div>
          {contact.email || socials.length > 0 ? (
            <div>
              <strong>Contact</strong>
              {contact.email ? (
                <ul>
                  <li>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                </ul>
              ) : null}
              {socials.length > 0 ? (
                <>
                  <strong className="follow-heading">Follow us</strong>
                  <ul>
                    {socials.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {brand.name}. All rights reserved.
          </span>{" "}
          · <Link href="/privacy">Privacy policy</Link> ·{" "}
          <Link href="/terms">Terms of service</Link>
        </div>
      </div>
    </footer>
  );
}
