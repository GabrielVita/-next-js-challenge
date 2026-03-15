import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LogOut, Gift, Calendar, User as UserIcon, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const session = await auth();
  const { lang } = await params;

  if (!session?.user) {
    redirect(`/${lang}/login`);
  }

  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      hobbies: true,
    },
  });

  // --- REMOVEMOS O REDIRECT DAQUI PARA PARAR O LOOP ---
  const hasHobbies = userData?.hobbies && userData.hobbies.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* BANNER DE AVISO: Só aparece se não tiver hobbies */}
        {!hasHobbies && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-3xl flex items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-amber-900 font-bold text-sm">Perfil Incompleto</p>
                <p className="text-amber-700 text-xs">Escolha seus interesses para que possamos sugerir presentes melhores!</p>
              </div>
            </div>
            <Link 
              href={`/${lang}/onboarding/hobbies`}
              className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition-all shrink-0"
            >
              Configurar <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Header de Boas-vindas */}
        <header className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Olá, {userData?.name}! 👋
            </h1>
            <p className="text-slate-500 italic">@{userData?.id}</p>
          </div>
          <form action={async () => { "use server"; await signOut(); }}>
            <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all font-medium">
              <LogOut size={18} /> Sair
            </button>
          </form>
        </header>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-100">
            <UserIcon className="mb-4 opacity-80" />
            <p className="text-sm opacity-80 font-medium">Perfil</p>
            <p className="text-xl font-bold">{userData?.gender}, {userData?.age} anos</p>
          </div>

          {/* BOX DE INTERESSES: Agora estilizado como um card branco */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Gift className="mb-4 text-indigo-600" />
            <p className="text-sm text-slate-500 font-medium mb-2">Interesses</p>
            <div className="flex flex-wrap gap-2">
              {hasHobbies ? (
                userData.hobbies.map((hobby) => (
                  <span 
                    key={hobby.id} 
                    className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-lg border border-slate-200 font-bold uppercase tracking-wider"
                  >
                    {hobby.name}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Nenhum interesse selecionado</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Calendar className="mb-4 text-indigo-600" />
            <p className="text-sm text-slate-500 font-medium">Eventos</p>
            <p className="text-xl font-bold text-slate-900">0 Criados</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-12 rounded-3xl text-center">
           <h3 className="font-bold text-indigo-900 text-lg">Pronto para presentear?</h3>
           <p className="text-indigo-700/70 text-sm mt-2 max-w-sm mx-auto">
             Crie seu primeiro evento e deixe o GiftWise sugerir o presente ideal baseado nos seus hobbies.
           </p>
           <button className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
             Criar Evento
           </button>
        </div>
      </div>
    </div>
  );
}