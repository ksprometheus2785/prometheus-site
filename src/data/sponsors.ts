export type SponsorTier = "Titan" | "Forge" | "Spark";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
  logo: string;
  url?: string;
};

export const sponsorTiers: Array<{
  tier: SponsorTier;
  subtitle: string;
}> = [
  { tier: "Titan", subtitle: "Flagship partners powering the program" },
  { tier: "Forge", subtitle: "Major support for build season execution" },
  { tier: "Spark", subtitle: "Community partners and in-kind support" }
];

export const sponsors: Sponsor[] = [
  
];
