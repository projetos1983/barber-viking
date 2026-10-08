import React, { useState } from 'react';
import { X, Calendar, Clock, User, Scissors, Check, Send, HardDrive, RefreshCw } from 'lucide-react';
import { SERVICES, BARBERS, BARBERSHOP_INFO, ServiceItem } from '../data/barberData';
import { getAccessToken, googleSignIn } from '../services/auth';
import { createAppointmentFileInDrive } from '../services/drive';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
  onOpenDrive?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  initialService,
  onOpenDrive 
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || SERVICES[0].id
  );
  const [selectedBarber, setSelectedBarber] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('hoje');
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<boolean>(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState<boolean>(false);
  const [driveSavedSuccess, setDriveSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const timeSlots = [
    '09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30'
  ];

  const dateOptions = [
    { id: 'hoje', label: 'Hoje' },
    { id: 'amanha', label: 'Amanhã' },
    { id: 'depois', label: 'Próx. Disponível' }
  ];

  const handleConfirmAndWhatsApp = () => {
    if (!clientName.trim()) {
      alert('Por favor, informe seu nome completo para o agendamento.');
      return;
    }

    const barberName = selectedBarber === 'any' 
      ? 'Primeiro profissional disponível' 
      : BARBERS.find(b => b.id === selectedBarber)?.name || 'Barbeiro Viking';

    const message = `*AGENDAMENTO - VIKING BARBER*%0A%0A` +
      `*Cliente:* ${encodeURIComponent(clientName)}%0A` +
      `*Telefone:* ${encodeURIComponent(clientPhone || 'Não informado')}%0A` +
      `*Serviço:* ${encodeURIComponent(currentService.name)} (${currentService.price})%0A` +
      `*Profissional:* ${encodeURIComponent(barberName)}%0A` +
      `*Data:* ${encodeURIComponent(selectedDate.toUpperCase())}%0A` +
      `*Horário sugerido:* ${encodeURIComponent(selectedTime)}%0A%0A` +
      `Por favor, confirmem a disponibilidade deste horário!`;

    window.open(`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}?text=${message}`, '_blank');
    setConfirmedBooking(true);
  };

  const handleSaveToDrive = async () => {
    setIsSavingToDrive(true);
    try {
      let token = await getAccessToken();
      if (!token) {
        const signin = await googleSignIn();
        token = signin?.accessToken || null;
      }

      if (!token) {
        alert('É necessário autorizar o acesso ao Google Drive para salvar.');
        return;
      }

      const barberName = selectedBarber === 'any' 
        ? 'Mestre da Bancada' 
        : BARBERS.find(b => b.id === selectedBarber)?.name || 'Barbeiro Viking';

      await createAppointmentFileInDrive(token, {
        clientName: clientName || 'Guerreiro Cliente',
        clientPhone: clientPhone || '(11) 99999-9999',
        serviceName: currentService.name,
        servicePrice: currentService.price,
        barberName,
        date: selectedDate,
        time: selectedTime,
      });

      setDriveSavedSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Falha ao salvar no Google Drive.');
    } finally {
      setIsSavingToDrive(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(false);
    setDriveSavedSuccess(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full bg-[#121316] border border-[#c5a059]/40 rounded-sm shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#17181d] px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
              Atendimento Premium
            </span>
            <h3 className="font-heading text-base sm:text-xl font-bold text-white uppercase tracking-wide">
              Agendar Horário na Viking Barber
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-8 sm:h-8 rounded-sm bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedBooking ? (
          <div className="p-6 sm:p-8 text-center space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
              <Check className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h4 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase mb-1.5 sm:mb-2">
                Solicitação Iniciada!
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Abrimos o WhatsApp da barbearia com os dados do seu agendamento para confirmação imediata.
              </p>
            </div>
            
            <div className="bg-neutral-900 p-4 rounded-sm border border-white/10 text-left text-xs space-y-1.5 text-neutral-300">
              <div><strong className="text-white">Serviço:</strong> {currentService.name} ({currentService.price})</div>
              <div><strong className="text-white">Horário:</strong> {selectedDate} às {selectedTime}</div>
              <div><strong className="text-white">Cliente:</strong> {clientName}</div>
            </div>

            {/* Google Drive Option */}
            <div className="pt-2">
              {driveSavedSuccess ? (
                <div className="p-3 bg-[#c5a059]/15 border border-[#c5a059]/40 rounded-sm text-xs text-[#dfc282] flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-[#c5a059]" />
                  <span>Comprovante salvo no seu Google Drive com sucesso!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveToDrive}
                  disabled={isSavingToDrive}
                  className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-[#c5a059]/40 text-xs text-neutral-200 rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  {isSavingToDrive ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c5a059]" />
                  ) : (
                    <HardDrive className="w-3.5 h-3.5 text-[#c5a059]" />
                  )}
                  <span>Salvar comprovante no meu Google Drive</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {onOpenDrive && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDrive();
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-sm bg-neutral-900 border border-white/10 text-white font-medium text-xs uppercase tracking-wider hover:border-[#c5a059]/40 min-h-[44px] flex items-center justify-center"
                >
                  Abrir Viking Drive
                </button>
              )}
              <button
                onClick={handleReset}
                className="w-full sm:flex-1 px-6 py-3 rounded-sm bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 min-h-[44px] flex items-center justify-center"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            
            {/* CRO: 1-Click Fast Booking Option */}
            <div className="p-3 rounded-sm bg-[#171920] border border-[#c5a059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="text-[#c5a059]">⚡</span>
                <span>Prefere agendar direto sem preencher dados?</span>
              </div>
              <a
                href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20r%C3%A1pido%20na%20Viking%20Barber.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#c5a059] hover:underline font-semibold whitespace-nowrap"
              >
                Chamar no WhatsApp Direto →
              </a>
            </div>

            {/* Step 1: Select Service */}
            <div>
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5 mb-2.5">
                <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>1. Escolha o Serviço</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-3 text-left rounded-sm border transition-all text-xs flex flex-col justify-between min-h-[58px] cursor-pointer ${
                      selectedServiceId === s.id
                        ? 'bg-[#1c1e24] border-[#c5a059] text-white shadow-sm'
                        : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-[#c5a059] font-bold mt-1 font-mono">{s.price} · {s.duration}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Barber */}
            <div>
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5 mb-2.5">
                <User className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>2. Barbeiro Preferido</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBarber('any')}
                  className={`p-2.5 text-center rounded-sm border text-xs transition-all min-h-[42px] cursor-pointer ${
                    selectedBarber === 'any'
                      ? 'bg-[#1c1e24] border-[#c5a059] text-white'
                      : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  Qualquer Barbeiro
                </button>
                {BARBERS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBarber(b.id)}
                    className={`p-2.5 text-center rounded-sm border text-xs transition-all min-h-[42px] cursor-pointer ${
                      selectedBarber === b.id
                        ? 'bg-[#1c1e24] border-[#c5a059] text-white'
                        : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {b.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>3. Data</span>
                </label>
                <div className="flex gap-2">
                  {dateOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedDate(opt.id)}
                      className={`flex-1 py-2.5 px-1.5 text-center rounded-sm border text-xs font-medium transition-all min-h-[42px] cursor-pointer ${
                        selectedDate === opt.id
                          ? 'bg-[#1c1e24] border-[#c5a059] text-white'
                          : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>4. Horário</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-sm py-2.5 px-3 text-sm sm:text-xs text-white focus:outline-none focus:border-[#c5a059] min-h-[42px]"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time} hrs
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Client Info */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Alexandre Magno"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-sm py-3 sm:py-2.5 px-3 text-base sm:text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1">
                  Seu Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-sm py-3 sm:py-2.5 px-3 text-base sm:text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* Price Preview & Submit */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shrink-0">
              <div className="flex items-baseline justify-between sm:block">
                <span className="text-[10px] uppercase text-neutral-500 block font-mono">Total Estimado</span>
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#c5a059]">{currentService.price}</span>
              </div>

              <button
                type="button"
                onClick={handleConfirmAndWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-gradient-to-r from-[#dfc282] to-[#c5a059] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-lg min-h-[48px] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirmar via WhatsApp</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
