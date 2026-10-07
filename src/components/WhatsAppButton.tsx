import React, { useState } from 'react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = (form.elements.namedItem('msg') as HTMLInputElement).value;
    const url = `https://wa.me/?text=${encodeURIComponent('Hola Rin no mori! Quisiera consultar sobre: ' + text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-40 group flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#586427] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-none border-2 border-white/40"
          title="¿Necesitas ayuda?"
        >
          <span className="material-symbols-outlined text-[28px]">chat</span>
        </button>

        {/* Hover Tooltip */}
        <span className="bg-[#442a22] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
          ¿Necesitas ayuda?
        </span>
      </div>

      {/* Floating Chat Box */}
      {isOpen && (
        <div className="fixed bottom-40 md:bottom-24 left-4 md:left-8 w-80 bg-[#fff8f5] rounded-2xl shadow-2xl border border-[#827470]/15 p-4 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex justify-between items-center pb-3 border-b border-[#827470]/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#586427] animate-pulse"></span>
              <h4 className="font-bold text-[#442a22] text-sm">Rin no mori - Atención</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#504441] hover:text-[#442a22] text-xs p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-[#504441] mb-3 leading-relaxed">
            ¿Tienes dudas sobre eventos, envíos especiales o alergias? ¡Escríbenos directamente por WhatsApp!
          </p>

          <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
            <input
              name="msg"
              type="text"
              placeholder="Escribe tu mensaje..."
              defaultValue="Hola! Me gustaría cotizar para un evento especial"
              className="w-full text-xs p-2.5 bg-[#f5ece7] rounded-xl border border-[#827470]/15 text-[#1e1b18] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#586427] hover:bg-[#586427]/90 text-white font-semibold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              Enviar Mensaje <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
