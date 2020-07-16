import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherprops }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherprops} />
    );
  };
  return Spinner;
};

export default WithSpinner;
