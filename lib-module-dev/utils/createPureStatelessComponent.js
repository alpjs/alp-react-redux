import { connect } from 'react-redux';

// mergeProps: remove dispatch from dispatchProps (and perf !)
var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  return ownProps;
};

export default (function createPureStatelessComponent(Component) {
  return connect(null, null, mergeProps)(Component);
});
//# sourceMappingURL=createPureStatelessComponent.js.map