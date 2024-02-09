declare module "*.svg" {
  import React from "react";
  export const ReactComponent: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}
