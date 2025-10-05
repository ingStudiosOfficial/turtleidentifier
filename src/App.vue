<script setup>
	// Vue components
	import { RouterLink, RouterView } from 'vue-router';

	// Material Web components
	import '@material/web/iconbutton/icon-button.js';
	import '@material/web/icon/icon.js';

	function goToPage(pageURL) {
		window.location.href = pageURL;
	}
</script>

<template>
    <aside>
		<div class="sidebar-nav-div">
			<md-icon-button class="sidebar-nav" @click="goToPage('/')">
				<md-icon class="sidebar-nav-icon">
					frame_person
				</md-icon>
			</md-icon-button>
			<p style="margin: 5px 0;">Identifier</p>
		</div>
		<div class="sidebar-nav-div">
			<md-icon-button class="sidebar-nav" @click="goToPage('/flowchart')">
				<md-icon class="sidebar-nav-icon">
					flowchart
				</md-icon>
			</md-icon-button>
			<p style="margin: 5px 0;">Flowchart</p>
		</div>
		<div class="sidebar-nav-div">
			<md-icon-button class="sidebar-nav" @click="goToPage('/about')">
				<md-icon class="sidebar-nav-icon">
					info
				</md-icon>
			</md-icon-button>
			<p style="margin: 5px 0;">About</p>
		</div>
    </aside>
    <main>
		<RouterView />
    </main>
    <footer>
      
    </footer>
</template>

<style scoped>
</style>