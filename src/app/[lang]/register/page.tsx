"use client";
import { useState, useEffect, use } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { registerUser, checkUsername } from "../actions/auth";

export default function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  // Desembrulha os params de forma segura no Client Component
  const resolvedParams = use(params);
  const lang = resolvedParams.lang;
  const [gender, setGender] = useState("masculino");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Estados para Username
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Lógica de Verificação com Debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (username.length >= 3) {
        const result = await checkUsername(username);
        setIsAvailable(result.available);
        setSuggestions(result.suggestions || []);
      } else {
        setIsAvailable(null);
        setSuggestions([]);
      }
    }, 500); // Espera 500ms após o usuário parar de digitar

    return () => clearTimeout(timer);
  }, [username]);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <div className="relative isolate overflow-hidden bg-blue-100 h-full flex flex-col justify-center px-6 py-12">
      {/* Background Decorativo */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125rem -translate-x-1/2 rotate-30deg bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-72.1875rem"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">Crie sua conta</h2>
        <p className="mt-2 text-center text-slate-600">Junte-se ao GiftWise</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form 
          action={async (formData) => {
            if (password !== confirmPassword) return alert("As senhas não coincidem!");
            if (isAvailable === false) return alert("Escolha um username disponível!");
            
            formData.append("gender", gender);
            await registerUser(lang, formData);
          }} 
          className="space-y-5 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
        >
          {/* USERNAME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 ml-1">Username (ID único)</label>
            <div className="relative mt-1">
              <User className={`absolute left-4 top-3.5 h-5 w-5 ${isAvailable === false ? 'text-red-500' : 'text-slate-400'}`} />
              <input 
                name="id" 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                placeholder="ex: gabriel_vita" 
                className={`block w-full rounded-2xl border-none bg-slate-100/50 pl-11 pr-10 py-3.5 text-slate-900 ring-1 ring-inset outline-none transition-all ${
                  isAvailable === false ? 'ring-red-500 focus:ring-red-600' : 
                  isAvailable === true ? 'ring-green-500 focus:ring-green-600' : 'ring-slate-200 focus:ring-indigo-600'
                }`} 
              />
              {isAvailable === true && <CheckCircle2 size={18} className="absolute right-4 top-4 text-green-600" />}
              {isAvailable === false && <AlertCircle size={18} className="absolute right-4 top-4 text-red-500" />}
            </div>

            {/* SUGESTÕES */}
            {isAvailable === false && suggestions.length > 0 && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-1">
                <p className="text-xs text-red-500 font-medium mb-2 ml-1">Username já em uso. Sugestões:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setUsername(sug)}
                      className="text-xs bg-white border border-slate-200 text-indigo-600 px-3 py-1.5 rounded-full hover:border-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1">Nome</label>
              <input name="name" type="text" required className="mt-1 block w-full rounded-2xl border-none bg-slate-100/50 px-4 py-3.5 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1">Idade</label>
              <input name="age" type="number" required className="mt-1 block w-full rounded-2xl border-none bg-slate-100/50 px-4 py-3.5 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>
          </div>

          {/* GÊNERO */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 ml-1 mb-2">Gênero</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender("masculino")}
                className={`py-3.5 rounded-2xl font-semibold border-2 transition-all ${gender === 'masculino' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                Masculino
              </button>
              <button
                type="button"
                onClick={() => setGender("feminino")}
                className={`py-3.5 rounded-2xl font-semibold border-2 transition-all ${gender === 'feminino' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                Feminino
              </button>
            </div>
          </div>

          {/* SENHA */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Senha</label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-2xl border-none bg-slate-100/50 pl-11 pr-12 py-3.5 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* CONFIRMAR SENHA */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Confirmar Senha</label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`block w-full rounded-2xl border-none bg-slate-100/50 pl-11 pr-12 py-3.5 text-slate-900 ring-1 ring-inset outline-none transition-all ${passwordsMatch ? 'ring-green-500 bg-green-50/30' : 'ring-slate-200 focus:ring-indigo-600'}`} 
              />
              {passwordsMatch && <CheckCircle2 size={18} className="absolute right-4 top-4 text-green-600" />}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isAvailable === false}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl shadow-lg text-sm font-bold text-white transition-all ${
              isAvailable === false ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 active:scale-[0.98]'
            }`}
          >
            Finalizar Cadastro
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}