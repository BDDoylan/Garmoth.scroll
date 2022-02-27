<template>
	<VChart :option="chartOptionBar" style="width: 100%; height: 500px; background-color: #2b2e32"></VChart>
</template>

<script>
import VChart from "vue-echarts";

export default {
	name: "TierChart",

	components: { VChart },

	// computed: {
	// 	chartOptionBar() {
	// 		let xAxisData = [],
	// 			seriesData = [];

	// 		this.$store.state.enh.silverChartData.forEach((data) => {
	// 			seriesData.push(data.silver);
	// 			aXisData.push(data.enhanceName);
	// 		});

	// 		return {
	// 			title: {
	// 				text: "Success/ Fails Per Tier",
	// 				left: "center",
	// 			},
	// 			xAxis: {
	// 				type: "category",
	// 				data: xAxisData,
	// 			},
	// 			yAxis: {
	// 				type: "value",
	// 			},
	// 			series: [
	// 				{
	// 					type: "bar",
	// 					data: seriesData,
	// 				},
	// 			],
	// 			color: ["#127ac2"],
	// 		};
	// 	},
	// },
};
</script>
