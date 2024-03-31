import Lottie from "react-lottie";

interface LoadingProps {
  animationData: any;
}

export function Animation({ animationData }: LoadingProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
