import { useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import Axios  from "../../axios"
import Profile from "../../components/Profile";
import './css/maidProfile.css'


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
                  { job_id: 3, job_name: "ล้างจาน" },
                  { job_id: 3, job_name: "ล้างจาน" }
            ],
            distance: 3.0,
            reviews: [
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's ok", rating: 2, firstname: 'สมหมาย' },
                  { customer_id: 2, review_id: 1, star: 3, comment: "She's ok okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's okShe's ok", rating: 4, firstname: 'สมหมาย' },
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's ok", rating: 3, firstname: 'สมหมาย' },
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's ok", rating: 3, firstname: 'สมหมาย' },
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's ok", rating: 3, firstname: 'สมหมาย' },
                  { customer_id: 2, review_id: 1, star: 4, comment: "She's ok", rating: 3, firstname: 'สมหมาย' },
            ],
            role: 'maid',
            description: "Hello I'm the best of housework",
            avg_rate: 0
      });

      /*useEffect(() => {
            const fetchmaidProfile = async () => {
            try {
                  const response = await Axios.get(`/api/customer/maids/profile/${id}`);
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
            <main className="customer-maidprofile">
                  <article>
                        <figure>
                              {maid.user_pic ? (
                                    <img src={`data:image/jpeg;base64,${maid.user_pic}`} style={{width: '30vw'}} />
                                    ) : (
                                    <img src={"/sudlore.png"} style={{width: '30vw'}} />
                              )}
                        </figure>
                        <article>
                              <header> {maid.firstname}  {maid.lastname} </header>
                              <section>
                                    <span>คะแนน</span>
                                    <span>{maid.avg_rate} / 5.0</span>
                              </section>
                              <section>
                                    <span>ระยะทาง</span>
                                    <span> {maid.distance} km. </span>
                              </section>
                              <section>
                                    <span>ประเภทงาน</span>
                                    <section className="job-chips">
                                          {maid.jobtype.map((job, jobin) => (
                                                <span key={jobin}>{job.job_name}</span>
                                          ))}
                                    </section>
                              </section>
                              <section>
                                    <span>ข้อมูลเพิ่มเติม</span>
                                    <span> {maid.description} </span>
                              </section>
                              <footer>
                                    <button onClick={clickButton}> จ้างแม่บ้าน </button>
                              </footer>
                        </article>
                  </article>
                  <article>
                    <header>รีวิว</header>
                    {maid.reviews.map((review, reviewid) => (
                        <section key={reviewid}>
                              <section>
                                    <span><b>{review.firstname}***</b></span>
                                    ให้คะแนน
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
                              </section>
                              <section className="read-more mb-12">
                                    <input id={`read-more-checkbox-${reviewid}`} type="checkbox" className="read-more__checkbox" aria-hidden="true" />
                                    <p className="read-more__text mb-2">{review.comment}</p>
                                    <label htmlFor={`read-more-checkbox-${reviewid}`} className="read-more__label" data-read-more="Read more" data-read-less="See less" aria-hidden="true"></label>
                              </section>
                        </section>
                    ))}
                </article>
            </main>
        </>
    );
}

export default UserOtherProfile;