import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import { textObj } from "./const";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";

// const text = textObj;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paragraph: {
    // textDecoration: 'none',
    textAlign: "left",
    color: "#989898",
  },
  title: {
    color: "#000000",
    textTransform: "capitalize",
  },
  actionButton: {
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    height: 50,
  },
}));

const TextBlock = (slideTitle, slideSubtitle) => {
  const classes = useStyles();

  return (
    <Box
      // display="flex"
      justify="center"
      alignItems="center"
      className={classes.paragraph}
    >
      <p>{slideTitle}</p>
      <h1 className={classes.title}>{slideSubtitle}</h1>
      <Button className={classes.actionButton}>shop now</Button>
    </Box>
  );
};
export default TextBlock;
