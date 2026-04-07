import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Gallery } from "@/components/sections/Gallery";
import { galleryCategories, galleryItems } from "@/data/gallery";

export default function Page() {
  return (
    <main>
      <Section
        eyebrow="Gallery"
        title="Photo & Videos"
        subtitle="Photos and videos across build season, competition weekends, outreach, and the moments between."
        animateTitle={false}
      >
        <Container>
          <Gallery items={galleryItems} categories={galleryCategories} />
        </Container>
      </Section>
    </main>
  );
}
