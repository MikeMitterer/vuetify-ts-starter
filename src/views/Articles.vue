<template>
    <v-container class="about stretch" justify="start">
        <v-btn fixed dark fab bottom right color="pink" class="mb-10" @click="addItem">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <h1 class="display-2">Articles</h1>
        <ArticleComponent
            v-if="isInAddMode"
            :article="item"
            :addMode="isInAddMode"
            @save-item="onSaveItem"
            @cancel="onCancel"
        ></ArticleComponent>
        <div class="d-flex flex-wrap justify-space-around">
            <ArticleComponent
                class="ml-2"
                :article="article"
                v-for="article in articles"
                :key="article.id"
            ></ArticleComponent>
        </div>
    </v-container>
</template>
<script lang="ts">
import ArticleComponent from '@/components/ArticleComponent.vue';
import { Article } from '@/model/Article';
import { LoggerFactory } from '@mmit/logging';
import uuid from 'uuid';
import { Component, Vue } from 'vue-property-decorator';
import crudModule from '../store/modules/CrudModule';

@Component({ components: { ArticleComponent } })
export default class Articles extends Vue {
    private readonly logger = LoggerFactory.getLogger('views.Articles');

    public get articles(): readonly Article[] {
        return crudModule.articles;
    }

    private changes = 0;

    // Reaktives property darf NICHT undefined sein und darf nicht mit einem _ beginnen
    private item: Article | '' | undefined = '';

    protected get isInAddMode(): boolean {
        return typeof this.item === 'object';
    }

    public addItem(): void {
        this.item = { id: uuid.v4(), description: `Change me ${this.changes}`, price: 0 };
        this.changes++;
        // this.$forceUpdate();
    }

    // noinspection JSUnusedLocalSymbols
    private onSaveItem(): void {
        if (this.item) {
            crudModule.add({ ...this.item });
        }
        this.item = undefined;
    }

    // noinspection JSUnusedLocalSymbols
    private onCancel(): void {
        this.item = undefined;
    }
}
</script>
<style lang="scss"></style>
