import Link from 'next/link';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-[#021124] text-slate-100 flex items-center justify-center p-8">
      <div className="max-w-lg w-full bg-[#041a35] rounded-2xl p-8 border border-slate-800 text-center">
        <h1 className="text-2xl font-black text-rose-400 mb-4">Pagamento Não Aprovado</h1>
        <p className="text-slate-300 mb-6">O pagamento não foi concluído. Você pode tentar novamente ou entrar em contato conosco.</p>
        <Link href="/checkout" className="inline-block bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl">Voltar ao Checkout</Link>
      </div>
    </div>
  );
}
