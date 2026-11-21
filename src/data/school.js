// Confirmed school information supplied by the school administration.
// Keep operationally unconfirmed fields explicit instead of inventing values.

export const school = {
  name: 'École bilingue Jules & Véronique',
  officialName: 'École Bilingue Jules & Véronique International School',
  shortName: 'Jules & Véronique',
  tagline: 'Français et anglais à parts égales.',
  foundingYear: '2025–2026',
  schoolYear: '2026–2027',

  description:
    'L’École Maternelle et Primaire Bilingue Jules et Véronique accueille les enfants de la maternelle au CM2. Elle propose une éducation bilingue français-anglais fondée sur l’excellence, la discipline et les valeurs, sous le patronage de Saint Augustin.',

  address: 'Ouèdo, en face de la Cité nouvelle, BP 387 Abomey-Calavi, Atlantique, Bénin',
  city: 'Ouèdo',
  // Official letterhead: 6°26'40.9"N 2°16'21.6"E
  geo: { lat: 6.444694, lng: 2.272667 },
  region: 'Atlantique',
  country: 'Bénin',
  countryCode: '+229',

  phone: '+229 01 92 86 37 60',
  whatsapp: '+229 01 56 97 99 24',
  email: 'contactecolejv@gmail.com',

  openingHours: {
    label: '7h00–18h30',
    weekdays: '7h00–18h30',
  },
  classHours: '8h00–16h00, du lundi au vendredi',

  languages: ['Français', 'English'],
  languagesEn: ['French', 'English'],
  languageBalance: '50 % français / 50 % anglais',
  levels: ['Crèche & Garderie', 'Maternelle : Niveaux 1 et 2', 'Primaire : CI au CM2'],
  educationSystems: ['Système béninois', 'Système britannique'],
  diplomas: {
    // End-of-primary exams only: secondary-level ones return when the secondary opens.
    national: ['CEP'],
    international: ['Common Entrance'],
  },

  services: {
    cafeteria: true,
    transport: false,
    security: true,
    computerLab: 'in-progress',
    multisportField: 'in-progress',
  },

  admissions: {
    testRequired: true,
    paymentMethods: ['Paiement à la banque'],
    futurePaymentMethods: ['Mobile money', 'Carte bancaire'],
  },

  // The school reports that official recognition is in progress.
  accreditation: 'Agréments et reconnaissances officielles : en cours',
  accreditationEn: 'Official approvals and recognition: in progress',
  teacherAuthorization:
    'Les enseignants disposent des autorisations d’enseigner délivrées par le ministère en charge des enseignements maternel et primaire.',
  teacherAuthorizationEn:
    'Teachers hold teaching authorisations issued by the ministry responsible for kindergarten and primary education.',
  leadershipAuthorization:
    'Les directions de la maternelle et du primaire disposent des autorisations de diriger délivrées par le ministère des enseignements maternel et primaire.',
  leadershipAuthorizationEn:
    'The kindergarten and primary heads hold leadership authorisations issued by the ministry responsible for kindergarten and primary education.',
  founder: null,

  socialMedia: {
    facebook: '',
    instagram: '',
  },

  // No logo or photography was supplied with the information sheet yet.
  heroImage: null,
  logo: null,

  legalInfo: {
    registrationNumber: null,
    page: '/mentions-legales',
  },
}
