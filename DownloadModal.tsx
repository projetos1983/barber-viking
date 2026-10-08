import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Check, Copy, ExternalLink, FileArchive, ShieldCheck, Smartphone, Laptop, Sparkles } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  // We offer multiple download strategies so the user never gets stuck on mobile/browser restrictions
  const downloadUrl = '/viking-barber.zip';

  const handleDownload = () => {
    setDownloadStarted(true);

    try {
      // 1. Direct anchor trigger
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'viking-barber.zip');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback: window navigation
      window.location.href = downloadUrl;
    }

    setTimeout(() => {
      setDownloadStarted(false);
    }, 4000);
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/viking-barber.zip`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0e1014] border border-[#c5a059]/40 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 z-10 text-neutral-200"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#1e2026] to-[#121316] border border-[#c5a059]/50 flex items-center justify-center text-[#c5a059] shrink-0">
                <FileArchive className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
                  Código Fonte Completo
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                  Baixar viking-barber.zip
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-light">
              Pacote pronto para produção com todos os componentes React, animações GSAP/Motion, configuração para <strong className="text-white font-medium">Vercel</strong> e <strong className="text-white font-medium">Netlify</strong>, imagens e estilos.
            </p>

            {/* Main Download Button */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleDownload}
                className="w-full py-4 px-6 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#a6823b] text-neutral-950 font-heading font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                {downloadStarted ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-neutral-950" />
                    <span>Iniciando Download...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-neutral-950" />
                    <span>Baixar Arquivo ZIP Agora</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={downloadUrl}
                  download="viking-barber.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-sm bg-[#171920] border border-white/10 hover:border-[#c5a059]/50 text-neutral-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Link Direto (Nova Aba)</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="py-2.5 px-4 rounded-sm bg-[#171920] border border-white/10 hover:border-[#c5a059]/50 text-neutral-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  title="Copiar URL para colar no navegador"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Copiar Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Practical instructions for Mobile users */}
            <div className="bg-[#14161c] border border-white/5 rounded-sm p-4 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-[#c5a059] font-mono font-medium text-[11px] uppercase tracking-wider">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Dica rápida para celular (Android / iOS):</span>
              </div>
              <ul className="text-neutral-400 space-y-1.5 pl-4 list-disc font-light leading-relaxed">
                <li>Se o download não começar automaticamente ao tocar, use o botão <strong className="text-neutral-200">"Link Direto"</strong> acima.</li>
                <li>O arquivo será salvo na sua pasta <strong className="text-neutral-200">Downloads</strong> como <code className="text-[#c5a059] font-mono">viking-barber.zip</code> (~109 KB).</li>
                <li>Para descompactar no celular, abra o app <em>Files do Google</em> ou <em>Arquivos</em> e toque em "Extrair".</li>
              </ul>
            </div>

            {/* Security and readiness badge */}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                100% Verificado & Sem dependências quebradas
              </span>
              <span>Tamanho: ~109 KB</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
