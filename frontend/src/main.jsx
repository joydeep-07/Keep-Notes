import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import "./index.css";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Root = () => {
  useEffect(() => {
    // 1️⃣ Init Lenis
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    window.__lenisInstance = lenis;

    // 2️⃣ Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3️⃣ GSAP ticker → Lenis RAF
    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // 4️⃣ Cleanup
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenisInstance = null;
    };
  }, []);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
