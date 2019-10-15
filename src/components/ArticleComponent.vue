<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            :class="{ 'light-green lighten-3': addMode }"
            class="mx-auto mb-3"
            max-width="350"
            :elevation="hover ? 12 : 2"
        >
            <v-card-title class="purple font-weight-light subtitle-1">
                <div>{{ article.id }}</div>
            </v-card-title>

            <v-card-text>
                <p
                    class="headline text--primary"
                    v-if="!addMode && !editHeadline"
                    @click="onEditDescription"
                >
                    {{ article.description }}
                </p>
                <v-row v-if="editHeadline && isActive">
                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="tempArticle.description"
                            label="Description*"
                            required
                            autofocus
                            @keyup.esc="onCancel"
                            @keyup.enter="onSave"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-btn small class="mx-2" @click="onCancel">Cancel</v-btn>
                        <v-btn small color="primary" class="mx-2" @click="onSave">Save</v-btn>
                    </v-col>
                </v-row>
                <div>
                    <div class="font-weight-bold">{{ article.price }}</div>
                </div>
            </v-card-text>

            <!-- class="justify-end" -->
            <v-card-actions>
                <v-btn v-if="addMode" text color="deep-purple accent-4" @click="$emit('cancel')">
                    Cancel
                </v-btn>
                <!-- router-link mit 'to' würde auch gehen -->
                <v-btn
                    v-if="!addMode"
                    text
                    color="deep-purple accent-4"
                    :to="`/article/${article.id}`"
                >
                    More...
                </v-btn>
                <v-btn
                    v-if="addMode"
                    color="deep-purple accent-4 primary"
                    @click="$emit('save-item')"
                >
                    Save
                </v-btn>
                <v-spacer></v-spacer>
                <v-icon
                    @click="$emit('delete-item', article.id)"
                    class="trash"
                    :class="{ 'on-hover': hover }"
                    >mdi-trash-can
                </v-icon>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
import { Article } from '@/model/Article';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ArticleComponent extends Vue {
    @Prop({ default: '' })
    private article: Article | undefined;

    @Prop({ default: false })
    private addMode!: boolean;

    @Prop({ default: false })
    private isActive!: boolean;

    private editHeadline = false;

    private tempArticle: Article | '' = '';

    @Watch('isActive')
    private onIsActiveChanged(val: boolean, oldVal: boolean): void {
        if (!val) {
            this.editHeadline = false;
        }
    }

    // noinspection JSUnusedLocalSymbols
    private onEditDescription(): void {
        this.tempArticle = Object.assign(this.tempArticle, this.article);
        this.editHeadline = true;

        this.$emit('activate');
    }

    // noinspection JSUnusedLocalSymbols
    private onCancel(): void {
        this.tempArticle = '';
        this.editHeadline = false;
        this.$emit('activate', false);
    }

    // noinspection JSUnusedLocalSymbols
    private onSave(): void {
        this.article = Object.assign(this.article, this.tempArticle);
        this.tempArticle = '';
        this.editHeadline = false;
        this.$emit('activate', false);
    }
}
</script>

<style scoped lang="scss">
.trash {
    visibility: hidden;

    &.on-hover {
        visibility: visible;
    }
}
</style>
