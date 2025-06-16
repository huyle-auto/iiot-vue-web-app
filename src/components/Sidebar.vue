<template>
    <v-navigation-drawer image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" theme="dark" v-if="showSidebar"
        permanent app :rail="rail" class="d-flex flex column v-navigation-drawer" width="256" :rail-width="56"
        :order="0">

        <v-list nav>
            <v-list-item :prepend-avatar="avatar" title="Le Quang Huy"
                subtitle="lequanghuyqn123@gmail.com"></v-list-item>
            
            <!-- Logout -->
            <v-list-item
                @click="logout"
                prepend-icon="mdi-logout"
                :title="$t('menu.logout')"
                value="logout"
                />

            <v-divider thickness="3px" class="ma-2" />
            <v-list-item to="/overview" prepend-icon="mdi-home-outline" :title="$t('menu.overview')"
                value="overview"></v-list-item>
            <v-list-item to="/trend" prepend-icon="mdi-chart-line" :title="$t('menu.trend')"
                value="trend"></v-list-item>
            <v-list-item to="/history" prepend-icon="mdi-calendar-clock-outline" :title="$t('menu.history')"
                value="history"></v-list-item>
            <v-list-item to="/alarm" prepend-icon="mdi-alert-outline" :title="$t('menu.alarm')"
                value="alarm"></v-list-item>
            <v-list-item to="/report" prepend-icon="mdi-file-chart" :title="$t('menu.report')"
                value="report"></v-list-item>

            <v-list-item @click="changeLanguage" :active="false" prepend-icon="mdi-translate"
                :title="$t('menu.language')"></v-list-item>

            <v-spacer></v-spacer>            
        </v-list>

        <!-- Expand/collapse -->
        <div class="d-flex justify-end pa-2">
            <v-btn icon variant="plain" density="default" @click="rail = !rail">
                <v-icon>{{ rail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left' }}</v-icon>
            </v-btn>
        </div>

    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { toast } from 'vuetify-sonner'
import authApi from '@/api/v1/auth.js'
import toastOptions from '@/toast/toastOptions.js'
import avatar from '@/assets/huyle_avatar.png'

const router = useRouter();
const route = useRoute();

// Hide sidebar from Login Page
const showSidebar = computed(() => route.meta?.hideSidebar !== true);

const rail = ref(false);

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
});

const emits = defineEmits(['expand', 'rail', 'close']);

const { locale } = useI18n();
function changeLanguage() {
    locale.value = locale.value === 'en' ? 'vi' : 'en';
}

async function logout() {
    try {
        await authApi.logout();
        toast.info('Logout successful!', toastOptions);
        router.push('/');
    }
    catch (err) {
        toast.error('Log out failed:', err.message);
    }
}

</script>

<style scoped>
.v-navigation-drawer {
    transition: width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
    /* smoother, rounder */
}

.v-list-item--active {
    background-color: rgba(255, 255, 255, 0.25) !important;
    /* Brighter background */
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    color: #fff !important;
}
</style>