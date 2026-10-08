export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  tag?: string;
  iconName: 'scissors' | 'flame' | 'sparkles' | 'shield' | 'baby' | 'eye';
}

export interface BarberMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cortes' | 'barba' | 'ambiente' | 'detalhes';
  imageUrl: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'corte-masculino',
    name: 'Corte Masculino Tradicional',
    description: 'Consultoria de visagismo, corte com tesoura e máquina de alta precisão, lavagem com shampoo premium e finalização refinada.',
    duration: '45 min',
    price: 'R$ 85',
    iconName: 'scissors',
    tag: 'Mais Popular'
  },
  {
    id: 'corte-barba',
    name: 'Combo Viking (Corte + Barba)',
    description: 'O ritual completo: corte personalizado, toalha quente aromatizada, alinhamento de barba na navalha e hidratação com bálsamo especial.',
    duration: '1h 20 min',
    price: 'R$ 150',
    iconName: 'shield',
    tag: 'Experiência Completa'
  },
  {
    id: 'barba-terapia',
    name: 'Barboterapia & Navalha',
    description: 'Protocolo clássico com toalha quente enriquecida com eucalipto, espuma cremosa, navalhete descartável e massagem facial relaxante.',
    duration: '40 min',
    price: 'R$ 75',
    iconName: 'flame'
  },
  {
    id: 'degrade-fade',
    name: 'Degradê Navalhado (Fade)',
    description: 'Transição milimétrica impecável do zero ao topo com acabamento navalhado nas linhas de contorno e texturização moderna.',
    duration: '50 min',
    price: 'R$ 90',
    iconName: 'sparkles'
  },
  {
    id: 'corte-infantil',
    name: 'Corte Infantil Viking Jr.',
    description: 'Atendimento paciente e cuidadoso para os pequenos guerreiros (até 12 anos), com ambiente amigável e acabamento impecável.',
    duration: '35 min',
    price: 'R$ 70',
    iconName: 'baby'
  },
  {
    id: 'sobrancelha-navalha',
    name: 'Design de Sobrancelha',
    description: 'Alinhamento natural respeitando a anatomia masculina facial, retirando excessos com navalhete ou pinça sem perder a firmeza da expressão.',
    duration: '20 min',
    price: 'R$ 35',
    iconName: 'eye'
  }
];

export const BARBERS: BarberMember[] = [
  {
    id: 'ragnar',
    name: 'Ragnar Vasconcelos',
    role: 'Master Barber & Fundador',
    experience: '14 anos de ofício',
    specialty: 'Cortes clássicos com tesoura e visagismo',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'bjorn',
    name: 'Björn Martins',
    role: 'Especialista em Barbas',
    experience: '9 anos de ofício',
    specialty: 'Barboterapia clássica e toalha quente',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'erik',
    name: 'Erik Alencar',
    role: 'Mestre do Fade & Freestyle',
    experience: '7 anos de ofício',
    specialty: 'Degradês de precisão e transições modernas',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80'
  }
];

export const EXPERIENCES = [
  {
    title: 'Hospitalidade & Bar Exclusivo',
    description: 'Deguste cafés especiais, chopes artesanais gelados ou doses selecionadas de whisky single malt enquanto aguarda com tranquilidade.',
    icon: 'glass'
  },
  {
    title: 'Ritual Clássico da Toalha Quente',
    description: 'Óleos essenciais terapêuticos e vaporização que abrem os poros, relaxam a pele e preparam a lâmina para deslizar sem irritações.',
    icon: 'flame'
  },
  {
    title: 'Poltronas de Couro Legítimo',
    description: 'Estofados ergonômicos inspirados na era de ouro das barbearias dos anos 1920 para o máximo conforto e relaxamento absoluto.',
    icon: 'chair'
  },
  {
    title: 'Visagismo Masculino sob Medida',
    description: 'Análise detalhada do formato de crânio, linhas de mandíbula e estilo de vida para esculpir o visual que valoriza sua presença.',
    icon: 'compass'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Textura & Pompadour Clássico',
    category: 'cortes',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    description: 'Acabamento fosco natural com alinhamento preciso na tesoura.'
  },
  {
    id: '2',
    title: 'Barba Esculpida & Alinhamento',
    category: 'barba',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    description: 'Contorno desenhado na lâmina livre com hidratação profunda de óleos nobres.'
  },
  {
    id: '3',
    title: 'Ambiente Lounge & Bar',
    category: 'ambiente',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    description: 'Madeira maciça nobre, iluminação cênica e atmosfera intimista.'
  },
  {
    id: '4',
    title: 'Degradê Navalhado Skin Fade',
    category: 'cortes',
    imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80',
    description: 'Transição suave milimétrica com topo texturizado em camadas.'
  },
  {
    id: '5',
    title: 'Instrumentos em Aço Alemão',
    category: 'detalhes',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    description: 'Tesouras forjadas a mão e navalhetes higienizados em autoclave hospitalar.'
  },
  {
    id: '6',
    title: 'Ritual da Toalha Quente',
    category: 'barba',
    imageUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80',
    description: 'Aromaterapia de eucalipto para suavizar pelos e acalmar a pele.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Mendes',
    role: 'Empresário & Cliente há 3 anos',
    comment: 'A Viking Barber não é apenas um lugar para cortar o cabelo, é meu momento de descompressão semanal. O atendimento é pontual, o ambiente tem personalidade e a navalha nunca falha.',
    rating: 5,
    date: 'Ontem',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Dr. Rodrigo Silveira',
    role: 'Médico Cirurgião',
    comment: 'A precisão do fade e o cuidado com a higiene são impecáveis. A toalha quente é outro patamar de relaxamento. Recomendo de olhos fechados para qualquer homem exigente.',
    rating: 5,
    date: 'Há 3 dias',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Guilherme Fontes',
    role: 'Arquiteto',
    comment: 'Design do espaço impecável, atendimento de primeiro mundo e profissionais que realmente entendem de proporção e harmonia facial. O combo com cerveja artesanal fecha com chave de ouro.',
    rating: 5,
    date: 'Semana passada',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'É necessário agendar horário com antecedência?',
    answer: 'Recomendamos fortemente o agendamento prévio para garantir seu atendimento sem esperas indesejadas e com o barbeiro de sua preferência. No entanto, também atendemos por ordem de chegada havendo encaixes disponíveis na grade do dia.'
  },
  {
    id: 'faq-2',
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'Aceitamos todas as principais bandeiras de cartões de crédito e débito (Visa, Mastercard, Elo, Amex), Pix com confirmação imediata e pagamento em espécie. Também disponibilizamos pacotes mensais corporativos e assinaturas VIP.'
  },
  {
    id: 'faq-3',
    question: 'Quanto tempo dura cada atendimento?',
    answer: 'O corte tradicional leva em média 40 a 45 minutos. O combo completo (corte + barboterapia com toalha quente) leva aproximadamente 1 hora e 20 minutos, respeitando cada etapa com calma e precisão cirúrgica.'
  },
  {
    id: 'faq-4',
    question: 'Vocês realizam serviços especiais para noivos ou grupos?',
    answer: 'Sim! Temos a experiência "Dia do Guerreiro / Dia do Noivo", onde fechamos o lounge com charutaria, chopp artesanal liberado, cortes para padrinhos e cuidados completos com fotos exclusivas.'
  },
  {
    id: 'faq-5',
    question: 'Quais marcas e produtos são utilizados nos cabelos e barbas?',
    answer: 'Utilizamos pomadas, óleos e balms de formulações premium com cera de abelha, manteiga de karité e ativos botânicos de marcas conceituadas mundialmente, sem petrolatos pesados nem parabenos.'
  }
];

export const BARBERSHOP_INFO = {
  name: 'Viking Barber',
  slogan: 'Estilo não se corta. Se constrói.',
  address: 'Av. dos Vikings, 1080 - Jardins, São Paulo - SP',
  phone: '(11) 3289-4400',
  whatsappNumber: '5511987654321',
  whatsappDisplay: '(11) 98765-4321',
  instagram: '@vikingbarber.oficial',
  hoursWeekday: 'Terça a Sexta: 09:00 às 20:00',
  hoursSaturday: 'Sábado: 08:30 às 19:00',
  hoursSunday: 'Domingo e Segunda: Fechado para recarga das lâminas',
  email: 'contato@vikingbarber.com.br'
};
