// Academic offer confirmed by the school administration.
// Ages and exact class-age mapping were not supplied, so they remain explicit.

export const programs = [
  {
    id: 'creche-garderie',
    name: 'Crèche & Garderie',
    nameEn: 'Nursery & Daycare',
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
      'A bilingual primary pathway from Grade 1 to Grade 6, drawing on Beninese and British education systems.',
    subjects: ['Toutes les matières en français et en anglais'],
    subjectsEn: ['All subjects in French and English'],
    languages: ['Français', 'English'],
    schedule: 'Lundi–vendredi, 8h00–16h00',
    objectives:
      'Préparer les apprenants aux examens béninois et aux parcours internationaux annoncés par l’école.',
    objectivesEn:
      'Prepare learners for Beninese examinations and the international pathways announced by the school.',
    image: null,
    color: '#0D3B4C',
  },
]

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
