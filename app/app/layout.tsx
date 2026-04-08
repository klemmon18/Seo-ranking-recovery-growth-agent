export const metadata = {
  title: "SEO Agent App",
  description: "Custom GPT SEO action app",
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
