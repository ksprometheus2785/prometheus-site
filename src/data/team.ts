export const team = {
  number: "2785",
  name: "Prometheus",
  org: "Kent School",
  location: "Kent, Connecticut, USA",
  rookieYear: 2009,
  tagline: "Forged in fire. Built for precision.",
  shortBio:
    "A student-built, mentor-guided robotics program focused on engineering excellence, disciplined execution, and high-impact teamwork.",
  contact: {
    email: "ksprometheus2785@gmail.com",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
    github: "https://github.com/"
  }
} as const;

export const stats = [
  { label: "Rookie Year", value: "2009" },
  { label: "Home Base", value: "Kent, CT" },
  { label: "Build Focus", value: "Design + Iterate" },
  { label: "Culture", value: "Calm Under Pressure" }
] as const;

export const highlights = [
  {
    title: "Engineering-first",
    desc: "Design reviews, tight tolerances, and systems thinking. We build robots that work when it counts."
  },
  {
    title: "Ready on the field",
    desc: "Drive practice, strategy, and match prep so nothing on game day is a surprise."
  },
  {
    title: "Student-led",
    desc: "Students run design, programming, business, outreach, media, and scouting."
  }
] as const;
