import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 260,
    },
  },
  title: {
    margin: "0px 0px 5px 0",
    padding: 5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  message: {
    textAlign: "center",
  },
}));

export default useStyles;