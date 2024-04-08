import { useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecommendBox from "../../components/RecommendBox";
import { set } from "mongoose";

function CustomerMain() {
      const navigate = useNavigate()

      const [startQueue, setStartQueue] = useState(1);
      const [distance, setDistance] = useState(1);
      const [jobselect, setJobselect] = useState("all")
      const [maids, setMaids] = useState({
            maids_rmd: [
                  {user_id: 1, user_pic: ""},
                  {user_id: 2, user_pic: ""},
                  {user_id: 3, user_pic: ""},
                  {user_id: 4, user_pic: ""},
                  {user_id: 5, user_pic: ""}
            ],
            maids_hired: [
                  {user_id: 1, user_pic: ""},
                  {user_id: 2, user_pic: ""},
                  {user_id: 3, user_pic: ""},
                  {user_id: 4, user_pic: ""},
                  {user_id: 5, user_pic: ""}
            ]
      });
      const [maidsnear, setMaidsnear] = useState([
            {user_id: 1, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], distance: 2},
            {user_id: 2, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], distance: 2},
            {user_id: 3, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], distance: 2},
            {user_id: 4, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], distance: 2},
            {user_id: 5, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], distance: 2}
      ])
      const [jobchoices, setJobchoices] = useState([
            {job_id: 1, job_name: "กวาดบ้าน"}, 
            {job_id: 2, job_name: "ถูบ้าน"}, 
            {job_id: 3, job_name: "ล้างจาน"}, 
            {job_id: 4, job_name: "ซักผ้า"},
            {job_id: 5, job_name: 'จัดห้อง'},
            {job_id: 6, job_name: 'รดน้ำต้นไม้'}
      ])
      /*useEffect(() => {
            const fetchmaidsnear = async () => {
                  try {
                        const response = await axios.get(`/api/customer/home?queue=${startQueue}&distance=${diatance}&job=${jobselect}`);
                        setMaidsnear(prevMaids => [...prevMaids, ...response.data]);
                  } catch (error) {
                        console.log(error);
                  }
            };
            if(startQueue !== 1) {
                  return fetchmaidsnear()
            }
            const fetchmaids = async () => {
                  try {
                        const response = await axios.get(`/api/customer/home`);
                        setMaids({...maids, maids_rmd: response.maids_rmd, maids_hired: response.maid_hired});
                  } catch (error) {
                        console.log(error);
                  }
            };
            fetchmaids();
            fetchmaidsnear()
      }, [startQueue, distance, job]);*/

      const handleScroll = () => {
            const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
            if (bottom) {
              setStartQueue(prevPage => prevPage + 10);
            }
      };

      useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
      }, []);
      const handleClick = (maidId) => {
            navigate(`/customer/maids/profile/${maidId}`)
      };
      const handleFilter = (e) => {
            const { name, value } = e.target;
            if ( name === "distance" ) {
                  return setDistance(value)
            }
            setJobselect(value)
      }
      //มีสองอย่างคือ back cal แล้วส่งมา กับ back ส่ง review มาด้วย ซึ่ง ไม่จำเป็นเลย เพราะมันจะใช้แค่ rating
      /*const CalculateRating = () => {
            if (maid.reviews.length === 0) return 0; // Handle empty array case
            var rate = 0;
            maid.reviews.forEach((customer) => {
                  rate += customer.star;
            });
            return (rate / maid.reviews.length).toFixed(1); // Use length property directly
      };*/

      return (
            <>
                  <header>
                        <section> แม่บ้านใกล้คุณ </section>
                        <section>
                              <p> แม่บ้านแนะนำ </p>
                              <RecommendBox maids={maids.maids_rmd} handleClick={handleClick}/>
                        </section>
                        <section>
                              <p> แม่บ้านที่เคยเรียกใช้ </p>
                              <RecommendBox maids={maids.maids_hired} handleClick={handleClick}/>
                        </section>
                  </header>
                  <main>
                        <header>
                              <label>
                                    distance
                                    <select
                                          id="distance"
                                          name="distance"
                                          value={distance}
                                          onChange={handleFilter}
                                          //disabled={!newInvoice.work_date}
                                    >
                                          <option value="all"> all </option>
                                          {[...Array(10)].map((dis, disid) => (
                                                <option key={disid} value={disid+1}>
                                                { disid + 1 }  km.
                                                </option>
                                          ))}
                                    </select>
                              </label>
                              <label>
                                    category
                                    <select
                                          id="job"
                                          name="job"
                                          value={jobselect}
                                          onChange={handleFilter}
                                          //disabled={!newInvoice.work_date}
                                          required
                                    >
                                          <option value="all"> all </option>
                                          {jobchoices.map((job) => (
                                                <option key={job.job_id} value={job.job_id}>
                                                      {job.job_name}
                                                </option>
                                          ))}
                                    </select>
                              </label>
                        </header>
                        <main>
                              {maidsnear.map((maid) => (
                                    <section key={maid.user_id}>
                                          <figure>
                                                {maid.user_pic !== null && maid.user_pic !== undefined ? (
                                                      <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
                                                      ) : (
                                                      <img src="MaKing.jpg" alt="Profile" />
                                                )}
                                          </figure>
                                          <article>
                                                <header>{maid.firstname} {maid.lastname}</header>
                                                {/*<section>
                                                      Rating
                                                      <p> {CalculateRating()} / 5.0 </p>
                                                      </section>*/}
                                                <section>
                                                      Distance
                                                      <p> { maid.distance }  km. </p>
                                                </section>
                                                <table>
                                                      {maid.jobtype.map((job, jobid) => (
                                                            <tbody key={jobid}>
                                                                  <tr>
                                                                        <td>{job.job_name}</td>
                                                                  </tr>
                                                            </tbody>
                                                      ))}
                                                </table>
                                          </article>
                                    </section>
                              ))}
                        </main>

                  </main>
                <p> Loading... </p>
            </>
        );
}

export default CustomerMain;