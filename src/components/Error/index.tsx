type Props = {
  minimal: boolean;
  image: string;
  message: string;
};
const Error: React.FC<Props> = ({ minimal, image, message }) => {
  const miniError = () => {
    return <div className="minimal-error-container">Mini Error</div>;
  };
  const errorPage = () => {
    return <div className="error-container">{message}</div>;
  };

  const body = () => {
    if (minimal) return miniError();
    return errorPage();
  };

  return <div className="error-page-main-container">{body()}</div>;
};

export default Error;
