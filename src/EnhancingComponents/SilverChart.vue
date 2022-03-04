<template>
	<VChart :option="chartOptionBar" autoresize style="width: 100%; height: 500px; background-color: #2b2e32"></VChart>
</template>

<script>
import VChart from "vue-echarts";
import { graphic } from "echarts";

export default {
	name: "SilverChart",

	components: { VChart },

	computed: {
		silverChart: {
			get() {
				return this.$store.state.enhance.silverChart;
			},
			set(value) {
				this.$store.commit("SET_SILVER_CHART", value);
			},
		},

		chartOptionBar() {
			let xAxisData = [],
				seriesDataDurability = [],
				seriesDataMaterial = [],
				seriesDataCrons = [],
				seriesDataFS = [];

			let ranges = [
				{ divider: 1e18, suffix: "E" },
				{ divider: 1e15, suffix: "P" },
				{ divider: 1e12, suffix: "T" },
				{ divider: 1e9, suffix: "B" },
				{ divider: 1e6, suffix: "M" },
				{ divider: 1e3, suffix: "k" },
			];

			this.silverChart.forEach((data) => {
				seriesDataDurability.push(data.silverForDurability);
				seriesDataMaterial.push(data.silverForMaterial);
				seriesDataCrons.push(data.silverForCrons);
				seriesDataFS.push(data.silverForFS);
				xAxisData.push(data.tier);
			});

			return {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
					textStyle: {
						color: "white",
					},
					backgroundColor: "#2b2e32",
					borderColor: "#161719",
				},
				legend: {
					textStyle: {
						color: "white",
					},
					top: 5,
					z: 5,
					margin: "auto",
				},
				grid: {
					left: "7%",
					right: "3%",
					bottom: "7%",
				},
				title: {
					text: "Silver Spent Per Tier",
					left: "center",
					top: 26,
					textStyle: {
						color: "white",
					},
				},
				xAxis: {
					type: "category",
					data: xAxisData,
					axisLine: {
						show: true,
						lineStyle: {
							color: "white",
							width: 1.2,
						},
					},
					axisLabel: {
						margin: 10,
						fontSize: 10,
					},
				},
				yAxis: {
					type: "value",
					axisLine: {
						show: true,
						lineStyle: {
							color: "white",
							width: 1.2,
						},
					},
					axisLabel: {
						margin: 5,
						fontSize: 12,
						formatter: function (params) {
							let label = params;

							for (var i = 0; i < ranges.length; i++) {
								if (label >= ranges[i].divider) {
									return (label / ranges[i].divider).toString() + ranges[i].suffix;
								}
							}
							return label.toString();
						},
					},
				},
				series: [
					{
						name: "Crons",
						type: "bar",
						stack: "total",
						label: {
							show: false,
							color: "#2b2e32",
							fontSize: 15,
						},
						emphasis: {
							focus: "series",
						},
						data: seriesDataCrons,
						color: "#60dae2",
					},
					{
						name: "FS",
						type: "bar",
						stack: "total",
						label: {
							show: false,
							color: "#2b2e32",
							fontSize: 15,
						},
						emphasis: {
							focus: "series",
						},
						data: seriesDataFS,
						color: "#8314D5",
					},
					{
						name: "Material",
						type: "bar",
						stack: "total",
						label: {
							show: false,
							color: "#2b2e32",
							fontSize: 15,
						},
						emphasis: {
							focus: "series",
						},
						data: seriesDataMaterial,
						color: "#48BB78",
					},
					{
						name: "Durability",
						type: "bar",
						stack: "total",
						label: {
							show: false,
							color: "#2b2e32",
							fontSize: 15,
						},
						emphasis: {
							focus: "series",
						},
						data: seriesDataDurability,
						color: "#DDD962",
					},
				],
			};
		},
	},
};
</script>
