<template>
    <v-container fluid class="login-container d-flex align-center justify-center">
        <!-- Login Form -->
        <v-card class="pa-4 elevation-0 login-form" max-width="400" width="100%">
            <v-img :src="logo" contain height="150" class="mb-6 mx-auto" />
            <h2 class="text-h5 font-weight-bold text-center">{{ $t('login.welcome-back') }}</h2>
            <p class="text-subtitle-1 text-center mb-4">{{ $t('login.log-into-your-account') }}</p>

            <!-- Log In form -->
            <form @submit.prevent="login">
                <v-text-field label="Email" type="email" prepend-icon="mdi-email" v-model="email" />

                <v-text-field v-model="password" :type="passwordType" :label="$t('login.password')"
                    prepend-icon="mdi-lock" :append-inner-icon="passwordIcon"
                    @click:append-inner="showPassword = !showPassword" />
                <div class="text-right mb-4">
                    <a href="#" class="text-blue">{{ $t('login.forgot-password') }}</a>
                </div>

                <v-btn type="submit" block color="primary" class="mb-4">{{ $t('login.login') }}</v-btn>
            </form>

            <v-divider class="my-4" />
            <div class="text-center mb-2">{{ $t('login.or-continue-with') }}</div>

            <!-- Alternative login options -->
            <div class="d-flex justify-center ga-2">
                <v-btn icon variant="outlined" color="grey">
                    <v-icon title="Google">mdi-google</v-icon>
                </v-btn>
                <v-btn icon variant="outlined" color="grey">
                    <v-icon title="Facebook">mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon variant="outlined" color="grey">
                    <v-icon title="GitHub">mdi-github</v-icon>
                </v-btn>
            </div>

            <div class="text-center mt-4">
                {{ $t('login.do-not-have-an-account?') }}
                <a href="https://google.com" target="_blank" class="text-blue">{{ $t('login.contact-us') }}</a>
            </div>
        </v-card>
        <v-btn @click="changeLanguage"></v-btn>
    </v-container>
</template>

<script setup>
import logo from '@/assets/HCMUT_official_logo.png';
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { toast } from 'vuetify-sonner';
import { useRouter } from 'vue-router';
const router = useRouter();

import authApi from '@/api/v1/auth.js'

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const passwordType = computed(() => {
    return showPassword.value ? 'text' : 'password';
});

const passwordIcon = computed(() => {
    return showPassword.value ? 'mdi-eye' : 'mdi-eye-off';
});

// Change language
const { locale } = useI18n();
function changeLanguage() {
    locale.value = locale.value === 'en' ? 'vi' : 'en';
}

async function login() {
    if (!email.value || !password.value || email.isEmpty || password.isEmpty) {
        showToast('Please enter both email and password', 'error');
        return;
    }

    try {
        await authApi.login(email, password);
        showToast('Login successful!', 'success');
        router.push('/overview');
    }
    catch (err) {
        showToast('Login failed: ' + err.message, 'error');
    }
}

function showToast(message, type) {
    if (type === 'error') {
        toast.error(message, {
            position: 'top-right',
            duration: 3000,
            icon: 'mdi-alert-circle',
            closeButton: true,
            important: true,
            duration: 2000
        });
    }
    else {
        toast.success(message, {
            position: 'top-right',
            duration: 3000,
            icon: 'mdi-check-circle',
            closeButton: true,
            important: true,
            duration: 2000
        });
    }
}

</script>

<style scoped>
.login-container {
    background-image: url('data:image/jpeg;base64,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');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    overflow: hidden;
    padding: 0;
}

.login-form {
    position: relative;
    z-index: 1;

    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    /* frosted effect */
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    /* subtle shadow */
}
</style>
