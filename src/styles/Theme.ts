export const colors = {
  brown: "#5e5e5e",
  white: "#FFFFFF",
  Pink: "#f9e5e6",
  lightsPink: "#feeeee",
  darkPink: "#e5989d",
  brand: "#09AAC6",
  red: "#e1444f",
  lightGrey: "#f2f2f2",
  grey: "#d2d0d0",
};

export const deviceSizes = {
  mobile: "375px",
  tablet: "768px",
  desktop: "1024px",
};

export const device = {
  mobile: `@media only screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `@media only screen and (min-width: ${deviceSizes.tablet}) and (max-width: ${deviceSizes.desktop})`,
  desktop: `@media only screen and (min-width: ${deviceSizes.desktop})`,
};
