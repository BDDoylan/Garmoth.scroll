<template>
	<div class="bg-600 text-0 rounded text-xl relative py-4 pt-4 xsm:col-span-2 col-span-4 xsm:pt-8 lgx:pt-3">
		<p>
			Attempts: <strong>{{ stats.attempts }}</strong>
		</p>
		<p>
			Success: <strong class="text-green">{{ stats.success }}</strong>
		</p>
		<p>
			Fails: <strong class="text-red">{{ stats.fails }}</strong>
		</p>
		<p>
			Avg. Clicks:
			<strong class="text-orange">{{
				!(stats.attempts / stats.success >= 0) ? 0 : (stats.attempts / stats.success).toFixed(2)
			}}</strong>
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
