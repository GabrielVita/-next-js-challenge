import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geist = Geist({ subsets: ["latin"] });

// 1. Corrigindo o generateMetadata (params agora é Promise)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params; // Aguardamos os parâmetros aqui
  const isPt = lang === 'pt';
  
  return {
    title: isPt ? "GiftWise | Escolha o presente ideal" : "GiftWise | Choose the perfect gift",
    description: isPt 
      ? "A plataforma inteligente para organizar suas listas de presentes."
      : "The smart platform to organize your gift lists.",
  };
}

// 2. Corrigindo o RootLayout (params agora é Promise)
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Tipado como Promise
}) {
  const { lang } = await params; // Desembrulhando o idioma com await

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${geist.className} bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}