import { useState } from "react";

function Profile({user, isMaid=false}) {

      const calculateBirthday = (birthday) => {
            const [day, month, year] = birthday.split('-');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currentDay = currentDate.getDate();
        
            let age = currentYear - parseInt(year, 10);
        
            if (parseInt(month, 10) > currentMonth || (parseInt(month, 10) === currentMonth && parseInt(day, 10) > currentDay)) {
                age--;
            }
        
            return age;
      }
        

      return (
            <main>
                  <figure>
                        {(user.user_pic !== null && user.user_pic !== undefined) ?
                              <img src={`data:image/jpeg;base64,${maid.user_pic}`} /> :
                              <img src='ania.jpg' />
                        }
                  </figure>
                  
                  <article>
                        <header> {user.firstname} {user.lastname} </header>
                        <section> 
                              birthday 
                              <p> {calculateBirthday(user.birthday)} </p>
                        </section>
                        <section> 
                              age
                              <p> {user.age} </p>
                        </section>
                        <section> 
                              email
                              <p> {user.email} </p>
                        </section>
                        {isMaid && 
                              <section>
                                    job type
                                    {user.jobtype.map((job, jobin) => (
                                          <p key={job.job_id}> {job.job_name} </p>
                                    ))}
                              </section>
                        }
                        <section> 
                              description
                              <p> {user.description} </p>
                        </section>
                  </article>
            </main>
      )
}

export default Profile;