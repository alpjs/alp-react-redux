// import AppContainer from '../layout/AppContainer';
import AlpModule from './AlpModule';

export default (() => {
  let reducers;

  return {
    visitor: (element, instance) => {
      // console.log(element, instance, instance instanceof AlpModule, element.type === AppContainer);

      if (instance && instance instanceof AlpModule) {
        reducers = instance.props.reducers;
        return false;
      }

      return true;
    },

    getReducers: () => reducers
  };
});
//# sourceMappingURL=createModuleVisitor.js.map