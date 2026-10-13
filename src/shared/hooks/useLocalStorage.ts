import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const getInitialValue = () =>
		typeof initialValue === "function"
			? (initialValue as () => T)()
			: initialValue;

	const [value, setValue] = useState<T>(() => {
		try {
			const jsonValue = localStorage.getItem(key);

			if (jsonValue === null) return getInitialValue();

			return JSON.parse(jsonValue) as T;
		} catch {
			return getInitialValue();
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {
			// Keep the app usable when storage is unavailable or its quota is full.
		}
	}, [value, key]);

	return [value, setValue] as const;
}
