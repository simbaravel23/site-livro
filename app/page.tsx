import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header / Topo */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-indigo-600">Meu Livro Oficial</h1>
        <Link 
          href="/checkout" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Comprar Agora
        </Link>
      </header>

      {/* Seção Principal (Hero) */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Lado Esquerdo: Imagem da Capa */}
        <div className="flex justify-center">
          <div className="w-72 h-96 md:w-96 md:h-[500px] bg-indigo-900 rounded-lg shadow-2xl flex items-center justify-center text-white text-center p-6 transform hover:scale-105 transition duration-300">
            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-300 mb-2">Livro Físico & E-book</p>
              <h2 className="text-3xl font-extrabold mb-4">[Título do Seu Livro Aqui]</h2>
              <p className="text-xs text-indigo-200">Subtítulo chamativo ou frase de efeito sobre a obra.</p>
            </div>
          </div>
        </div>

        {/* Lado Direito: Textos Chamativos */}
        <div className="space-y-6">
          <span className="text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
            Lançamento Exclusivo
          </span>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Descubra o método definitivo para alcançar seus objetivos.
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Escreva aqui uma sinopse matadora do seu livro. Explique qual dor ele resolve, o que o leitor vai aprender nas páginas e por que ele não pode deixar essa oportunidade passar.
          </p>

          {/* Formatos e Preços */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">Versão E-book</p>
              <p className="text-2xl font-bold text-gray-800">R$ 29,90</p>
              <p className="text-xs text-green-600 font-medium">✨ Envio imediato por e-mail</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">Livro Físico</p>
              <p className="text-2xl font-bold text-gray-800">R$ 59,90</p>
              <p className="text-xs text-gray-500">+ frete para todo o Brasil</p>
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="pt-4">
            <Link 
              href="/checkout" 
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 transition duration-200 transform active:scale-95"
            >
              Quero Garantir Meu Exemplar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}