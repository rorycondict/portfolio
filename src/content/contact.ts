// Shared by the contact form and /api/contact so their limits match
export const CONTACT_LIMITS = {
	name: 200,
	email: 254,
	message: 5000,
} as const;
