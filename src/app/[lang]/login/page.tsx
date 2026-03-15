"use client";
import { useState, use } from "react";
import { Lock, User, ArrowRight } from "lucide-react";
import { loginUser } from "../actions/auth";
import { useFormStatus } from "react-dom";

// Componente do botão separado para o useFormStatus funcionar
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Autenticando..." : "Entrar"}
      {!pending && <ArrowRight size={18} />}
    </button>
  );
}

export default function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="relative isolate bg-blue-100 min-h-full flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bem-vindo de volta</h2>
        <p className="mt-2 text-center text-slate-600">Acesse sua conta GiftWise</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          action={async (formData) => {
            setErrorMessage(null);
            const result = await loginUser(lang, formData);
            if (result?.error) {
              setErrorMessage(result.error);
            }
          }}
          className="space-y-6 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
        >
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-[bounce_0.5s_ease-in-out_2]">
                {errorMessage}
            </div>
            )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 ml-1">Username</label>
            <div className="relative mt-1">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input name="id" type="text" required className="block w-full rounded-2xl border-none bg-slate-100/50 pl-11 py-3.5 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 ml-1">Senha</label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input name="password" type="password" required className="block w-full rounded-2xl border-none bg-slate-100/50 pl-11 py-3.5 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
            </div>
          </div>

          {/* Agora o componente do botão é chamado aqui */}
          <LoginButton />

          <p className="text-center text-sm text-slate-500 mt-4">
            Não tem uma conta? <a href={`/${lang}/register`} className="text-indigo-600 font-semibold hover:underline">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}