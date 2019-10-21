import HelloWorld from '@/components/HelloWorld.vue';
import { mount, Wrapper } from '@vue/test-utils';
// import Vue from 'vue';
// import { VueConstructor } from 'vue/types/vue';
// import Vuetify from 'vuetify';

// Vue.config.productionTip = false;
// Vue.use(Vuetify);

describe('HelloWorld.vue', () => {
    // let localVue: VueConstructor<HelloWorld>;
    // let vuetify: IVuetify;

    const msg = 'new message';
    let wrapper: Wrapper<HelloWorld>;

    beforeEach(() => {
        wrapper = mount(HelloWorld, {
            // localVue,
            // vuetify,
            propsData: { msg },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    test('renders props.msg when passed', () => {
        expect(wrapper.text()).toMatch(msg);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('Button click', () => {
        expect(wrapper.text()).toMatch(msg);

        // HTML-Out
        // console.log(wrapper.html());

        const foundToggleBtn = wrapper.findAll('.v-btn.alert');
        expect(foundToggleBtn.exists()).toBeTrue();
        expect(foundToggleBtn.length).toBe(1);

        // v-col rendert mit 'col'!
        const foundColVuetify = wrapper.findAll('.col:nth-child(2)');
        expect(foundColVuetify.exists()).toBeTrue();
        expect(foundColVuetify.length).toBe(1);

        // Alert-Box ist by default visible
        const foundAlert = wrapper.find('.v-alert');
        expect(foundAlert.exists()).toBeTrue();
        expect(foundAlert.isVisible()).toBeTrue();

        expect(foundToggleBtn).not.toBeNull();

        // Data-Property steht per default auf TRUE
        expect(wrapper.vm.$data.alert).toBeTrue();
        foundToggleBtn.trigger('click');
        expect(foundAlert.isVisible()).toBeFalse();

        // Durch den click hat sich "alert" auf FALSE gedreht
        expect(wrapper.vm.$data.alert).toBeFalse();
    });
});
