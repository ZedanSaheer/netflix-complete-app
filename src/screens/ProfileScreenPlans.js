import React, { useEffect, useState } from 'react'
import './ProfileScreen.css'
import db from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'
import { loadStripe } from '@stripe/stripe-js'

const ProfileScreenPlans = ({setUser}) => {

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                alert(`something went wrong : ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51JNvIQSGM89JBLeEparqS1p4qvNP2GozSuH3Q969LZ912ucSY0IROjSBxoC69iQD56Q3pr3v2fDMvXSuLHPuYZgG00AXrZcAg4");
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async (subscription) => {
                    setSubscription({
                        role: subscription.data().role,
                        currentPeriodStart: subscription.data().current_period_start.seconds,
                        currentPeriodEnd: subscription.data().current_period_end,
                    })
                    setUser(subscription);
                })
            })
    }, [user.uid , setUser])

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
                setProducts(products);
            })

    }, [])

    return (
        <>
            <div className="profilescreen-box-content-plan-title">
                <h3>Plans (Current Plan : {subscription ? products.name: "No Active Plans"} )</h3>
            </div>

            <div className="profilescreen-box-content-plan-date">

                {subscription && (<h4> Renewal Date : {new Date(subscription?.currentPeriodEnd*1000).toLocaleDateString()} </h4>)}

            </div>

            <div className="profilescreen-box-content-plans-container">
                {Object.entries(products).map(([productId, productData]) => {

                    const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);


                    return (
                        <div key={productId}>

                            <div className="profilescreen-box-content-plan">

                                {isCurrentPackage ?
                                    (<>
                                        <div className="profilescreen-box-content--current-plan-detail">
                                            <span className="profilescreen-box-content-plan-detail-name">{productData.name}</span>
                                            <span className="profilescreen-box-content-plan-detail-vq">{productData.description}</span>
                                        </div>
                                        <div className="profilescreen-box-content-current-plan-button">
                                            <button className="profile-screen-current-subscribe" onClick={() => loadCheckout(productData.prices.priceId)}>Current Plan</button>
                                        </div> </>)
                                    :
                                    (<>
                                        <div className="profilescreen-box-content-plan-detail">
                                            <span className="profilescreen-box-content-plan-detail-name">{productData.name}</span>
                                            <span className="profilescreen-box-content-plan-detail-vq">{productData.description}</span>
                                        </div>
                                        <div className="profilescreen-box-content-plan-button">
                                            <button className="profile-screen-subscribe" onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                                        </div>
                                    </>)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProfileScreenPlans
