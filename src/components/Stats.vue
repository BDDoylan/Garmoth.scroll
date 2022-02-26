<template>
	<div class="bg-600 text-0 rounded text-xl relative py-4 pt-3 xsm:col-span-2 col-span-4 xsm:pt-11 lgx:pt-5">
		<p>
			Total Attempts: <strong>{{ stats.attempts }}</strong>
		</p>
		<p>
			Total Success: <strong class="text-green">{{ stats.success }}</strong>
		</p>
		<p>
			Total Fails: <strong class="text-red">{{ stats.fails }}</strong>
		</p>
		<p class="mt-2">
			Highest Success Streak: <strong>{{ stats.highestSuccessStreak }}</strong>
		</p>
		<p>
			Highest Fail Streak:
			<strong class="text-green">{{ stats.highestFailStreak }}</strong>
		</p>
		<p>
			Current Success Streak:
			<strong class="text-red">{{ stats.currentSuccessStreak }}</strong>
		</p>
		<p>
			Current Fail Streak:
			<strong class="text-orange">{{ stats.currentFailStreak }}</strong>
		</p>
	</div>
</template>

<script>
export default {
	name: "Stats",

	props: {
		stats: {
			type: Object,
		},
	},
};
</script>
