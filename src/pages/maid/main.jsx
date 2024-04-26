import { useEffect, useState } from 'react';
import { th } from 'date-fns/locale';
import { format } from 'date-fns';
import { DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './styles/main.css'
import Axios  from "../../axios"

function MaidMain() {
      const today = new Date();
      const [selected, setSelected] = useState(today); 
      const [invoices, setInvoices] = useState([
            {invoice_id: 1, user_id: 1, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 2, user_id: 2, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 3, user_id: 3, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 4, user_id: 4, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 5, user_id: 5, user_pic: "", firstname: "atchi", lastname: "nate", jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'}
      ])

      /*useEffect(() => {
            const handleDateChange =  async() => {
                  try {
                        const response = Axios.get(`/api/maid/main?date=${format(selected, 'yyyy-MM-dd')}`)
                        setInvoices(response.data)
                  } catch (error) {
                        console.log(error)
                  }
            }
            handleDateChange()
      }, [selected])*/

      /*const formatCaption: DateFormatter = (date, options) => {
      const y = date.getFullYear().toLocaleString(th);
      const m = format(date, 'LLLL', { locale: options?.locale });
      return `${m} ${y}`;
      };*/

      return (
            <>
                  <header className='calendar'>
                        <DayPicker 
                              classNames={'datepicker-calendar'}
                              mode="single"
                              required
                              selected={selected}
                              onSelect={setSelected}
                              modifiersStyles={{disabled: {fontSize: '3%'}}}
                              locale={th}
                        />
                  </header>
                  <main className='profile-box'>
                        {invoices.map((custom, customid) => (
                              <article key={customid} className='customer-box'>
                                    <section>
                                          <p> { custom.start_time.split(':')[0]}:00 </p>
                                    </section>
                                    <section>
                                          {/*<figure>*/}
                                                {custom.user_pic ? (
                                                      <img src={`data:image/jpeg;base64,${custom.user_pic}`} />
                                                      ) : (
                                                      <img src={"/sudlore.png"} />
                                                )}
                                          {/*</figure>*/}

                                          <header>{custom.firstname} {custom.lastname}</header>
                                          <section>
                                                {custom.jobtype.slice(0, 9).map((job, jobid) => (
                                                            <p key={jobid}>{job.job_name}</p>
                                                ))}
                                                {custom.jobtype.length >= 10 && <p> more... </p>}
                                          </section>
                                    </section>
                              </article>
                        ))}
                  </main>
                  <footer> Loading... </footer>
            </>
      )
}

export default MaidMain;