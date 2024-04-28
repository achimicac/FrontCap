import { useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecommendBox from "../../components/RecommendBox";
import Axios  from "../../axios"

function CustomerMain() {
      const navigate = useNavigate()
      const [value, onChange] = useState(new Date());

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
            {user_id: 1, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], avg_rate: 2.5, distance: 2},
            {user_id: 2, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], avg_rate: 2.5, distance: 2},
            {user_id: 3, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], avg_rate: 2.5, distance: 2},
            {user_id: 4, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], avg_rate: 2.5, distance: 2},
            {user_id: 5, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], avg_rate: 2.5, distance: 2}
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
                        const response = await Axios.get(`/api/customer/main?queue=${startQueue}&distance=${distance}&job=${jobselect}`);
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
                        const response = await Axios.get(`/api/customer/main`);
                        setMaids({...maids, maids_rmd: response.maids_rmd, maids_hired: response.maid_hired});
                  } catch (error) {
                        console.log(error);
                  }
            };
            fetchmaids();
            fetchmaidsnear()
      }, [startQueue, distance, job]);*/

      /*const handleScroll = () => {
            const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
            if (bottom) {
              setStartQueue(prevPage => prevPage + 10);
            }
      };*/

      /*useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
      }, []);*/
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
                                    <section key={maid.user_id} onClick={() => handleClick(maid.user_id)}>
                                          <figure>
                                          {maid.user_pic ? (
                                                <img src={`data:image/jpeg;base64,${maid.user_pic}`} style={{width: '30vw'}} />
                                                ) : (
                                                <img src={"/sudlore.png"} style={{width: '30vw'}} />
                                          )}
                                          </figure>
                                          <article>
                                                <header>{maid.firstname} {maid.lastname}</header>
                                                <section>
                                                      Rating
                                                      <p> {maid.avg_rate} / 5.0 </p>
                                                </section>
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
                        <p> Loading... </p>
                  </main>
            </>
        );
}

export default CustomerMain;