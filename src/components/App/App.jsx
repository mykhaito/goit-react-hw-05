import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

const API_KEY = "oHSxvxrgkBbV2QsaNe6iHw5qN94HGPqjhNtu-zLMxr0";
const API_URL = "https://api.unsplash.com/search/photos";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });
        setImages((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        setError("Failed to fetch images. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [images]);
  
  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="App">
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}
