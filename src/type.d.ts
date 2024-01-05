interface Toast {
	id: string;
	index: number;

	timeout: number;
	timestamp: Date;

	// common toast attributes
	title?: string;
	message?: string;

	// component as custom toast template
	template?: ConstructorOfATypedSvelteComponent;

	dismiss: () => void;

	[propName: string]: unknown;
}
