"use client";
import { use, useState, useEffect } from "react";
import { Check, Sparkles, ArrowRight, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveUserHobbies, getAvailableHobbies } from "../../actions/auth";

export default function HobbiesOnboarding({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const router = useRouter();
  
  const [availableHobbies, setAvailableHobbies] = useState<{id: string, name: string}[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]); // Agora guardamos os NOMES
  const [customHobby, setCustomHobby] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAvailableHobbies().then((data) => {
      // getAvailableHobbies deve retornar o Top 10 ordenado por uso no servidor
      setAvailableHobbies(data);
      setFetching(false);
    });
  }, []);

  const toggleHobby = (name: string) => {
    const normalized = name.toLowerCase().trim();
    setSelectedNames(prev => 
      prev.includes(normalized) 
        ? prev.filter(item => item !== normalized) 
        : [...prev, normalized]
    );
  };

    const handleAddCustom = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!customHobby.trim()) return;

        // Transformamos "musica" em "Musica" antes de adicionar
        const formattedHobby = customHobby.charAt(0).toUpperCase() + customHobby.slice(1).toLowerCase();

        toggleHobby(formattedHobby);
        setCustomHobby("");
    };

const handleFinish = async () => {
  if (selectedNames.length < 3) return;
  setLoading(true);
  
  try {
    const result = await saveUserHobbies(selectedNames);

    if (result?.success) {
      // 1. Forçamos o refresh dos dados no background
      router.refresh(); 
      // 2. Navegamos imediatamente
      router.push(`/${lang}/dashboard`);
      
      // 3. Fallback: Se em 5 segundos não mudar, tentamos um refresh forçado
      // Isso resolve casos onde o cache do Next.js "engasga"
      setTimeout(() => {
        if (window.location.pathname.includes('onboarding')) {
          window.location.href = `/${lang}/dashboard`;
        }
      }, 4000);

    } else {
      setLoading(false);
      alert(result?.error || "Erro ao salvar");
    }
  } catch (e) {
    setLoading(false);
    console.error("Erro na action:", e);
    // Se der erro na action, tentamos forçar o caminho
    window.location.href = `/${lang}/dashboard`;
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
            Escolha pelo menos 3 interesses ou adicione os seus.
          </p>
        </div>

        {/* Input para Adicionar Customizado */}
        <form onSubmit={handleAddCustom} className="relative max-w-md mx-auto">
          <input 
            type="text"
            value={customHobby}
            onChange={(e) => setCustomHobby(e.target.value)}
            placeholder="Ex: Tocar Ukelele, Astronomia..."
            className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm focus:border-indigo-500 outline-none transition-all pr-16 text-slate-700 font-medium"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>

        {/* Nuvem de Hobbies (Top 10 + Selecionados Customizados) */}
        <div className="flex flex-wrap justify-center gap-3 py-4">
          {/* Mostra os disponíveis */}
          {availableHobbies.map((hobby) => {
            const isSelected = selectedNames.includes(hobby.name.toLowerCase());
            return (
                <button
                    key={hobby.id}
                    onClick={() => toggleHobby(hobby.name)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 border-2 capitalize ${
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

          {/* Mostra os que o usuário digitou e não estão na lista disponível */}
          {selectedNames.map(name => {
            if (availableHobbies.some(h => h.name.toLowerCase() === name)) return null;
            return (
              <button
                key={name}
                onClick={() => toggleHobby(name)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border-2 border-indigo-600 bg-indigo-600 text-white shadow-lg scale-105 transition-all"
              >
                {name} <Check size={18} />
              </button>
            )
          })}
        </div>

        {/* Botão de Ação */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <button
            onClick={handleFinish}
            disabled={selectedNames.length < 3 || loading}
            className="group relative w-full max-w-sm py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl transition-all hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Concluir Perfil"} 
              {!loading && <ArrowRight size={20} />}
            </span>
          </button>

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