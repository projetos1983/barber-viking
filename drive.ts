export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  size?: string;
  webViewLink?: string;
}

/**
 * List files created or accessible via drive.file scope
 */
export async function listDriveFiles(accessToken: string): Promise<DriveFileItem[]> {
  const query = encodeURIComponent("trashed = false and name contains 'Viking'");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,createdTime,size,webViewLink)&orderBy=createdTime desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Erro ao listar arquivos do Google Drive');
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Create a client appointment & care guide file in user's Google Drive
 */
export async function createAppointmentFileInDrive(
  accessToken: string,
  appointment: {
    clientName: string;
    clientPhone: string;
    serviceName: string;
    servicePrice: string;
    barberName: string;
    date: string;
    time: string;
  }
): Promise<DriveFileItem> {
  const fileName = `Viking_Barber_Agendamento_${appointment.clientName.replace(/\s+/g, '_')}_${Date.now()}.txt`;
  
  const content = `=====================================================
            VIKING BARBER - ATELIER MASCULINO
              COMPROVANTE & GUIA DE ATENDIMENTO
=====================================================

Prezado(a) ${appointment.clientName},
Seu agendamento na Viking Barber foi registrado com sucesso!

DADOS DO AGENDAMENTO:
-----------------------------------------------------
Serviço: ${appointment.serviceName}
Valor: ${appointment.servicePrice}
Mestre Barbeiro: ${appointment.barberName}
Data Prevista: ${appointment.date}
Horário: ${appointment.time}
Telefone de Contato: ${appointment.clientPhone}

LOCALIZAÇÃO & POLÍTICA:
-----------------------------------------------------
Endereço: Av. dos Vikings, 1080 - Jardins, São Paulo - SP
Estacionamento: Conveniado com manobrista gratuito no local
Telefone da Recepção: (11) 3289-4400 / WhatsApp: (11) 98765-4321
Chegada Recomendada: 10 minutos de antecedência para degustar 
nosso chopp artesanal ou café especial cortesia.

RECOMENDAÇÕES PÓS-CORTE & CUIDADOS VIKING:
-----------------------------------------------------
1. Lave os fios com água fria ou morna para preservar a hidratação natural.
2. Utilize pomada de fixação fosca para manter a textura esculpida.
3. Para a barba, aplique 3 a 4 gotas de óleo botânico para nutrir a raiz e acalmar os folículos.

"Estilo não se corta. Se constrói."
Emitido em: ${new Date().toLocaleString('pt-BR')}
=====================================================`;

  const metadata = {
    name: fileName,
    mimeType: 'text/plain',
    description: 'Comprovante oficial e guia de estilo da Viking Barber',
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    content +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,createdTime,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Falha ao salvar comprovante no Google Drive');
  }

  return await response.json();
}

/**
 * Delete a file in Google Drive
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Falha ao excluir arquivo do Google Drive');
  }
}
