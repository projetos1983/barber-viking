import React, { useState, useEffect } from 'react';
import { X, HardDrive, FileText, Trash2, ExternalLink, Plus, RefreshCw, AlertTriangle, CheckCircle2, User as UserIcon, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';
import { googleSignIn, logout, getAccessToken, initAuth } from '../services/auth';
import { listDriveFiles, deleteDriveFile, createAppointmentFileInDrive, DriveFileItem } from '../services/drive';

interface DriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriveModal: React.FC<DriveModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Destructive delete confirmation dialog state
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
        loadFiles(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadFiles = async (authToken?: string) => {
    const activeToken = authToken || token || (await getAccessToken());
    if (!activeToken) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const driveFiles = await listDriveFiles(activeToken);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Não foi possível carregar os arquivos do Google Drive.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setToken(result.accessToken);
        setSuccessMessage('Conectado ao Google Drive com sucesso!');
        await loadFiles(result.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Erro ao autenticar com o Google. Verifique se as janelas popup estão habilitadas.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setToken(null);
    setFiles([]);
    setSuccessMessage('Desconectado com sucesso.');
  };

  // Safe deletion with mandatory confirmation dialog
  const requestDeleteFile = (file: DriveFileItem) => {
    setFileToDelete(file);
  };

  const confirmDeleteFile = async () => {
    if (!fileToDelete) return;
    const activeToken = token || (await getAccessToken());
    if (!activeToken) {
      setErrorMessage('Sessão expirada. Por favor, conecte-se novamente.');
      return;
    }

    setIsDeleting(true);
    try {
      await deleteDriveFile(activeToken, fileToDelete.id);
      setSuccessMessage(`O arquivo "${fileToDelete.name}" foi excluído do Google Drive com sucesso.`);
      setFileToDelete(null);
      await loadFiles(activeToken);
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao excluir arquivo.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick action: Generate a sample style record
  const handleCreateSampleRecord = async () => {
    const activeToken = token || (await getAccessToken());
    if (!activeToken) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      await createAppointmentFileInDrive(activeToken, {
        clientName: currentUser?.displayName || 'Guerreiro Viking',
        clientPhone: '(11) 98765-4321',
        serviceName: 'Combo Viking (Corte + Barboterapia)',
        servicePrice: 'R$ 150',
        barberName: 'Ragnar Vasconcelos',
        date: 'Próxima Sexta-feira',
        time: '18:00',
      });
      setSuccessMessage('Novo comprovante e ficha de estilo salvos no seu Google Drive!');
      await loadFiles(activeToken);
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao salvar no Google Drive.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-[#121316] border border-[#c5a059]/40 rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#17181d] px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0">
              <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059]" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                Google Workspace Sync
              </span>
              <h3 className="font-heading text-base sm:text-xl font-bold text-white uppercase tracking-wide">
                Viking Drive · Seus Comprovantes
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-8 sm:h-8 rounded-sm bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div className="bg-red-950/60 border-b border-red-500/30 px-6 py-3 text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-[#c5a059]/15 border-b border-[#c5a059]/30 px-6 py-3 text-xs text-[#dfc282] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button 
              onClick={() => setSuccessMessage(null)} 
              className="text-xs text-neutral-400 hover:text-white"
            >
              ×
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {!currentUser ? (
            /* Unauthenticated state: Official Sign in with Google Button */
            <div className="text-center py-8 px-4 space-y-6">
              <div className="max-w-md mx-auto space-y-3">
                <h4 className="font-heading text-xl font-bold text-white uppercase">
                  Sincronize com sua Conta Google
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Conecte seu Google Drive com segurança para arquivar comprovantes de atendimento, orientações personalizadas de visagismo e cuidados para barba e cabelo diretamente na sua nuvem.
                </p>
              </div>

              {/* Official Google Sign-In Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-800 rounded font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span className="font-semibold tracking-wide">
                    {isSigningIn ? 'Conectando ao Google...' : 'Fazer login com o Google'}
                  </span>
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                Utilizamos acesso restrito apenas aos arquivos criados por este aplicativo com a sua permissão. Seus outros arquivos pessoais continuam 100% privados.
              </div>
            </div>
          ) : (
            /* Authenticated state: File management and Drive syncing */
            <div className="space-y-6">
              
              {/* User profile card */}
              <div className="p-4 bg-neutral-900 border border-white/5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'Usuário'} 
                      className="w-10 h-10 rounded-full border border-[#c5a059]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1c1e24] border border-white/10 flex items-center justify-center text-white">
                      <UserIcon className="w-5 h-5 text-[#c5a059]" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {currentUser.displayName || 'Cliente Viking'}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => loadFiles()}
                    disabled={isLoading}
                    className="p-2 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition-colors"
                    title="Atualizar lista"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Atualizar</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-sm bg-neutral-800 hover:bg-red-950/60 hover:text-red-300 text-neutral-400 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                    Arquivos no seu Google Drive ({files.length})
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Comprovantes oficiais emitidos pela Viking Barber
                  </p>
                </div>

                <button
                  onClick={handleCreateSampleRecord}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-gradient-to-r from-[#dfc282] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Criar Ficha de Estilo</span>
                </button>
              </div>

              {/* Files List */}
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {isLoading && files.length === 0 ? (
                  <div className="text-center py-10 text-xs text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#c5a059]" />
                    Carregando arquivos do Google Drive...
                  </div>
                ) : files.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-white/10 rounded-sm">
                    <FileText className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                    <p className="text-xs text-neutral-300 font-medium">Nenhum comprovante salvo ainda</p>
                    <p className="text-[11px] text-neutral-500 mt-1 max-w-xs mx-auto">
                      Ao agendar seu horário pelo site, você poderá salvar o comprovante detalhado diretamente no Google Drive.
                    </p>
                  </div>
                ) : (
                  files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3.5 bg-neutral-900/80 border border-white/5 hover:border-[#c5a059]/30 rounded-sm flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-sm bg-neutral-800 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-[#c5a059]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white truncate max-w-xs sm:max-w-sm">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-neutral-500">
                            {file.createdTime ? new Date(file.createdTime).toLocaleString('pt-BR') : 'Documento sincronizado'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                            title="Abrir no Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => requestDeleteFile(file)}
                          className="p-1.5 rounded bg-neutral-800 hover:bg-red-950/70 hover:text-red-400 text-neutral-400 transition-colors"
                          title="Excluir arquivo do Google Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#17181d] px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>Viking Barber & Google Workspace</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 border border-white/10 text-white hover:border-white/30 rounded-sm"
          >
            Fechar
          </button>
        </div>

      </div>

      {/* Mandatory Destructive Action Confirmation Dialog */}
      {fileToDelete && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-md w-full bg-[#16181d] border border-red-500/40 rounded-sm p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-red-950 border border-red-500/50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white uppercase">
                  Excluir arquivo do Google Drive?
                </h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Tem certeza de que deseja remover permanentemente o arquivo <strong className="text-white">"{fileToDelete.name}"</strong> da sua conta Google? Esta ação não poderá ser desfeita.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="px-4 py-2 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Excluir do Drive</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
