import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#021124] text-slate-100 flex items-center justify-center p-8">
      <div className="max-w-lg w-full bg-[#041a35] rounded-2xl p-8 border border-slate-800 text-center">
        <h1 className="text-2xl font-black text-emerald-300 mb-4">Pagamento Aprovado</h1>
        <p className="text-slate-300 mb-6">Obrigado! Recebemos a confirmação do pagamento. Em breve enviaremos os próximos passos por e-mail.</p>
        <Link href="/" className="inline-block bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl">Voltar à página inicial</Link>
      </div>
    </div>
  );
}
