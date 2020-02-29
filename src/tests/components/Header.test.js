import React from 'react'
import { shallow } from 'enzyme'
// import ReactShallowRenderer from 'react-test-renderer/shallow'
import Header from '../../components/Header'

test('should render Header correctly', () => {
    const wrapper = shallow(<Header/>)
    expect(wrapper).toMatchSnapshot()

    // expect(wrapper.find('h1').length).toBe(1)
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header/>)
    // expect(renderer.getRenderOutput()).toMatchSnapshot() // will always pass on first run b/c there is not existing snapshot
})

// react-test-renderer
// shallow rendering vs full dom rendering
// shallow - only renders given components
// full dom renders child components as well