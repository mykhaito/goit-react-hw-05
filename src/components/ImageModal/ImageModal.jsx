import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ image, onClose }) {
  return (
    <Modal isOpen={!!image} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay}>
      {image && <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />}
    </Modal>
  );
}