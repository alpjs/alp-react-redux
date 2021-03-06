import { Component, type Node } from 'react';

type PropsType = {|
  children: Node,
|};

export default class AlpModule extends Component {
  props: PropsType;

  render(): Node {
    if (!PRODUCTION) {
      // eslint-disable-next-line react/prop-types
      if (this.props.reducers) {
        throw new Error('You have reducers, probably want to use AlpReduxModule.');
      }
    }
    return this.props.children;
  }
}
