<template>
    <v-container class="login fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="4">
                <v-card class="mt-n8">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="username"
                                label="Login"
                                name="login"
                                prepend-icon="person"
                                type="text"
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="lock"
                                type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login" :disabled="loading">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { LoggerFactory } from '@mmit/logging';
import { Component, Vue } from 'vue-property-decorator';
import auth from '../store/modules/AuthModule';

@Component
export default class Login extends Vue {
    private readonly logger = LoggerFactory.getLogger('views.Login');

    private loading: boolean = false;
    private username: string = '';
    private password: string = '';

    public async login(): Promise<void> {
        this.logger.info(`Username: ${this.username}, PW: ${this.password}`);

        this.loading = true;
        const success = await auth.login({ username: this.username, password: this.password });
        this.loading = false;
        if (success) {
            await this.$router.push('home');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
