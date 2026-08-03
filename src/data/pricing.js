// Pricing data — all placeholders. Replace with real pricing when available.

export const pricing = {
  note: '[All prices to be confirmed. Contact the school for current rates.]',
  
  registrationFee: {
    label: 'Registration Fee',
    amount: '[PRICE]',
    note: '[One-time fee, non-refundable]',
    frequency: 'once',
  },
  
  tuition: [
    {
      program: 'Early Childhood',
      amount: '[PRICE]',
      frequency: 'per year',
      note: '[Includes educational materials]',
    },
    {
      program: 'Primary School',
      amount: '[PRICE]',
      frequency: 'per year',
      note: '[Includes educational materials and technology access]',
    },
    {
      program: 'Middle School',
      amount: '[PRICE]',
      frequency: 'per year',
      note: '[Includes educational materials, technology access, and lab fees]',
    },
  ],
  
  optionalFees: [
    {
      label: 'Cafeteria',
      amount: '[PRICE]',
      frequency: 'per term',
      note: '[Optional — hot lunch service]',
    },
    {
      label: 'School Transportation',
      amount: '[PRICE]',
      frequency: 'per term',
      note: '[Optional — door-to-door service]',
    },
    {
      label: 'After-School Activities',
      amount: '[PRICE]',
      frequency: 'per term',
      note: '[Optional — varies by activity]',
    },
  ],
  
  paymentOptions: [
    '[Annual payment — single installment]',
    '[Termly payment — 3 installments]',
    '[Monthly payment plan available]',
  ],
  
  cta: 'Start Registration',
}
