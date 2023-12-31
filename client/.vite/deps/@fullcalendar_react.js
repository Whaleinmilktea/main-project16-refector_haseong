import {
  Calendar,
  CustomRenderingStore
} from "./chunk-3W3WKI73.js";
import {
  require_react_dom
} from "./chunk-PRK46SJB.js";
import {
  require_react
} from "./chunk-FLAVOKRJ.js";
import {
  __toESM
} from "./chunk-AC2VUBZ6.js";

// node_modules/@fullcalendar/react/dist/index.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var FullCalendar = class extends import_react.Component {
  constructor() {
    super(...arguments);
    this.elRef = (0, import_react.createRef)();
    this.needsCustomRenderingResize = false;
    this.isInitialRender = true;
    this.state = {
      customRenderingMap: /* @__PURE__ */ new Map()
    };
  }
  render() {
    const portalNodes = [];
    for (const customRendering of this.state.customRenderingMap.values()) {
      const { generatorMeta } = customRendering;
      const vnode = typeof generatorMeta === "function" ? generatorMeta(customRendering.renderProps) : generatorMeta;
      portalNodes.push((0, import_react_dom.createPortal)(vnode, customRendering.containerEl, customRendering.id));
    }
    return import_react.default.createElement("div", { ref: this.elRef }, portalNodes);
  }
  componentDidMount() {
    const customRenderingStore = new CustomRenderingStore();
    this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore);
    this.calendar = new Calendar(this.elRef.current, Object.assign(Object.assign({}, this.props), { handleCustomRendering: this.handleCustomRendering }));
    this.calendar.render();
    customRenderingStore.subscribe((customRenderingMap) => {
      if (this.isInitialRender) {
        this.doCustomRendering(customRenderingMap);
      } else {
        this.requestCustomRendering(customRenderingMap);
      }
    });
  }
  requestCustomRendering(customRenderingMap) {
    this.cancelCustomRendering();
    this.customRenderingRequestId = requestAnimationFrame(() => {
      FullCalendar.act(() => {
        this.doCustomRendering(customRenderingMap);
      });
    });
  }
  doCustomRendering(customRenderingMap) {
    this.needsCustomRenderingResize = true;
    this.setState({ customRenderingMap });
  }
  cancelCustomRendering() {
    if (this.customRenderingRequestId) {
      cancelAnimationFrame(this.customRenderingRequestId);
      this.customRenderingRequestId = void 0;
    }
  }
  componentDidUpdate() {
    this.isInitialRender = false;
    this.calendar.resetOptions(Object.assign(Object.assign({}, this.props), { handleCustomRendering: this.handleCustomRendering }));
    if (this.needsCustomRenderingResize) {
      this.needsCustomRenderingResize = false;
      this.calendar.updateSize();
    }
  }
  componentWillUnmount() {
    this.calendar.destroy();
    this.cancelCustomRendering();
  }
  getApi() {
    return this.calendar;
  }
};
FullCalendar.act = (f) => {
  f();
};
export {
  FullCalendar as default
};
//# sourceMappingURL=@fullcalendar_react.js.map
