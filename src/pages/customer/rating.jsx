import { useState, useEffect } from "react";
import Axios  from "../../axios"
import RatingBox from "../../components/RatingBox";
import Popup from "../../components/Popup";
import './css/rating.css'

function UserStatusRating() {
    const [invoice, setInvoice] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", submit_time: '2022-03-12', rating: 0, comment: "" },
        { id: 2, firstname: "atchima", lastname: "nateepradap", submit_time: '2022-03-12', rating: 0, comment: "" },
        { id: 3, firstname: "atchi", lastname: "natee", submit_time: '2022-03-12', rating: 0, comment: "" }
    ]);
    const [alert, setAlert] = useState(false);

    /*useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await Axios.get('api/customer/status/rating')
                setInvoice(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchInvoice();
    }, [])*/

    const handleStarClick = (maidId, ratingValue) => {
        setInvoice(prevMaids => prevMaids.map(maid => {
            if (maid.id === maidId) {
                return { ...maid, rating: ratingValue };
            }
            return maid;
        }));
    };

    const handleComment = (maidId, comment) => {
        setInvoice(prevMaids => prevMaids.map(maid => {
            if (maid.id === maidId) {
                return { ...maid, comment: comment };
            }
            return maid;
        }));
    }

    const handleSubmit = (maidId) => (e) => {
        e.preventDefault();
        try {
            const newreview = invoice.find(maid => maid.id === maidId)
            const {addreview} = Axios.post('api/customer/status/rating', newreview)
            if (!addreview.data.status) {
                setAlert(true);
                return;
            }
            invoice.splice(invoice.id, maidId)
        } catch (error) {
            
        }
    };
    console.log(invoice)

    return (
        <>
            <Popup 
                alert={alert} 
                message={"Review success"}
                clickCancel={()=>{setAlert(false)}}
            />
            <section className="rating-page">
                {invoice.map((maid, index) => (
                    <RatingBox key={index} handleSubmit={handleSubmit} maid={maid} clickStar={handleStarClick} handleChange={handleComment}/>
                ))}
            </section>
        </>
    );
}

export default UserStatusRating;
