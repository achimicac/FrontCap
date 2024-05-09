import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./css/RatingBox.css";
function RatingBox({ maid, handleSubmit, clickStar, handleChange }) {
  return (
    <section className="ratingbox-container">
      <article className="ratingbox-header">
        <figure className="ratingbox-avatar">
          {maid.user_pic !== null && maid.user_pic !== undefined ? (
            <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
          ) : (
            <img src="MaKing.jpg" />
          )}
        </figure>
        <header>
          {maid.firstname} {maid.lastname}{" "}
        </header>
        <p> submit at: {maid.submit_time} </p>
      </article>
      <form onSubmit={() => handleSubmit(maid.id)} className="ratingbox-form">
        <label>
          <span> ให้คะแนน:</span>
          <div className="ratingbox-options">
            {[...Array(5)].map((star, starid) => {
              const ratingValue = starid + 1;
              return (
                <label key={starid}>
                  <input
                    type="radio"
                    name={`rating-${maid.id}`}
                    value={ratingValue}
                    onChange={() => clickStar(maid.id, ratingValue)}
                  />
                  <FaStar
                    color={ratingValue <= maid.rating ? "#80CBC4" : "#e4e5e9"}
                  />
                </label>
              );
            })}
          </div>
        </label>
        <label>
          <span>เพิ่มเติม</span>
          <input
            type="text"
            name="comment"
            value={maid.comment}
            onChange={(e) => handleChange(maid.id, e.target.value)}
            className="text-area"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default RatingBox;
