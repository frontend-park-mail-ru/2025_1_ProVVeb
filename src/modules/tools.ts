export function parseBirthday(dateStr: string): { year: number; month: number; day: number } | null {
	try {
		const date = new Date(dateStr);

		if (isNaN(date.getTime())) {
			return null;
		}

		const year = date.getUTCFullYear();
		const month = date.getUTCMonth() + 1;
		const day = date.getUTCDate();

		return { year, month, day };
	} catch (error) {
		return null;
	}
}
