import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Box } from "@material-ui/core";
// import EditIcon from '@material-ui/icons/Edit';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from "material-table";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddPartnerModal from "../AdminContent/AdminPartners/AddPartnerModal/AddPartnerModal";
import EditOrderModal from "./EditOrderModal/EditOrderModal";
import SnackbarMessage from "../Snackbar/SnackbarMessage";
import AdminOrdersProducts from "./AdminOrdersProducts/AdminOrdersProducts";
import useStyles from "./useStyles";

function AdminOrders() {
  const classes = useStyles();
  const [ordersArr, setOrdersArr] = useState([]);
  const [AddModal, setAddModal] = useState({ isOpened: false, rowData: null });
  const [EditModal, setEditModal] = useState({ isOpened: false, rowData: null });

  const getAllOrders = () => {
    axios
      .get("/api/orders/all")
      .then(orders => {
        setOrdersArr(orders.data);
      })
      .catch(err => {
        console.log("orders", err);
      });
  };

  const getActiveOrders = () => {
    axios
      .get("/api/orders/active")
      .then(orders => {
        setOrdersArr(orders.data);
      })
      .catch(err => {
        console.log("orders", err);
      });
  };

  const handleOpenAddModal = () => {
    setAddModal({
      isOpened: !AddModal.isOpened,
      rowData: AddModal.rowData,
    });
  };

  const handleEditModal = (rowData) => {
    setEditModal({
      isOpened: !EditModal.isOpened,
      rowData,
    });
  };

  const closeModal = () => {
    setAddModal({
      isOpened: false,
      rowData: AddModal.rowData,
    });
    setEditModal({
      isOpened: false,
      rowData: EditModal.rowData,
    });
    getAllOrders();
  };

  // const modalInputs = () => {
  //   const valuesArr = Object.keys(colors[0]);
  //   const inputs = valuesArr.filter(word => word !== "_id" && word !== "date" && word !=="tableData" && word !== "__v");
  // }


  // snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState({ type: "", message: "" });

  const handleOpenSnackbar = (type) => {
    setOpenSnackbar(true);
    setSnackbarType(type);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };


  const columns = [
    { title: "Order №", field: "orderNo" },
    { title: "Canceled", field: "canceled", type: "boolean" },
    { title: "Status", field: "status" },
    { title: "Name", field: "name" },
    { title: "Mobile", field: "mobile" },
    { title: "Email", field: "email" },
    { title: "Delivery Address", field: "deliveryAddress" },
    { title: "Total Sum", field: "totalSum" },
  ];

  const materialTable = () => {
    return (
      <MaterialTable
        columns={columns}
        data={ordersArr}
        title="All orders"
        detailPanel={[
          {
            tooltip: "Show Products",
            render: rowData => {
              return (
                <AdminOrdersProducts rowData={rowData.products} totalSum={rowData.totalSum} />
              );
            },
          },
        ]}
        actions={[
/*          {
            icon: () => <AddCircleIcon />,
            tooltip: "New order",
            isFreeAction: true,
            onClick: () => {
              handleOpenAddModal();
            },
          }, */
          rowData => ({
            hidden: rowData.canceled,
            icon: () => <EditIcon />,
            tooltip: "Edit order",
            onClick: (event, rowData) => handleEditModal(rowData),
          }),
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => getAllOrders(),
          },
        ]}
      />
    );
  };

  return (
    <>
      <Button variant="contained" onClick={getAllOrders} className={classes.btn}>
        Get all orders
      </Button>
      <Button variant="contained" onClick={getActiveOrders} className={classes.btn}>
        Get active orders
      </Button>
      {ordersArr.length === 0 ? (
        <div />
      ) : (
        <Box className={classes.wrapper}>
          {materialTable()}
          {AddModal.isOpened &&
          <AddPartnerModal open={AddModal.isOpened} handleModal={closeModal} partner={AddModal.rowData} />}
          {EditModal.isOpened && (
            <EditOrderModal
              open={EditModal.isOpened}
              handleModal={closeModal}
              handleOpenSnackbar={handleOpenSnackbar}
              order={EditModal.rowData}
              autoRefresh={getAllOrders}
            />
          )}
          <SnackbarMessage
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            type={snackbarType}
          />
        </Box>
      )}
    </>
  );
}

export default AdminOrders;