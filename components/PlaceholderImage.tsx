/* eslint-disable jsx-a11y/alt-text */

import { forwardRef } from "react";

/* eslint-disable @next/next/no-img-element */
interface Props {
  w: number;
  h: number;
}

const PlaceholderImage = forwardRef(
  (
    { w, h, ...rest }: Props & React.ImgHTMLAttributes<HTMLImageElement>,
    ref: React.Ref<HTMLImageElement>
  ) => {
    return (
      <img ref={ref} src={`https://placehold.jp/${w}x${h}.png`} {...rest} />
    );
  }
);

PlaceholderImage.displayName = "PlaceholderImage";

export default PlaceholderImage;
