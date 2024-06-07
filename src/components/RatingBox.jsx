import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./css/RatingBox.css";

function RatingBox({ invoice, handleSubmit, clickStar, handleChange }) {
  return (
    <section className="rating-box">
      <article>
        {invoice.user_pic ? (
          <img src={"../../public/imageGalleries/" + invoice.user_pic} />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
          />
        )}
        <section>
          <header>
            {invoice.firstname} {invoice.lastname}{" "}
          </header>
          <span> เสร็จสิ้นงานเมื่อ: {invoice.submit_time} </span>
        </section>
      </article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(invoice.id);
        }}
      >
        <section>
          <span>ให้คะแนน:</span>
          {[...Array(5)].map((star, starid) => {
            const ratingValue = starid + 1;
            return (
              <label key={starid}>
                <input
                  type="radio"
                  name={`rating-${invoice.invoice_id}`}
                  value={ratingValue}
                  onChange={() => clickStar(invoice.invoice_id, ratingValue)}
                  style={{ display: "none" }}
                />
                <FaStar
                  color={ratingValue <= invoice.star ? "#E1829B" : "#e4e5e9"}
                />
              </label>
            );
          })}
        </section>
        <section>
          <span>เพิ่มเติม</span>
          <label>
            <textarea
              type="text"
              name="comment"
              value={invoice.comment}
              onChange={(e) => handleChange(invoice.invoice_id, e.target.value)}
            />
          </label>
        </section>
        <footer className="rating-button">
          <button type="submit">Submit</button>
        </footer>
      </form>
    </section>
  );
}

export default RatingBox;
