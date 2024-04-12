import { useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Profile from "../../components/Profile";


function UserOtherProfile() {
      const { id } = useParams();
      const navigate = useNavigate();

      const [maid, setMaid] = useState({
            id: 1,
            firstname: "atchima",
            lastname: "nateepradap",
            birthday: '12-09-2003',
            jobtype: [
                  { job_id: 1, job_name: "กวาดบ้าน" },
                  { job_id: 2, job_name: "ถูบ้าน" },
                  { job_id: 3, job_name: "ล้างจาน" }
            ],
            distance: 3.0,
            reviews: [
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's ok", rating: 2 },
                  { customer_id: 2, review_id: 1, star: 3, comment: "She's ok", rating: 4 },
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's ok", rating: 3 },
            ],
            role: 'maid',
            description: "Hello I'm the best of housework",
            avg_rate: 0
      });

      /*useEffect(() => {
            const fetchmaidProfile = async () => {
            try {
                  const response = await axios.get(`/api/customer/maids/profile/${id}`);
                  setMaid(response.data);
            } catch (error) {
                  console.log(error);
            }
            };
            fetchmaidProfile();
      }, []);*/

      const CalculateRating = () => {
            if (maid.reviews.length === 0) return 0; // Handle empty array case
            var rate = 0;
            maid.reviews.forEach((customer) => {
                  rate += customer.star;
            });
            return (rate / maid.reviews.length).toFixed(1); // Use length property directly
      };

      const clickButton = () => {
            navigate('employ')
      }

    console.log("length:  " + maid.reviews.length);
    console.log("cal rating" + CalculateRating());

    return (
        <>
            <header>
            </header>
            <main>
                  <article>
                        <figure>
                              {maid.user_pic ? (
                                    <img src={`data:image/jpeg;base64,${maid.user_pic}`} style={{width: '30vw'}} />
                                    ) : (
                                    <img src={"/sudlore.png"} style={{width: '30vw'}} />
                              )}
                        </figure>
                        <article>
                              <section>
                                    <p> {maid.firstname}  {maid.lastname} </p>
                              </section>
                              <section>
                                    Rating
                                    <p> {maid.avg_rate} / 5.0 </p>
                              </section>
                              <section>
                                    Distance
                                    <p> {maid.distance} m. </p>
                              </section>
                              <section>
                                    job type
                                    {maid.jobtype.map((job, jobin) => (
                                          <p key={job.job_id}> {job.job_name} </p>
                                    ))}
                              </section>
                              <section>
                                    Description
                                    <p> {maid.description} </p>
                              </section>

                              <button onClick={clickButton}> จ้างแม่บ้าน </button>
                        </article>
                  </article>
                  <article>
                    Review
                    {maid.reviews.map((review, reviewid) => (
                        <section key={reviewid}>
                            Rating
                            {[...Array(5)].map((star, starid) => {
                                const ratingValue = starid + 1;
                                return (
                                    <label key={starid}>
                                        <FaStar
                                            color={ratingValue <= review.rating ? '#ffc107' : '#e4e5e9'}
                                        />
                                    </label>
                                );
                            })}
                            <p> {review.comment} </p>
                        </section>
                    ))}
                </article>
            </main>
        </>
    );
}

export default UserOtherProfile;