import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    onSubmit(input);
    setInput("");
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search images and photos"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </header>
  );
}