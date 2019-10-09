<template>
    <v-container fluid d-flex class="pr-0">
        <!--<router-link to="/">Home</router-link>-->
        <!--<router-link to="/about">About</router-link>-->
        <v-toolbar-items>
            <v-btn text to="/" :ripple="false">Home</v-btn>
            <v-btn text to="/about" :ripple="false">About</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn icon to="/login" v-if="!isAuthenticated">
                <v-icon>mdi-login</v-icon>
            </v-btn>
            <v-btn icon v-if="isAuthenticated" @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-badge style="margin-top: 14px" class="mr-2">
                <template v-slot:badge
                    >0
                </template>
                <v-icon>mdi-email</v-icon>
            </v-badge>
        </v-toolbar-items>

        <v-menu left bottom class="ml-3">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import lambi from '../assets/images/lambi.png';
import auth from '../store/modules/AuthModule';
import counter from '../store/modules/CounterModule';

@Component
export default class AppHeader extends Vue {
    @Prop() private msg!: string;

    get img(): string {
        return lambi;
    }

    public get counter(): number {
        return Math.min(500, Math.max(110, counter.count));
    }

    public get isAuthenticated(): boolean {
        return auth.isAuthenticated;
    }

    public async logout(): Promise<void> {
        await auth.logout();
        await this.$router.push('login');
    }
}
</script>

<style scoped lang="scss">
.v-btn--active.v-btn {
    color: red;
}

.v-btn:before {
    background-color: transparent;
}
</style>
