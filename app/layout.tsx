import CosmicBackground from "./CosmicBackground";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><CosmicBackground />{children}</body></html>);
}
