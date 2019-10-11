<template>
    <v-container class="about stretch" justify="start">
        <h1 class="display-2">Articles</h1>
        <ArticleComponent
            :article="article"
            v-for="article in articles"
            :key="article.id"
        ></ArticleComponent>
    </v-container>
</template>
<script lang="ts">
import ArticleComponent from '@/components/ArticleComponent.vue';
import { Component, Vue } from 'vue-property-decorator';
import crudModules, { Article } from '../store/modules/CrudModule';

@Component({ components: { ArticleComponent } })
export default class Articles extends Vue {
    public get articles(): readonly Article[] {
        return crudModules.articles;
    }
}
</script>
<style lang="scss"></style>
