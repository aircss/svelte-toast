<script lang="ts">
	import '@aircss/air';

	import { toast } from '$lib/toast.svelte';

	import Toast from '$lib/toast.svelte';
	import MyToast from './myToast.svelte';

	function show() {
		toast.send({
			title: 'Air CSS Toast',
			message:
				'Toast notifications are time-bound user interface elements used to convey information. Toasts disappear usually within seconds.'
		});
	}

	function custom() {
		toast.send({
			template: MyToast,
			title: 'Air CSS Toast',
			message:
				'Toast notifications are time-bound user interface elements used to convey information. Toasts disappear usually within seconds.'
		});
	}
</script>

<h1>svelte-toast</h1>

<button on:click={show}>Toast</button>
<button on:click={custom}>Custom toast</button>

<div class="absolute top right w-100 w6-m mt4 mr4">
	<Toast timeout="10000" />
</div>
