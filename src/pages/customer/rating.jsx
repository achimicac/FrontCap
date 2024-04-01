import { useState, useEffect } from "react";
import axios from 'axios';
import RatingBox from "../../components/RatingBox";
import Popup from "../../components/Popup";

function UserStatusRating() {
    const [invoice, setInvoice] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], submit_time: '2022-03-12', rating: 0, comment: "" },
        { id: 2, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], submit_time: '2022-03-12', rating: 0, comment: "" },
        { id: 3, firstname: "atchi", lastname: "natee", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], submit_time: '2022-03-12', rating: 0, comment: "" }
    ]);
    const [alert, setAlert] = useState(false);

    /*useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await axios.get('api/customer/status/rating')
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
            const {addreview} = axios.post('api/customer/status/rating', newreview)
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
            {invoice.map((maid, index) => (
                <RatingBox key={index} handleSubmit={handleSubmit} maid={maid} clickStar={handleStarClick} handleChange={handleComment}/>
            ))}
        </>
    );
}

export default UserStatusRating;
