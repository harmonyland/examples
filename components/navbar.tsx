import { h, tw } from "../deps.ts";

const NavBar = (
  props: {
    size?: "small" | "large";
    theme?: "light" | "dark";
  },
) => {
  const { size = "large", theme = "light" } = props;
  let bgColor, textColor, padding, imageSize, textSize;
  if (theme === "light") {
    bgColor = "bg-white";
    textColor = "text-black";
  } else {
    bgColor = "bg-black";
    textColor = "text-white";
  }
  if (size === "small") {
    padding = "p-5";
    imageSize = "h-16";
    textSize = "text-4xl";
  } else {
    padding = "p-6";
    imageSize = "h-20";
    textSize = "text-5xl";
  }

  return (
    <div class={tw`flex items-center gap-4 ${padding} ${bgColor} ${textColor}`}>
      <img src="" class={tw`flex-initial aspect-square ${imageSize}`} />
      <p
        class={tw`text-6xl font-bold ${
          size === "small"
            ? "none"
            : null
        }`}
      >
        Harmony{" "}
      </p>
      <p
        class={tw`${textSize}`}
      >
        by Example
      </p>
    </div>
  );
};

export default NavBar;
