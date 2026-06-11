import Link from 'next/link';

export default function LandingPage() {
  return (
    // Fundo alterado para o Azul Marinho Profundo da Regenerar
    <div className="min-h-screen bg-[#021124] text-slate-100 font-sans antialiased">
      
      {/* Barra de Topo / Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#021124]/90 border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-xl font-black tracking-tight text-white uppercase">
              REGENERA<span className="text-emerald-400 font-medium text-sm lowercase">.livro</span>
            </span>
          </div>
          <Link 
            href="/checkout" 
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/10 transition transform hover:-translate-y-0.5"
          >
            Quero o Livro
          </Link>
        </div>
      </header>

      {/* Seção Hero (Apresentação Principal) */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-12 gap-12 items-center">
        
        {/* Lado do Texto */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            📚 Método Prático e Comprovado
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            TRANSFORME <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">SEU CORPO</span> E SUA SAÚDE.
          </h2>
          <p className="text-lg text-slate-300 font-normal leading-relaxed">
            Descubra o passo a passo científico e comportamental para regenerar sua saúde, reconquistar sua vitalidade e atingir seus objetivos de forma leve e duradoura.
          </p>

          {/* Formatos com Design de Cards Adaptados ao Fundo Escuro */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-[#041a35] p-5 rounded-2xl border border-slate-800 shadow-xl hover:border-emerald-500/30 transition">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Formato Digital</span>
              <p className="text-lg font-bold text-white mt-1">E-book (PDF)</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-black text-white">R$ 29,90</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">📥 Acesso imediato no seu e-mail</p>
            </div>

            <div className="bg-[#041a35] p-5 rounded-2xl border border-slate-800 shadow-xl hover:border-emerald-500/30 transition">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Formato Impresso</span>
              <p className="text-lg font-bold text-white mt-1">Livro Físico</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-black text-white">R$ 59,90</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">📦 Frete calculado no checkout</p>
            </div>
          </div>

          <div className="pt-4">
            <Link 
              href="/checkout" 
              className="block md:inline-block text-center bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-lg py-4 px-10 rounded-2xl shadow-xl shadow-emerald-400/20 transition transform hover:scale-[1.01] active:scale-95"
            >
              Garantir Meu Exemplar Agora
            </Link>
          </div>
        </div>

        {/* Lado da Capa do Livro (Com a Imagem Real do Logo) */}
<div className="md:col-span-5 flex justify-center">
  <div className="relative group">
    {/* Efeito sutil de brilho neon verde/azul atrás do livro */}
    <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
    
    {/* Estrutura Física do Livro */}
    <div className="relative w-64 h-92 md:w-76 md:h-[460px] bg-gradient-to-b from-[#041a35] to-[#010914] rounded-2xl shadow-2xl flex flex-col justify-between p-6 border border-slate-800/80 overflow-hidden">
      
      {/* Efeito de textura/reflexo de livro físico */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      {/* Topo da Capa */}
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Livro Oficial
        </span>
      </div>
      
      {/* Centro: Imagem Real da Capa */}
      <div className="flex flex-col items-center justify-center my-auto space-y-4">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-2xl p-4 shadow-xl flex items-center justify-center transform group-hover:scale-[1.03] transition duration-500">
          <img 
            src="/logo-regenerar.png" 
            alt="Logo Regenerar" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Textos Complementares da Capa */}
        <div className="text-center">
          <h3 className="text-xl font-black text-white tracking-tight leading-none uppercase">
            O GUIA DEFINITIVO
          </h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            Método Regenerar Integrado
          </p>
        </div>
      </div>
      
      {/* Rodapé da Capa */}
      <div className="border-t border-slate-800/60 pt-3 text-center">
        <p className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
          Saúde, Corpo & Mente
        </p>
      </div>

    </div>
  </div>
</div>
      </section>

      {/* Seção de Benefícios */}
      <section className="bg-[#010b16] border-y border-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h4 className="text-center text-2xl font-bold text-white mb-12">O que você vai encontrar no livro:</h4>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold border border-emerald-500/20">01</div>
              <h5 className="font-bold text-white">Mentalidade Blindada</h5>
              <p className="text-sm text-slate-400 leading-relaxed">Como reprogramar sua relação com a comida e acabar com a ansiedade de forma definitiva.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold border border-emerald-500/20">02</div>
              <h5 className="font-bold text-white">Cronograma de Hábitos</h5>
              <p className="text-sm text-slate-400 leading-relaxed">Passo a passo estruturado para implementar uma rotina saudável sem estresse.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold border border-emerald-500/20">03</div>
              <h5 className="font-bold text-white">Estratégias Alimentares</h5>
              <p className="text-sm text-slate-400 leading-relaxed">Guia limpo sobre alimentos regenerativos que aceleram seu metabolismo naturalmente.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}