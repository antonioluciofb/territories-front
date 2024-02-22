import { modalStyle } from "@Constants/modal";

export const createCustomStyle = (custom: object) => {
  return {
    ...modalStyle,
    content: {
      ...modalStyle.content,
      ...custom,
    },
  };
};
