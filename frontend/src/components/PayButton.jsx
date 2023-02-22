import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const PayButton = ({ order }) => {
  const {userInfo} = useSelector((state) => state.userLogin)

  const handleCheckout = () => {
    const orderItems = order.orders
    console.log(orderItems)

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
      .post('http://localhost:8000/checkout/create-checkout-session/', {
        orderItems : orderItems,
        userId: userInfo._id,
      },
      config
      )
      .then((response) => {
        console.log('miccheck')
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
       <Button type="submit" variant="primary" className="mt-3" onClick={handleCheckout}>
                    Checkout Now
                  </Button>
    </>
  );
};

export default PayButton;