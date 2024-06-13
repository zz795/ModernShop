import React, { useState } from "react";
// style
import styles from "./Product1.module.css";
//get reviews
import useReviews from "../../hooks/useReviews";
//delete reviews
import { projectFirestore } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const Product1 = () => {
  const {
    reviews,
    reviewText,
    setReviewText,
    handleReviewSubmit,
    handleReviewUpdate,
    user,
    setReviews,
  } = useReviews("product1");
  // Track which review is being edited
  const [editMode, setEditMode] = useState(null);
  // Store the text being edited
  const [editText, setEditText] = useState("");

  const handleReviewsDelete = async (id) => {
    try {
      await deleteDoc(doc(projectFirestore, "reviews", id));
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (err) {
      console.error("Error deleting the review: ", err);
    }
  };

  const handleEditClick = (id, currentText) => {
    setEditMode(id);
    setEditText(currentText);
  };

  const handleEditSubmit = (id) => {
    handleReviewUpdate(id, editText);
    setEditMode(null);
    setEditText("");
  };

  return (
    <div className={styles.container}>
      <img
        src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200"
        alt="MacBook Pro in Gray"
        className={styles.image}
      />
      <div className={styles.details}>
        <h2>14-inch MacBook Pro (Space Gray)</h2>
        <p>8-Core CPU</p>
        <p>10-Core GPU</p>
        <p>8GB Unified Memory</p>
        <p>512GB SSD Storage</p>
        <ul>
          <li>14-inch Liquid Retina XDR display</li>
          <li>
            Two Thunderbolt / USB 4 ports, HDMI port, SDXC card slot, headphone
            jack, MagSafe 3 port
          </li>
          <li>Magic Keyboard with Touch ID</li>
          <li>Force Touch trackpad</li>
          <li>70W USB-C Power Adapter</li>
        </ul>
        <button className={styles.button}>$1599.00</button>
        <h3>Reviews</h3>
        <div className={styles.reviewSection}>
          <textarea
            className={styles.reviewInput}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          />
          <button className={styles.reviewButton} onClick={handleReviewSubmit}>
            Write A Review
          </button>
          <p>
            <small>
              <em>
                (Anonymous if not signed in, and won't be able to delete
                reviews)
              </em>
            </small>
          </p>
        </div>
        <hr className={styles.divider} />
        {reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <p className={styles.username}>{review.username}</p>
            <p>
              <small>Reviewed on {review.date}</small>
            </p>
            {editMode === review.id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className={styles.editTextArea}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => handleEditSubmit(review.id)}
                >
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setEditMode(null);
                    setEditText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p>{review.text}</p>
            )}

            {user &&
              user.email === review.username &&
              editMode !== review.id && (
                <>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(review.id, review.text)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleReviewsDelete(review.id)}
                  >
                    Delete
                  </button>
                </>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product1;
