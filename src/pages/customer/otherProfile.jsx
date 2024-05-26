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
  
  const fetchJobs = async (_mode) =>
    await api.get("/api/v1/job").then((res) => {
      setJobchoices(res.data);
    });

  useEffect(() => {
    fetchJobs();
  }, []);

  const clickButton = () => {
    navigate("employ");
  };

  //     console.log("length:  " + maid.reviews.length);
  //     console.log("cal rating" + CalculateRating());

  return (
    <>
      <main className="customer-maidprofile">
        <article>
          <figure>
            {maid.user_pic ? (
              <img
                src={`../../../public/imageGalleries/${maid.user_pic}`}
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
              <span>{maid.avg_rating} / 5.0</span>
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
          {/* {maid.reviews.map((review, reviewid) => (
            <section key={reviewid}>
              <section>
                <span>
                  <b>{review.firstname}***</b>
                </span>
                ให้คะแนน
                {[...Array(5)].map((star, starid) => {
                  const ratingValue = starid + 1;
                  return (
                    <label key={starid}>
                      <FaStar
                        color={
                          ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"
                        }
                      />
                    </label>
                  );
                })}
              </section>
              <section className="read-more mb-12">
                <input
                  id={`read-more-checkbox-${reviewid}`}
                  type="checkbox"
                  className="read-more__checkbox"
                  aria-hidden="true"
                />
                <p className="read-more__text mb-2">{review.comment}</p>
                <label
                  htmlFor={`read-more-checkbox-${reviewid}`}
                  className="read-more__label"
                  data-read-more="Read more"
                  data-read-less="See less"
                  aria-hidden="true"
                ></label>
              </section>
            </section>
          ))} */}
        </article>
      </main>
    </>
  );
}

export default UserOtherProfile;
