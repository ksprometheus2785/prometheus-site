import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { team } from "@/data/team";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/25">
      <Container className="px-safe py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="font-display text-xl text-white">
              {team.number} <span className="text-white/70">{team.name}</span>
            </div>
            <div className="text-sm text-white/65">
              {team.org} · {team.location}
            </div>
            <div className="text-sm text-white/65">
              <a
                className="underline decoration-white/25 underline-offset-4 hover:decoration-white/60"
                href={`mailto:${team.contact.email}`}
              >
                {team.contact.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-white/65 md:grid-cols-3">
            {[
              ["About", "/about"],
              ["Seasons", "/seasons"],
              ["Gallery", "/gallery"],
              ["Sponsors", "/sponsors"],
              ["Contact", "/contact"],
              ["Home", "/"]
            ].map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} FRC {team.number} {team.name}. All rights reserved.
          </div>
          <div>Update text and media via /src/data and /public/media.</div>
        </div>
      </Container>
    </footer>
  );
}
