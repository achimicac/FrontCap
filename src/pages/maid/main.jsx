import { useEffect, useState } from 'react';
import { th } from 'date-fns/locale';
import { format } from 'date-fns';
import { DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './styles/main.css'
import api from '../../axios';
import toast from 'react-hot-toast';
import SummaryInvoice from '../../components/SummaryInvoice';

function MaidMain() {
      const today = new Date();
      const [invoice_id, setInvoiceId] = useState(null);
      const [selected, setSelected] = useState(today); 
      const [invoices, setInvoices] = useState([
            {invoice_id: 1, user_id: 1, user_pic: "", firstname: "atchi", lastname: "nate", jobs: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 2, user_id: 2, user_pic: "", firstname: "atchi", lastname: "nate", jobs: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 3, user_id: 3, user_pic: "", firstname: "atchi", lastname: "nate", jobs: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
            {invoice_id: 4, user_id: 4, user_pic: "", firstname: "atchi", lastname: "nate", jobs: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'},
                                                                                                                                                                {invoice_id: 5, user_id: 5, user_pic: "", firstname: "atchi", lastname: "nate", jobs: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}], start_time: '13:00:00'}
      ])

      useEffect(() => {
            const handleDateChange =  async () => {
                  try {
                        // const getInvoiceByDay = api.post(`/api/v1/invoice/maid/main`, {date: format(selected, 'yyyy-MM-dd')})
                        const getInvoiceByDay = await api.post("/api/v1/invoice/maid/main", {
                              date: format(selected, 'yyyy-MM-dd'),
                              token: window.localStorage.getItem("authtoken")
                        });
                        if (getInvoiceByDay.status !== 200) {
                              console.log(getInvoiceByDay.data.error)
                              toast.error('มีปัญหาบางอย่างเกิดขึ้น กรุณารีเฟรชหน้าจออีกครั้ง')
                        } else {
                              setInvoices(getInvoiceByDay.data)
                        }
                  } catch (error) {
                        console.log(error)
                  }
            }
            handleDateChange()
      }, [selected])

      /*const formatCaption: DateFormatter = (date, options) => {
      const y = date.getFullYear().toLocaleString(th);
      const m = format(date, 'LLLL', { locale: options?.locale });
      return `${m} ${y}`;
      };*/

      const handleClickSummary = (invId) => () => {
            setInvoiceId(invId);
      };

      return (
            <main className='main-maid'>
                  {invoice_id &&
                        <SummaryInvoice
                              role={"maid"}
                              invoice_id={invoice_id}
                              clickCancel={() => setInvoiceId(null)}
                        />
                  }
                  <header className='calendar'>
                        <DayPicker 
                              classNames={'datepicker-calendar'}
                              mode="single"
                              required
                              selected={selected}
                              onSelect={setSelected}
                              modifiersStyles={{disabled: {fontSize: '4vw'}}}
                              locale={th}
                        />
                  </header>
                  <main className='profile-box'>
                        {invoices.map((custom, customid) => (
                              <article key={customid} className='customer-box' onClick={handleClickSummary(custom.invoice_id)}>
                                    <section>
                                          <p> { custom.start_time.split(':')[0]}:00 </p>
                                    </section>
                                    <section className='user-inform'>
                                          {/*<figure>*/}
                                                {custom.user_pic ? (
                                                      <img src={"../../public/imageGalleries/" + custom.user_pic} />
                                                      ) : (
                                                      <img
                                                            src={"../../public/imageGalleries/1716567567852no_account.png"}
                                                      />
                                                )}
                                          {/*</figure>*/}
                                          <article>
                                                <header>{custom.firstname} {custom.lastname}</header>
                                                <section>
                                                      {custom.jobs.slice(0, 5).map((job, jobid) => (
                                                                  <span key={jobid}>{job.job_name}</span>
                                                      ))}
                                                      {custom.jobs.length > 5 && <span> more... </span>}
                                                </section>
                                          </article>
                                    </section>
                              </article>
                        ))}
                  </main>
                  
            </main>
      )
}

export default MaidMain;