import React, { useEffect, useState } from 'react'; 
import { FaStar } from 'react-icons/fa';

function RatingBox({ maid, handleSubmit, clickStar }) {

    return (
        <section>
            <article>
                <figure>
                    <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
                </figure>
                <header>{maid.firstname} {maid.lastname} </header>
                <p> submit at:  { maid.submit_time } </p>
            </article>
            <form onSubmit={handleSubmit}>
                ให้คะแนน:
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
                                color={ratingValue <= maid.rating ? '#ffc107' : '#e4e5e9'}
                            />
                        </label>
                    );
                })}
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default RatingBox;

