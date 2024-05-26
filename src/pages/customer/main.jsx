import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendBox from "../../components/RecommendBox";
import Axios from "../../axios";
import "./css/Main.css";

function CustomerMain() {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  const [startQueue, setStartQueue] = useState(1);
  const [distance, setDistance] = useState(1);
  const [maids, setMaids] = useState({
    maids_rmd: [
      { user_id: 1, user_pic: "" },
      { user_id: 2, user_pic: "" },
      { user_id: 3, user_pic: "" },
      { user_id: 4, user_pic: "" },
      { user_id: 5, user_pic: "" },
      { user_id: 5, user_pic: "" },
      { user_id: 5, user_pic: "" },
    ],
    maids_hired: [
      { user_id: 1, user_pic: "" },
      { user_id: 2, user_pic: "" },
      { user_id: 3, user_pic: "" },
      { user_id: 4, user_pic: "" },
      { user_id: 5, user_pic: "" },
    ],
  });
  const [maidsnear, setMaidsnear] = useState([
    {
      user_id: 1,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobtype: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      avg_rate: 2.5,
      distance: 2,
    },
    {
      user_id: 2,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobtype: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      avg_rate: 2.5,
      distance: 2,
    },
    {
      user_id: 3,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobtype: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      avg_rate: 2.5,
      distance: 2,
    },
    {
      user_id: 4,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobtype: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      avg_rate: 2.5,
      distance: 2,
    },
    {
      user_id: 5,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobtype: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      avg_rate: 2.5,
      distance: 2,
    },
  ]);

  // const onInputChange = (e) => {
  //   console.log(e.target.files[0]);
  //   setImage(e.target.files[0]);
  // };
  const fetchJobs = async () =>
    await axios.get("http://localhost:4800/api/v1/job");

  const fetchUsers = async (_ids) =>
    await axios.post("http://localhost:4800/api/v1/account/getByIDs", {
      ids: _ids,
    });

  const updateJobs = async (_jobs) =>
    await axios.post("http://localhost:4800/api/v1/userJob/updateUserJob", {
      token: window.localStorage.getItem("authtoken"),
      jobs: _jobs,
    });

  const getRecommendMaid = async () =>
    await axios
      .post("http://localhost:4800/api/v1/recommend/giveRecommendation", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) console.log("แนะนำแม่บ้านสำเร็จ");
        const recommend_data = res.data.recommend_maid;
        const maid_ids = recommend_data.map((maid) => maid.user.user_id);
        fetchUsers(maid_ids).then((res) => {
          const maid_data = res.data.maid_data;
          // console.log(mergeRecommendMaid(recommend_data, maid_data));
          setRecommendMaid(mergeRecommendMaid(recommend_data, maid_data));
        });
      });

  const [jobchoices, setJobchoices] = useState([]);

  const [jchoiceSelector, setJChoiceSelector] = useState([]);

  const [recommendMaid, setRecommendMaid] = useState([]);

  const [isShowRecommend, setShowRecommend] = useState(true);

  useEffect(() => {
    fetchJobs().then((res) => {
      setJobchoices(res.data);
      setJChoiceSelector(res.data.map((job) => [job, true]));
    });
    getRecommendMaid();
  }, []);

  const SelectAllJob = (_jobs) => {
    const toggle = _jobs[0][1] == false ? true : false;
    if (!toggle) setShowRecommend(false);
    if (toggle) setShowRecommend(true);
    return _jobs.map((job) => [job[0], toggle]);
  };

  const SelectJob = (_jobs, index) => {
    const updateJobs = _jobs.map((job, i) => {
      if (i == index) {
        const toggle = job[1] == false ? true : false;
        return [job[0], toggle];
      } else {
        return job;
      }
    });
    setShowRecommend(true);
    return updateJobs;
  };

  function mergeRecommendMaid(_recommendData, _maidData) {
    const mergedList = _recommendData.map((recommendedItem) => {
      const matchingMaid = _maidData.find(
        (maid) => maid.user_id === recommendedItem.user.user_id
      );

      if (!matchingMaid) {
        console.warn(
          `No matching maid found for user ID: ${recommendedItem.user.user_id}`
        );
        return null;
      }

      const mergedObject = {
        user_id: recommendedItem.user.user_id,
        user_role: recommendedItem.user.user_role,
        user_gender: matchingMaid.user_gender,
        user_pic: matchingMaid.user_pic,
        firstname: matchingMaid.firstname,
        lastname: matchingMaid.lastname,
        birthday: matchingMaid.birthday,
        email: matchingMaid.email,
        tel: matchingMaid.tel,
        jobs: [],
        avg_rating: recommendedItem.user.avg_rating,
        distance: (recommendedItem.distance / 100).toFixed(2),
        description: matchingMaid.description,
      };

      for (let i = 1; i <= 10; i++) {
        if (recommendedItem.user[`job${i}`]) {
          mergedObject.jobs.push(i);
        }
      }

      return mergedObject;
    });

    return mergedList;
  }

  const handleSelectJobs = async (_value) => {
    await updateJobs(_value)
      .then((res) => {
        getRecommendMaid();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (maidId) => {
    navigate(`/customer/maids/profile/${maidId}`);
  };
  const handleFilter = (e) => {
    const { name, value } = e.target;
    if (name === "distance") {
      return setDistance(value);
    }
  };

  return (
    <div className="customer-main">
      <header>
        
        <section>
          <p> แม่บ้านที่เคยเรียกใช้ </p>
          <RecommendBox maids={maids.maids_hired} handleClick={handleClick} />
        </section>
      </header>
      <main>
        <header>
          <label>
            <span> distance </span>
            <select
              id="distance"
              name="distance"
              value={distance}
              onChange={handleFilter}
              //disabled={!newInvoice.work_date}
            >
              <option value="all"> all </option>
              {[...Array(10)].map((dis, disid) => (
                <option key={disid} value={disid + 1}>
                  {disid + 1} km.
                </option>
              ))}
            </select>
          </label>
          <label>
            <ul className="category_list">
              <span>category</span>
              <li
                style={
                  jchoiceSelector.every((job) => job[1])
                    ? { backgroundColor: "#ffb3d0" }
                    : { backgroundColor: "#ffbed798" }
                }
                onClick={() => {
                  setJChoiceSelector(SelectAllJob(jchoiceSelector));
                  handleSelectJobs(jobchoices);
                }}
              >
                ทั้งหมด
              </li>
              {jchoiceSelector
                ? jchoiceSelector.map((job, index) => (
                    <li
                      key={index}
                      style={
                        jchoiceSelector[index][1]
                          ? { backgroundColor: "#ffb3d0" }
                          : { backgroundColor: "#ffbed798" }
                      }
                      onClick={() => {
                        const selected = SelectJob(jchoiceSelector, index)
                          .filter((job) => job[1])
                          .map((job) => job[0]);
                        setJChoiceSelector(SelectJob(jchoiceSelector, index));
                        handleSelectJobs(selected);
                      }}
                    >
                      {job[0].job_name}
                    </li>
                  ))
                : ""}
            </ul>
          </label>
        </header>
        <main>
          {isShowRecommend
            ? recommendMaid.map((maid, index) => (
                <div key={index} className="main-profilebox-wrapper">
                  <section
                    key={maid.user_id}
                    onClick={() => handleClick(maid.user_id)}
                  >
                    {maid.user_pic ? (
                      <img
                        src={
                          "../../../backend/src/imageGalleries/" + maid.user_pic
                        }
                        style={{ width: "30vw" }}
                      />
                    ) : (
                      <img
                        src={
                          "../../../backend/src/imageGalleries/1716567567852no_account"
                        }
                        style={{ width: "30vw" }}
                      />
                    )}
                    <div className="main-profilebox-content">
                      <article>
                        <header>
                          {maid.firstname} {maid.lastname}
                        </header>
                        <section>
                          <span>Rating: </span>
                          <span> {maid.avg_rate} / 5.0 </span>
                        </section>
                        <section>
                          <span>Distance: </span>
                          <span> {maid.distance} km. </span>
                        </section>
                        <section className="main-job-chips">
                          {maid.jobs.map((job, index) => (
                            <span key={index}>
                              {jobchoices[job - 1].job_name}
                            </span>
                          ))}
                        </section>
                      </article>
                    </div>
                  </section>
                </div>
              ))
            : ""}
        </main>
        <p> Loading... </p>
      </main>
    </div>
  );
}

export default CustomerMain;
