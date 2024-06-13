import { useState, useEffect } from "react";
import { projectFirestore, projectAuth } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const useReviews = (productNumber) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const getReviews = await getDocs(
        query(
          collection(projectFirestore, "reviews"),
          where("product", "==", productNumber),
          orderBy("timestamp", "desc")
        )
      );
      const reviewsData = getReviews.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [productNumber]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(projectAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async () => {
    const newReview = {
      username: user ? user.email : "Anonymous",
      date: new Date().toLocaleDateString(),
      text: reviewText,
      product: productNumber,
      timestamp: Timestamp.now(),
    };

    try {
      const docReference = await addDoc(
        collection(projectFirestore, "reviews"),
        newReview
      );
      setReviews([...reviews, { ...newReview, id: docReference.id }]);
      setReviewText("");
    } catch (err) {
      console.error("Error adding a new review: ", err);
    }
  };

  const handleReviewUpdate = async (id, updatedText) => {
    try {
      const reviewDoc = doc(projectFirestore, "reviews", id);
      await updateDoc(reviewDoc, {
        text: updatedText,
        timestamp: Timestamp.now(),
      });
      setReviews(
        reviews.map((review) =>
          review.id === id
            ? { ...review, text: updatedText, timestamp: Timestamp.now() }
            : review
        )
      );
    } catch (err) {
      console.error("Error updating the review: ", err);
    }
  };

  return {
    reviews,
    reviewText,
    setReviewText,
    handleReviewSubmit,
    handleReviewUpdate,
    user,
    setReviews,
  };
};

export default useReviews;
