

function MaidProfileEdit() {

      const [maid, setMaid] = useState([
            { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] }
      ]);
      //const [maid, setMaid] = useState();

      /*useEffect(() => {
            const fetchCustomer = async () => {
                  try {
                        const res = await axios.get('/api/maid/profile')
                        setMaid(res.data)
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchCustomer();
      }, [])*/
      
      const handleChange = useCallback((e) => {
            if(e.target.name === 'user_pic') {
                const file = e.target.files[0];
                setUser({ ...user, [e.target.name]: file });
    
            } else {
                setUser({ ...user, [e.target.name]: e.target.value });
            }
        }, [user]);

      return (
            <>
                  <Profile user={maid[0]}/>
                  <Link to={'edit'}>
                        <button> Edit </button>
                  </Link>
            </>
      )
}

export default MaidProfileEdit;