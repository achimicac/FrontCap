function Profile({user}) {

      return (
            <main>
                  {/*<figure>
                        {(user.user_pic !== null && user.user_pic !== undefined) &&
                              <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
                        }
                  </figure>*/}
                  <article>
                        <header> {user.firstname} {user.lastname} </header>
                        <section> 
                              birthday 
                              <p> {user.birthday} </p>
                        </section>
                        <section> 
                              age
                              <p> {user.age} </p>
                        </section>
                        <section> 
                              email
                              <p> {user.email} </p>
                        </section>
                        <section> 
                              description
                              <p> {user.description} </p>
                        </section>
                  </article>
            </main>
      )
}

export default Profile;