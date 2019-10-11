<template>
    <p>{{ article.id }}, {{ article.description }}, {{ article.price }}</p>
</template>

<script lang="ts">
import { Article } from '@/store/modules/CrudModule';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArticleComponent extends Vue {
    @Prop({ default: '' })
    private article: Article | undefined;
}
</script>

<style scoped lang="scss"></style>
