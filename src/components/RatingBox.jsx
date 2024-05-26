import React, { useEffect, useState } from 'react'; 
import { FaStar } from 'react-icons/fa';
import './css/RatingBox.css'

function RatingBox({ maid, handleSubmit, clickStar, handleChange }) {

    return (
        <section className='rating-box'>
            <article>
                {/*<figure>*/}
                    {maid.user_pic ? (
                        <img src={`data:image/jpeg;base64,${maid.user_pic}`}/>
                        ) : (
                         <img src={"/sudlore.png"}/>
                        )}
                    {/*</figure>*/}
                <section>
                    <header>{maid.firstname} {maid.lastname} </header>
                    <span> เสร็จสิ้นงานเมื่อ:  { maid.submit_time } </span>
                </section>
            </article>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(maid.id);}}>
                <section>
                    <span>ให้คะแนน:</span>
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
                                    color={ratingValue <= maid.rating ? '#E1829B' : '#e4e5e9'}
                                />
                            </label>
                        );
                    })}
                </section>
                <section>
                    <span>เพิ่มเติม</span>
                    <label>
                        <textarea 
                            type='text'
                            name='comment'
                            value={maid.comment}
                            onChange={(e) => handleChange(maid.id, e.target.value)}
                        />
                    </label>
                </section>
                <footer className='rating-button'>
                    <button type="submit">Submit</button>
                </footer>
            </form>
        </section>
    );
}

export default RatingBox;
