import { LoadingAnimation, Animation } from "@medication-intake-tracker/shared";
import "./Loading.scss";

export function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-animation">
        <Animation animationData={LoadingAnimation} />
      </div>
    </div>
  );
}
