import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";

export default () => {
  /** Create useRef to reference to HTML element */
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};
