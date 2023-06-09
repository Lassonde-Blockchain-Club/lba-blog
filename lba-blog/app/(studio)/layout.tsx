import "../globals.css";

export const metadata = {
  title: "Lassonde Blockchain Blog",
  description: "Generated by LasDevers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
