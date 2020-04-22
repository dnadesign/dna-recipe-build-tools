import 'mobx-react/batchingForReactDom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure as MobxConfigure } from 'mobx';
import React from 'react';

MobxConfigure({ enforceActions: 'observed' });
Enzyme.configure({ adapter: new Adapter() });

global.React = React;
