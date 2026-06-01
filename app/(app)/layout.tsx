import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="pt-20 pb-14">
      <Navbar />
      {children}
    </Container>
  );
}
