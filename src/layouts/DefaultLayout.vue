<template>
    <v-app>
        <!-- Navigation drawer -->
        <Sidebar :visible="showSidebar" app v-if="routeReady"></Sidebar>

        <!-- Application bar -->
        <!-- <v-app-bar title="Application bar"></v-app-bar> -->

        <!-- Toast -->
        <VSonner position="top-right" expand :visible-toasts="5"/>

        <!-- Main content -->
        <v-main app>
            <v-container fluid class="pa-0 ma-0">
                <router-view  />
            </v-container> 
        </v-main>

        <!-- <v-footer  fluid style="background-color: transparent">
            <v-container class="footer" fluid>{{ $t('menu.copyright') }}</v-container>
        </v-footer> -->
    </v-app>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue"
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const showSidebar = computed(() => {
    return !route.meta.hideSideBar;
});

const routeReady = ref(false);

watchEffect(() => {
    requestAnimationFrame(() => {
        routeReady.value = true;
    })
})

</script>

<style scoped>
.footer {
    color: black;
    text-align: center;
}
</style>