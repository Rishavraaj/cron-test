import React, { ReactNode } from "react";

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  onSuccess: ReactNode;
};

const Async = ({ isLoading, isError, onSuccess }: Props) => {
  if (isLoading) {
    return <p>loading please wait...</p>;
  } else if (isError) {
    return <p>something went wrong please refresh the page</p>;
  } else {
    return <>{onSuccess}</>;
  }
};

export default Async;
