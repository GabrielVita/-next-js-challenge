"use client";
import { use, useState, useEffect } from "react";
import { Check, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveUserHobbies, getAvailableHobbies } from "../../actions/auth";

export default function HobbiesOnboarding({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const router = useRouter();
  
  const [availableHobbies, setAvailableHobbies] = useState<{id: string, name: string}[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Carrega os hobbies que semeamos no banco
  useEffect(() => {
    getAvailableHobbies().then((data) => {
      setAvailableHobbies(data);
      setFetching(false);
    });
  }, []);

  const toggleHobby = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    if (selected.length < 3) return;
    setLoading(true);
    
    // Chamamos a action
    const result = await saveUserHobbies(selected);

    if (result?.success) {
      // Redirecionamos aqui, fora do fluxo de erro
      router.push(`/${lang}/dashboard`);
      router.refresh();
    } else {
      alert(result?.error || "Ocorreu um erro ao salvar.");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            O que faz seu coração <br /> bater mais forte?
          </h1>
          <p className="text-slate-500 text-lg">
            Escolha pelo menos <strong>3 interesses</strong>. Isso nos ajuda a sugerir presentes que realmente combinam com você.
          </p>
        </div>

        {/* Nuvem de Hobbies */}
        <div className="flex flex-wrap justify-center gap-3 py-4">
          {availableHobbies.map((hobby) => {
            const isSelected = selected.includes(hobby.id);
            return (
              <button
                key={hobby.id}
                onClick={() => toggleHobby(hobby.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 border-2 ${
                  isSelected 
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-lg scale-105" 
                    : "border-white bg-white text-slate-600 hover:border-indigo-200 shadow-sm"
                }`}
              >
                {hobby.name}
                {isSelected && <Check size={18} />}
              </button>
            );
          })}
        </div>

        {/* Botão de Ação */}
        <div className="pt-4 flex flex-col items-center gap-4">
            <button
                onClick={handleFinish}
                disabled={selected.length < 3 || loading}
                className="group relative w-full max-w-sm py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl transition-all hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Concluir Perfil"} 
                {!loading && <ArrowRight size={20} />}
                </span>
            </button>

            {/* BOTÃO PULAR */}
            {!loading && (
                <button
                onClick={() => router.push(`/${lang}/dashboard`)}
                className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                Escolher meus interesses depois
                </button>
            )}
        </div>
      </div>
    </div>
  );
}