import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';


import Footer from '../../components/Footer';

describe('<Footer />', () => {

    it('It should contain a <Footer /> component', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('div')).to.have.length(2);
        expect(wrapper.find('nav')).to.have.length(1);
        expect(wrapper.find('ul')).to.have.length(2);
        expect(wrapper.find('a')).to.have.length(1);
    });

});
