// src/app/[lang]/page.tsx
import { getDictionary, Locale } from "@/lib/get-dictionary";
import { Gift, ArrowRight } from "lucide-react";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>; // Agora params é uma Promise
}) {
  // Aguardamos o params e garantimos que o lang seja tratado como o tipo Locale
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  const dict = await getDictionary(lang);

  return (
    <div className="relative isolate overflow-hidden bg-blue-100 min-h-screen">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125rem -translate-x-1/2 rotate-30deg bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center flex flex-col items-center">
        
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg animate-bounce">
          <Gift className="h-10 w-10 text-white" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          {dict.home.title} <span className="text-indigo-600">{dict.home.titleAccent}</span>
        </h1>
        
        <p className="mt-6 text-base text-gray-600 sm:text-xl max-w-prose">
          {dict.home.description} <span className="font-bold text-indigo-600">{dict.home.call}</span> {dict.home.objetive}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={`/${lang}/dashboard`}
            className="w-full sm:w-auto rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            {dict.home.buttonStart}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#saiba-mais" className="text-sm font-semibold leading-6 text-gray-900">
            {dict.home.buttonHowItWorks} <span aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>
  );
}