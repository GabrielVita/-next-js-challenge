import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css"; // Note o "../" pois agora o arquivo está uma pasta mais fundo

const geist = Geist({ subsets: ["latin"] });

// Função para gerar metadados dinâmicos baseados no idioma (opcional, mas recomendado)
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isPt = params.lang === 'pt';
  return {
    title: isPt ? "GiftWise | Escolha o presente ideal" : "GiftWise | Choose the perfect gift",
    description: isPt 
      ? "A plataforma inteligente para organizar suas listas de presentes."
      : "The smart platform to organize your gift lists.",
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    // Aqui usamos o params.lang para definir o idioma da página
    <html lang={params.lang} className="scroll-smooth">
      <body className={`${geist.className} bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}