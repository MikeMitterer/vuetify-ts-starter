<template>
    <v-card :class="{ 'light-green lighten-3': addMode }" class="mx-auto mb-3" max-width="350">
        <v-card-text>
            <div class="font-weight-light">{{ article.id }}</div>
            <p class="display-1 text--primary" v-if="!addMode">
                {{ article.description }}
            </p>
            <v-text-field
                v-model="article.description"
                label="Description*"
                required
                v-if="addMode"
            ></v-text-field>
            <div>
                <div class="font-weight-bold">{{ article.price }}</div>
            </div>
        </v-card-text>
        <!-- class="justify-end" -->
        <v-card-actions>
            <v-btn v-if="addMode" text color="deep-purple accent-4" @click="$emit('cancel')">
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <!-- router-link mit 'to' würde auch gehen -->
            <v-btn v-if="!addMode" text color="deep-purple accent-4" :to="`/article/${article.id}`">
                More...
            </v-btn>
            <v-btn v-if="addMode" color="deep-purple accent-4 primary" @click="$emit('save-item')">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Article } from '@/model/Article';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArticleComponent extends Vue {
    @Prop({ default: '' })
    private article: Article | undefined;

    @Prop({ default: false })
    private addMode!: boolean;
}
</script>

<style scoped lang="scss"></style>
