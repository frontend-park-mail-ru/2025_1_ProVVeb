export function parseBirthday(dateStr: string): { year: number; month: number; day: number } | null {
	try {
		const date = new Date(dateStr);

		if (isNaN(date.getTime())) {
			return null;
		}

		const currentYear = new Date().getFullYear();
		const year = currentYear - date.getUTCFullYear();
		const month = date.getUTCMonth() + 1;
		const day = date.getUTCDate();

		return { year, month, day };
	} catch (error) {
		return null;
	}
}

export function arraysEqual(a1: (string | undefined)[], a2: (string | undefined)[]): boolean {
	if (a1.length !== a2.length) return false;
	for (let i = 0; i < a1.length; i++) {
		if (a1[i] !== a2[i]) return false;
	}
	return true;
}
