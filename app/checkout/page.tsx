'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoLivro, setTipoLivro] = useState<'ebook' | 'fisico'>('ebook');
  
  // Estados do endereço (para livro físico)
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Função para enviar os dados para o nosso backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem('');

    const dadosDoPedido = {
      nome,
      email,
      telefone,
      tipoLivro,
      valorTotal: tipoLivro === 'ebook' ? 29.90 : 59.90,
      // Só envia o endereço se for livro físico
      ...(tipoLivro === 'fisico' && { cep, rua, numero, complemento, bairro, cidade, estado })
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosDoPedido),
      });

      const resultado = await response.json();

      if (response.ok) {
        setMensagem('✨ Cadastro e pedido salvos com sucesso no PostgreSQL!');
        // Aqui no futuro você redirecionará para a tela de pagamento
      } else {
        setMensagem(`❌ Erro: ${resultado.error}`);
      }
    } catch (error) {
      setMensagem('❌ Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">Cadastro do Comprador</h2>
        <p className="text-gray-500 text-center mb-8">Preencha seus dados para garantir o seu livro</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-600 border-b pb-1">1. Dados Pessoais</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Escolha do Formato */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-600 border-b pb-1">2. Escolha o Formato do Livro</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex flex-col p-4 border rounded-xl cursor-pointer transition select-none ${tipoLivro === 'ebook' ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">E-book (PDF)</span>
                  <input
                    type="radio"
                    name="tipoLivro"
                    value="ebook"
                    checked={tipoLivro === 'ebook'}
                    onChange={() => setTipoLivro('ebook')}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-sm text-gray-500 mb-1">Leitura imediata no celular ou Kindle</span>
                <span className="text-lg font-black text-indigo-600">R$ 29,90</span>
              </label>

              <label className={`flex flex-col p-4 border rounded-xl cursor-pointer transition select-none ${tipoLivro === 'fisico' ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">Livro Físico</span>
                  <input
                    type="radio"
                    name="tipoLivro"
                    value="fisico"
                    checked={tipoLivro === 'fisico'}
                    onChange={() => setTipoLivro('fisico')}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-sm text-gray-500 mb-1">Capa impressa entregue na sua casa</span>
                <span className="text-lg font-black text-indigo-600">R$ 59,90</span>
              </label>
            </div>
          </div>

          {/* Endereço de Entrega (Condicional) */}
          {tipoLivro === 'fisico' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-indigo-600 border-b pb-1">3. Endereço de Entrega</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={cep}
                    onChange={(e) => setCEP(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Logradouro</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complemento (Opcional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado (UF)</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="SP"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-center uppercase"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botão de Finalização */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg shadow-indigo-100 transition duration-200 disabled:bg-gray-400 disabled:shadow-none mt-4"
          >
            {carregando ? 'Salvando dados...' : 'Ir para o Pagamento'}
          </button>

          {/* Mensagem de Feedback */}
          {mensagem && (
            <p className="text-center font-medium mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-800">
              {mensagem}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}