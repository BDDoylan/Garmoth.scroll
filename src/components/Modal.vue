<template>
	<teleport to="#modals">
		<div @mousedown.stop.prevent="close" class="modal p-12" :id="id">
			<div class="modal-content">
				<div class="rounded relative shadow-lg" @mousedown.stop="">
					<div
						v-if="closeable"
						class="absolute -top-8 -right-1 text-3xl cursor-pointer w-8 h-8 flex justify-center items-center text-100 hover:text-red rounded font-bold transition select-none"
						@click="close"
					>
						<i class="fa fa-times"></i>
					</div>

					<slot />
				</div>
			</div>
		</div>
	</teleport>
</template>
<script>
export default {
	props: {
		id: { required: true },
		closeable: { default: true, type: Boolean },
	},

	mounted() {
		document.addEventListener("keyup", (event) => {
			const key = event.key || event.keyCode;
			if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey)
				if (key === "Escape" || key === "Esc" || key === 27) this.close();
		});
	},

	methods: {
		open() {
			document.getElementById(this.id).style.display = "flex";
		},
		close() {
			if (this.closeable) {
				document.getElementById(this.id).style.display = "none";
			}
		},
	},
};
</script>

<style scoped>
.modal {
	display: none;
	position: fixed;
	z-index: 50;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	min-height: 100vh;
	max-height: 100vh;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.75);
	transition: all ease 1s;
}

.modal .modal-content {
	display: flex;
	/*align-items: center;*/
	justify-content: center;
	position: relative;
	margin: auto;
	border-radius: 0.8rem;
	width: 100%;
	-webkit-animation-name: animatetop;
	-webkit-animation-duration: 0.4s;
	animation-name: animatetop;
	animation-duration: 0.4s;
}

@-webkit-keyframes animatetop {
	from {
		top: -200px;
		opacity: 0;
	}

	to {
		top: 0;
		opacity: 1;
	}
}

@keyframes animatetop {
	from {
		top: -100px;
		opacity: 0;
	}

	to {
		top: 0;
		opacity: 1;
	}
}
</style>
