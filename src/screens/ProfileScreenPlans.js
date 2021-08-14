import React, { useEffect, useState } from 'react'
import './ProfileScreen.css'
import db from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'
import { loadStripe } from '@stripe/stripe-js'

const ProfileScreenPlans = () => {

    const loadCheckout = async (priceId) =>{
        const docRef = await db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price : priceId,
            success_url : window.location.origin,
            cancel_url : window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const {error , sessionId} = snap.data()

            if(error){
                alert(`something went wrong : ${error.message}`)
            }

            if (sessionId){
                const stripe = await loadStripe("pk_test_51JNvIQSGM89JBLeEparqS1p4qvNP2GozSuH3Q969LZ912ucSY0IROjSBxoC69iQD56Q3pr3v2fDMvXSuLHPuYZgG00AXrZcAg4");
                stripe.redirectToCheckout({sessionId});
            }
        });
    };

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        }
                    })
                })
             setProducts(products)
            })
       
    }, [])

    return (
        <>
        <div className="profilescreen-box-content-plan-title">
        <h3>Plans</h3></div>
        <div className="profilescreen-box-content-plan-date">
                <h4>Renewal Date :</h4>
            </div>
        <div className="profilescreen-box-content-plans-container">
        {Object.entries(products).map(([productId,productData])=>{
              return (
                <div className="profilescreen-box-content-plan" key={productId}>
                    <div className="profilescreen-box-content-plan-detail"><span className="profilescreen-box-content-plan-detail-name">{productData.name}</span><span className="profilescreen-box-content-plan-detail-vq">{productData.description}</span></div>
                    <div className="profilescreen-box-content-plan-button">
                    <button className="profile-screen-subscribe" onClick={()=> loadCheckout(productData.prices.priceId)}>Subscribe</button></div>
                </div>
              )
        })}
        </div>
        </>
    )
}

export default ProfileScreenPlans
