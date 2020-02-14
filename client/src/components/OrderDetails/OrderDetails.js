import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid } from "@material-ui/core";
import PreloaderAdaptive from "../Preloader/Adaptive";
import useStyles from "./useStyles";
import OrderCart from "./OrderCart/OrderCart";

const OrderDetails = () => {
  const classes = useStyles();
  const orderNumber = useParams();
  const [ orderDetails, setOrderDetails ] =  useState({
    name: "",
    status: "",
    email: "",
    mobile: "",
    deliveryAddress: "",
    products: [],
  });
  const [message, setMessage] = useState("");
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    const {CancelToken} = axios;
    const source = CancelToken.source();
    setPreloader(true);

    axios
      .get(`/api/orders/${orderNumber.orderNo}`, { cancelToken: source.token })
      .then( order => {
        if(!order.data) {
          setPreloader(false);
          setMessage(`Order with №${orderNumber.orderNo} does not exist`);
          return;
        }
        console.log(order);
        setPreloader(false);
        setOrderDetails(order.data);
      })
      .catch(error => {
        setMessage(`Error: ${error.message}`);
        setPreloader(false);
      });

    return () => {
      source.cancel();
    };
  },[orderNumber.orderNo]);

  const statusAction = orderDetails.canceled ? "canceled" : "successfully placed";
  const statusText = orderDetails.canceled ? "canceled" : orderDetails.status;

  return (preloader ? (
    <PreloaderAdaptive />
    ) : (
      <Container className={classes.orderDetailsContainer} maxWidth="lg">
        <Typography variant="h3">Order details</Typography>
        { message ? (
          <Typography>{message}</Typography>
        ) : (
          <div>
            <Typography className={classes.mainText}>
              {`Hi ${orderDetails.name}, your order №${orderDetails.orderNo} has been ${statusAction} at Plantly Shop.
               Order details are below.`}
            </Typography>
            <Typography className={classes.details}>{`Status: ${statusText}`}</Typography>
            <Typography className={classes.details}>{`Phone: ${orderDetails.mobile}`}</Typography>
            <Typography className={classes.details}>{`Email: ${orderDetails.email}`}</Typography>
            <Typography className={classes.details}>{`Delivery address: ${orderDetails.deliveryAddress}`}</Typography>
            <Grid container>
              <OrderCart cart={orderDetails.products} />
            </Grid>
          </div>
        )}
      </Container>
    )
  )
};

export default OrderDetails;
