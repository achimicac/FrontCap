import React, { useEffect, useState } from 'react'; 
import { FaStar } from 'react-icons/fa';

function RatingBox({ maid, handleSubmit, clickStar, handleChange }) {

    return (
        <section>
            <article>
                <figure>
                    {(maid.user_pic !== null && maid.user_pic !== undefined) ?
                        <img src={`data:image/jpeg;base64,${maid.user_pic}`} /> :
                        <img src='MaKing.jpg' />
                    }
                </figure>
                <header>{maid.firstname} {maid.lastname} </header>
                <p> submit at:  { maid.submit_time } </p>
            </article>
            <form onSubmit={() => handleSubmit(maid.id)}>
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
                                style={{display: 'none'}}
                            />
                            <FaStar
                                color={ratingValue <= maid.rating ? '#ffc107' : '#e4e5e9'}
                            />
                        </label>
                    );
                })}
                <label>
                    <input 
                        type='text'
                        name='comment'
                        value={maid.comment}
                        onChange={(e) => handleChange(maid.id, e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default RatingBox;
