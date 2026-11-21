// Academic offer confirmed by the school administration.
// Ages and exact class-age mapping were not supplied, so they remain explicit.

export const programs = [
  {
    id: 'creche-garderie',
    name: 'Crèche & Garderie',
    nameEn: 'Crèche & Daycare',
    ages: 'Âges à confirmer',
    grades: ['Crèche', 'Garderie'],
    description:
      'Un accueil adapté aux tout-petits dans un cadre bilingue et bienveillant. Les modalités précises sont communiquées par l’administration.',
    descriptionEn:
      'A caring setting for young children within a bilingual environment. The administration can provide the detailed arrangements.',
    subjects: ['Éveil et activités adaptées à l’âge'],
    subjectsEn: ['Age-appropriate discovery activities'],
    languages: ['Français', 'English'],
    schedule: 'Lundi–vendredi, 8h00–16h00',
    scheduleEn: 'Monday–Friday, 8:00 a.m.–4:00 p.m.',
    objectives: 'Accompagner les premiers apprentissages et l’éveil de l’enfant.',
    objectivesEn: 'Support early learning and each child’s development.',
    image: null,
    color: '#1A6B7F',
  },
  {
    id: 'maternelle',
    name: 'Maternelle',
    nameEn: 'Kindergarten',
    ages: 'Âges à confirmer',
    grades: ['Niveau 1', 'Niveau 2'],
    description:
      'Un enseignement bilingue dès la maternelle pour développer la curiosité, l’autonomie et les premières compétences scolaires.',
    descriptionEn:
      'Bilingual education from kindergarten, supporting curiosity, independence, and early academic skills.',
    subjects: ['Toutes les matières en français et en anglais'],
    subjectsEn: ['All subjects in French and English'],
    languages: ['Français', 'English'],
    schedule: 'Lundi–vendredi, 8h00–16h00',
    scheduleEn: 'Monday–Friday, 8:00 a.m.–4:00 p.m.',
    objectives: 'Poser les bases des apprentissages dans les deux langues.',
    objectivesEn: 'Build strong foundations for learning in both languages.',
    image: null,
    color: '#C8963E',
  },
  {
    id: 'primaire',
    name: 'Primaire',
    nameEn: 'Primary School',
    ages: 'Âges à confirmer',
    grades: ['CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    description:
      'Un parcours primaire bilingue couvrant le CI au CM2, selon les systèmes éducatifs béninois et britannique.',
    descriptionEn:
      'A bilingual primary pathway from Primary 1 to Primary 6 (CI to CM2), drawing on Beninese and British education systems.',
    subjects: ['Toutes les matières en français et en anglais'],
    subjectsEn: ['All subjects in French and English'],
    languages: ['Français', 'English'],
    schedule: 'Lundi–vendredi, 8h00–16h00',
    scheduleEn: 'Monday–Friday, 8:00 a.m.–4:00 p.m.',
    objectives:
      'Préparer les apprenants au CEP béninois et au Common Entrance britannique.',
    objectivesEn:
      'Prepare learners for the Beninese CEP and the British Common Entrance.',
    image: null,
    color: '#0D3B4C',
  },
]

/* One class vocabulary everywhere. The French codes (CI…CM2) are the school's
   own and stay the stored value (form, WhatsApp); English pages show the usage
   of anglophone West Africa (KG, Primary 1–6) — never the American « Grade ». */
const GRADE_EN = {
  'Crèche': 'Crèche',
  Garderie: 'Daycare',
  'Niveau 1': 'KG 1',
  'Niveau 2': 'KG 2',
  CI: 'Primary 1 (CI)',
  CP: 'Primary 2 (CP)',
  CE1: 'Primary 3 (CE1)',
  CE2: 'Primary 4 (CE2)',
  CM1: 'Primary 5 (CM1)',
  CM2: 'Primary 6 (CM2)',
}

export function getGradeLabel(grade, language = 'fr') {
  return language === 'en' ? GRADE_EN[grade] || grade : grade
}

export function getProgramSchedule(program, language = 'fr') {
  return language === 'en' ? program.scheduleEn : program.schedule
}

export function getProgramName(program, language = 'fr') {
  return language === 'en' ? program.nameEn : program.name
}

export function getProgramDescription(program, language = 'fr') {
  return language === 'en' ? program.descriptionEn : program.description
}

export function getProgramObjectives(program, language = 'fr') {
  return language === 'en' ? program.objectivesEn : program.objectives
}

export function getProgramSubjects(program, language = 'fr') {
  return language === 'en' ? program.subjectsEn : program.subjects
}
