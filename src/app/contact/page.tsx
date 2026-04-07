import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactPanel } from "@/components/sections/ContactPanel";

export default function Page() {
  return (
    <main>
      <Section
        eyebrow="Contact / Join"
        title="Step into the build."
        subtitle="Students, mentors, and sponsors: reach out. We respond fast and keep it professional."
      >
        <Container>
          <ContactPanel />
        </Container>
      </Section>
    </main>
  );
}

