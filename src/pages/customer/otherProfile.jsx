import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import api from "../../axios";
import Profile from "../../components/Profile";
import "./css/maidProfile.css";

function UserOtherProfile() {
  const navigate = useNavigate();

  const [maid, setMaid] = useState(() => {
    const maidData = JSON.parse(window.localStorage.getItem("selectedMaid"));
    return maidData;
  });
  const [jobchoices, setJobchoices] = useState([]);
  const [allReview, setAllReview] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);

  const fetchJobs = async (_mode) =>
    await api.get("/api/v1/job").then((res) => {
      setJobchoices(res.data);
    });

  const fetchReviews = async () => {
    await api
      .post("/api/v1/review/getReview", { maid_email: maid?.email })
      .then((res) => {
        setReviewCount(res.data.review_count);
        setAllReview(res.data.review_data);
        const rate_sum = res.data.review_data.reduce(
          (acc, review) => acc + review.star,
          0
        );
        setRating(rate_sum / res.data.review_count);
      });
  };

  const updateRating = async () =>
    await api
      .put("/api/v1/rating/updateRating", {
        maid_email: maid?.email,
        rating: rating,
      })
      .then((res) => {
        console.log(res.data.text);
      });

  useEffect(() => {
    fetchReviews();
    fetchJobs();
  }, []);

  useEffect(() => {
    updateRating();
  }, [rating]);

  const clickButton = () => {
    navigate("employ");
  };

  return (
    <>
      <main className="customer-maidprofile">
        <article>
          <figure>
            {maid.user_pic ? (
              <img
                src={`../../../public/imageGalleries/${maid?.user_pic}`}
                style={{ width: "30vw" }}
              />
            ) : (
              <img
                src={`../../../public/imageGalleries/1716567567852no_account.png`}
                style={{ width: "30vw" }}
              />
            )}
          </figure>
          <article>
            <header>
              {maid.firstname} {maid.lastname}
            </header>
            <section>
              <span>คะแนน</span>
              <span>{rating} / 5.0</span>
            </section>
            <section>
              <span>ระยะทาง</span>
              <span> {maid.address_distance.toFixed(2)} km. </span>
            </section>
            <section>
              <span>ประเภทงาน</span>
              <section className="job-chips">
                {jobchoices.length > 0
                  ? jobchoices
                      .filter((choice) => maid.jobs.includes(choice.job_id))
                      .map((job, index) => (
                        <span key={index}>{job.job_name}</span>
                      ))
                  : ""}
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
          {allReview?.map((review, index) => (
            <section key={index}>
              <section>
                <span>
                  <b>
                    {review.firstname} {review.lastname} &nbsp;&nbsp;
                  </b>
                </span>
                ให้คะแนน &nbsp;
                {[...Array(5)].map((star, starid) => {
                  const ratingValue = starid + 1;
                  return (
                    <label key={starid}>
                      <FaStar
                        color={
                          ratingValue <= review.star ? "#E1829B" : "#e4e5e9"
                        }
                      />
                    </label>
                  );
                })}
              </section>
              <section className="read-more mb-12">
                <input
                  id={`read-more-checkbox-${index}`}
                  type="checkbox"
                  className="read-more__checkbox"
                  aria-hidden="true"
                />
                <p className="read-more__text mb-2">{review.comment}</p>
                <label
                  style={{ color: "#E1829B" }}
                  htmlFor={`read-more-checkbox-${index}`}
                  className="read-more__label"
                  data-read-more="อ่านเพิ่มเติม"
                  data-read-less="อ่านน้อยลง"
                  aria-hidden="true"
                ></label>
              </section>
            </section>
          ))}
        </article>
      </main>
    </>
  );
}

export default UserOtherProfile;
