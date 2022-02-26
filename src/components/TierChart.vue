<template>
	<ECharts :options="chartOptionBar" style="width: 100%; height: 500px; background-color: #2b2e32;"></ECharts>
</template>

<script>
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
	GridComponent,
	TooltipComponent,
	ToolboxComponent,
	TitleComponent,
	LegendComponent,
} from "echarts/components";

use([
	CanvasRenderer,
	BarChart,
	GridComponent,
	TooltipComponent,
	ToolboxComponent,
	TitleComponent,
	LegendComponent,
]);

export default {
	name: "TierChart",

	components: {
		ECharts,
	},

	data() {
		return {
			chartOptionBar: {
                title: {
                    text: "Success/ Fails Per Tier",
                    left: "center",
                },
				xAxis: {
					type: "category",
					data: ["Base", "+1", "+2", "+3"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						type: "bar",
						data: [1, 2, 3, 4],
					},
				],
                color: ["#127ac2"]
			},
		};
	},
};
</script>
