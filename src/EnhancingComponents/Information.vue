<template>
	<Modal id="information">
		<div class="w-full bg-600 shadow-sm pl-3 p-3 py-2 focus:outline-none rounded text-white text-center">
			<div class="font-bold text-3xl">How To Use:</div>
			<br />
			<div class="text-md">
				<p>Click on the pulsing armor and find the item you would like to enhance!</p>
				<br />
				<p>Once selecting the item choose the tier at which you would like to start off at!</p>
				<br />
				<p>
					You can type in the failstack you would like to use, click the buttons to increase or decrease it
					accordingly, or use the failstack defaults feature.
				</p>
			</div>
			<br />
			<div class="font-bold text-2xl">Failstack Defaults:</div>
			<br />
			<div class="text-md">
				<p>Based on the item selected you will have a different amount of tiers you can set defaults for.</p>
				<br />
				<p>
					Based on the tier you can type in what stack you would like to start enhancing on, as well as when
					you would like to stop using a stack.
				</p>
				<br />
				<p>
					When running simulations and having the failstack defaults feature activated it will smartly use the
					defaults you have selected to know when to start and stop using a failstack.
				</p>
			</div>
			<br />
			<div class="font-bold text-2xl">Failstack Silver Values:</div>
			<br />
			<div class="text-md">
				<p>Here you will find stacks 1-130 where each stack has its represented value in silver.</p>
				<br />
				<p>
					When activating the failstack silver value features whenever you succeed the enhancement, the silver
					spent will now take into account the cost of the stack used as well.
				</p>
				<br />
				<p>
					If you disagree with the default values you can always simply type in your desired silver values per
					stack.
				</p>
			</div>
			<br />
			<div class="font-bold text-2xl">Unused Failstacks:</div>
			<br />
			<div class="text-md">
				<p>
					Here you will find stacks you have built and not used when you opt in to the default failstacks
					feature.
				</p>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from "../GeneralComponents/Modal.vue";

export default {
	name: "Information",

	components: { Modal },
};
</script>
