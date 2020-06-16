import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';
configure( {adapter: new Adapter()} );

describe('<Navigation />', () => {
    it('should render two <NavigationItem /> elements if not authentivated', ()=> {
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).tohaveLength(2);
     });    

     it('should render three <NavigationItem /> elements if not authentivated', ()=> {
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).tohaveLength(3);
     });   
});