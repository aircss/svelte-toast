<script context="module" lang="ts">
	import { writable, derived } from 'svelte/store';

	function toast_id() {
		return '_' + Math.random().toString(36).substring(2, 9);
	}

	function createStore() {
		const toasts = writable<Toast[]>([]);

		const store = derived<typeof toasts, Toast[]>(toasts, (values, set) => {
			set(values);
			if (values.length > 0) {
				const timer = setTimeout(() => {
					toasts.update((state) => {
						state.shift();
						return [...state.map((toast, index) => ({ ...toast, index }))];
					});
				}, values[0].timeout);

				return () => {
					clearTimeout(timer);
				};
			}
		});

		const { subscribe } = store;

		function dismiss(id: string) {
			toasts.update((state) => {
				let index = state.findIndex((element) => element.id === id);

				state.splice(index, 1);
				return [...state.map((toast, index) => ({ ...toast, index }))];
			});
		}

		function send({ timeout = 0 }: { [propName: string]: unknown } = {}) {
			toasts.update((state) => {
				const id = toast_id();
				const index = state.length;
				const timestamp = new Date();

				timeout = timeout || reference_timeout;

				return [
					...state,
					{ id, index, timestamp, timeout, ...arguments[0], dismiss: () => dismiss(id) }
				];
			});
		}

		return {
			subscribe,
			send
		};
	}

	export const toast = createStore();
	export let reference_timeout: number | string | undefined;
</script>

<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let _class = 'flex column';

	export let timeout: number | string = 5000;
	export { _class as class };

	$: reference_timeout = Number(timeout);
</script>

<!--
@component
Display toast notifications to the user.

Toasts are lightweight notifications and easily customizable alert message.
They’re built with flexbox, so they’re easy to align and position.

Props:

- **class**: set custom classes for the toast container element (optional, default: ``"flex column"``)
- **timeout**: default timeout of a toast in *ms* (optional, default: ``5000``)

It is possible to override the default template of a toast by declaring a new
template as a child of the ``Toast`` element. The values of each toast are
exposed through the ``toast`` property:

	```html
	<Toast let:toast>
		<div id={toast.id}>
			<h1>{toast.title}</h1>
			<p>{toast.message}</p>
		</div>
	</Toast>
	```
-->

<div class={_class}>
	{#each $toast as toast (toast.id)}
		<div animate:flip transition:fade>
			{#if toast.template}
				<svelte:component this={toast.template} {toast} />
			{:else}
				<slot {toast}>
					<div
						class="mb4 w-100 ba br2 b--noir-30 bg--white overflow-hidden shadow o-100-hvr"
						class:o-75={toast.index == 1}
						class:o-50={toast.index == 2}
						class:o-25={toast.index == 3}
						class:dn={toast.index > 3}
					>
						<div class="flex pa3 bg--noir-10 bb b--noir-30">
							<div class="center dib h1 w1 br2 bg--blue"></div>
							<div class="center grow ph3 ttt b">{toast.title}</div>
							<div class="center ph3 f8 noir-50">{toast.timestamp.toLocaleString()}</div>
							<button
								class="center h1 w1 bn bg--transparent pointer close"
								on:click={toast.dismiss}
							/>
						</div>
						<div class="ph3">
							<p class="lh-body tj clamp overflow-hidden">
								{toast.message}
							</p>
						</div>
					</div>
				</slot>
			{/if}
		</div>
	{/each}
</div>

<style>
	.close {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z'%3E%3C/path%3E%3C/svg%3E");
	}

	.clamp {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>
