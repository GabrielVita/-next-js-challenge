import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LogOut, Gift, Calendar, User as UserIcon } from "lucide-react";

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const session = await auth();
  const { lang } = await params;

  // Se não estiver logado, manda de volta pro login
  if (!session?.user) {
    redirect(`/${lang}/login`);
  }

  // Busca dados extras do usuário no banco
  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
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

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Gift className="mb-4 text-indigo-600" />
            <p className="text-sm text-slate-500 font-medium">Interesses</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {userData?.hobbies.map((hobby) => (
                <span key={hobby} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Calendar className="mb-4 text-indigo-600" />
            <p className="text-sm text-slate-500 font-medium">Eventos</p>
            <p className="text-xl font-bold text-slate-900">0 Criados</p>
          </div>
        </div>

        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-12 rounded-3xl text-center">
           <h3 className="font-bold text-indigo-900">Pronto para presentear?</h3>
           <p className="text-indigo-700/70 text-sm mt-2">Crie seu primeiro evento e deixe o GiftWise sugerir o presente ideal.</p>
           <button className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all">
             Criar Evento
           </button>
        </div>
      </div>
    </div>
  );
}