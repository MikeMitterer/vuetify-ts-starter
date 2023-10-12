import { shallowMount, Wrapper } from '@vue/test-utils'
import 'jest-extended'
import HelloWorld from '../../src/components/HelloWorld.vue'
import { localVue, store } from './_mocks/store'
// import Vue from 'vue';
// import { VueConstructor } from 'vue/types/vue';
// import Vuetify from 'vuetify';

// Vue.config.productionTip = false;
// Vue.use(Vuetify);

describe('HelloWorld.vue', (): void => {
    let wrapper: Wrapper<HelloWorld> | undefined

    afterEach((): void => {
        if (wrapper) {
            wrapper.destroy()
            wrapper = undefined
        }
    })

    test('renders props.msg when passed II', (): void => {
        const msg = 'new message'

        // shallowMount rendert keine Child-Komponenten
        wrapper = shallowMount(HelloWorld, {
            localVue,
            store,
            // vuetify,
            propsData: { msg }
        })

        expect(wrapper.text()).toMatch(msg)
        // expect(wrapper.isVueInstance()).toBeTruthy();
    })

    test('simulate v-btn', (): void => {
        const msg = 'new message'

        // shallowMount rendert keine Child-Komponenten
        wrapper = shallowMount(HelloWorld, {
            localVue,
            store,
            stubs: {
                'v-alert': {
                    template: '<div class="v-alert">ALTER-Text</div>'
                }
            },
            propsData: { msg }
        })

        expect(wrapper.text()).toMatch(msg)
        // expect(wrapper.isVueInstance()).toBeTruthy();

        expect(wrapper.find('.v-alert').exists()).toBeTrue()
    })
})
