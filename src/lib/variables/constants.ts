export const UserStatus = {
    PENDING: 'pending',
    ACTIVE: 'active',
    DEACTIVATED: 'deactivated',
} as const;

export const INDUSTRY = [
    'Mining',
    'Health',
    'Government',
    'Professional Services',
    'IT',
    'Software',
    'Finance',
    'Banking',
    'Retail',
    'Logistics',
    'Travel',
    'Recruitment',
    'Corporate Service',
    'Hospitality / Events',
] as const;

export const BUSINESS_ROLE = [
    'Business Owner / Founder',
    'Business Manager',
    'Sales Manager',
    'Procurement Manager',
    'Business Analyst',
    'Consultant',
    'Project Manager',
    'Product Manager',
    'Legal Council',
    'Executive Assistant',
    'Bid Manager',
    'Bid Writer',
    'Marketing Manager',
    'Administrator',
    'Engineer',
    'Technical Specialist',
] as const;

export const ORGANISATION_SCALE = [
    'Small Business (1 - 50 Employees)',
    'Medium Business (50 - 200 Employees)',
    'Large Business (200+ Employees)',
] as const;
