<script lang="ts">
	export let toast: Toast;
</script>

<div class="flex w-100 ba b--noir-30 bg--blue shadow">
	<div class="noflex pa3 br bw3 b--blue bg--white">
		<img class="w2 h2" src="/information-line.svg" alt="info" />
	</div>

	<div class="pa3 white">
		<h1 class="ma0 f-subtitle">{toast.title || 'Notification'}</h1>
		{#if toast.message}
			<p class="lh-body tj clamp overflow-hidden">
				{toast.message}
			</p>
		{/if}
	</div>
</div>
