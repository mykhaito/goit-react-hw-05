import { RingLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <RingLoader color="#36d7b7" />
    </div>
  );
}