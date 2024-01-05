# svelte-toast

`svelte-toast` provides all the necessary stuff to create toast notifications.

A toast is a simple feedback message. It only fills the required amount of
space and the current activity remains visible and interactive. Toasts
automatically disappear after a timeout.

## The Toast component

The `Toast` component is a container holding all the active toasts
notifications. It comes with a default styling and a default toast template
making it usable out-of-the-box.

```svelte
<script lang="ts">
	import Toast from '@aircss/svelte-toast';
</script>

<div class="absolute top right w-100 w6-m ma4">
	<Toast />
</div>
```

### Props

- **class**: set custom classes for the toast container element (optional, default: `"flex column"`)
- **timeout**: default timeout of a toast in _ms_ (optional, default: `5000`)

### Slot

It is possible to override the default template of a toast by declaring a new
template as a child of the `Toast` element. The values of each toast are
exposed through the `toast` property:

```svelte
<script lang="ts">
	import Toast from '@aircss/svelte-toast';
</script>

<div class="absolute top right w-100 w6-m ma4">
	<Toast let:toast>
		<div class="w-100 w6-m pa3 bt4 ba bg--white">
			<h1 class="ma0 f-subtitle">{toast.title}</h1>
			<p class="lh-body tj overflow-hidden">
				{toast.message}
			</p>
		</div>
	</Toast>
</div>
```

## The toast API

Creating a new toast only requires to call the `send()` method of the
`toast` API:

```svelte
<script lang="ts">
	import { toast } from '@aircss/svelte-toast';
	import Toast from '@aircss/svelte-toast';

	function show() {
		toast.send({
			title: 'Hello world!',
			message: 'This is a simple Svelte X Air CSS toast notification.'
		});
	}
</script>

<div class="absolute top right w-100 w6-m ma4">
	<Toast />
</div>

<button on:click={show}>Show toast</button>
```

The `send()` message expect an object as param complying to the `Toast`
interface. The minimal toast bears a little to no data. However, developers
should add as much of properties as pleased. _Reserved_ properties are as
follow:

- **id**: unique identifier of the toast notification _(automatically generated)_
- **index**: rank index of each toast starting with `0` for the least recent one _(automatically generated)_
- **timestamp**: creation time of the toast _(automatically generated)_
- **dismiss**: function to dismiss the toast _(automatically generated)_

- **timeout**: timeout of the toast in _ms_ _(optional, default: global timeout)_

- **title**: title of the toast _(optional)_
- **message**: message of the toast _(optional)_
- **template**: use a Svelte component as a template for the toast _(optional)_

## Svelte components as toast templates

As mentionned in the previous paragraph, the `send()` method accepts svelte
components as templates for toasts. The component only requires a mandatory
`toast` prop compliant with the `Toast` interface to work:

```svelte
<script lang="ts">
	export let toast: Toast;
</script>

<div class="w-100 w6-m pa3 bt4 ba bg--white">
	<h1 class="ma0 f-subtitle">{toast.title}</h1>
	<p class="lh-body tj overflow-hidden">
		{toast.message}
	</p>
</div>
```

The following example shows how to use this component as a toast template:

```svelte
<script lang="ts">
	import { toast } from '@aircss/svelte-toast';
	import Toast from '@aircss/svelte-toast';

	import MyTemplate from './my-component.svelte';

	function show() {
		toast.send({
			title: 'Hello world!',
			message: 'This is a simple Svelte X Air CSS toast notification.',
			template: MyTemplate
		});
	}
</script>

<div class="absolute top right w-100 w6-m ma4">
	<Toast />
</div>

<button on:click={show}>Show toast</button>
```
