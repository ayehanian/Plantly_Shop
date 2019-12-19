import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  border: {
    border: '1px solid black',
  },

  borderNoBottom: {
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
  },

  borderNoRight: {
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
}));

export default useStyles;
