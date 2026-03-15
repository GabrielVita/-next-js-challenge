import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import { getDictionary, Locale } from "@/lib/get-dictionary";

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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    // 'h-full' no html e body é essencial para que o 'h-screen' funcione corretamente
    <html lang={lang} className="scroll-smooth h-full">
      <body className={`${geist.className} bg-blue-100 antialiased h-full`}>
        {/* 'h-screen' garante que o container principal tenha a altura exata da janela */}
        <main className="flex flex-col h-screen overflow-hidden">
          <Navbar dict={dict} lang={lang} />
          
          {/* 'flex-1' faz com que esta div ocupe todo o espaço restante abaixo da navbar */}
          {/* 'overflow-y-auto' permite scroll APENAS se o conteúdo da página for realmente grande */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}