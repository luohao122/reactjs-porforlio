import React from "react";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { compose } from "redux";
import { connect } from "react-redux";
import { signIn } from "../../actions";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  errorMessage: {
    color: theme.palette.error.main,
  },
  form: {
    width: "100%", //Fix IE 11 Issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {
  renderError = ({ touched, error }) => {
    return touched && error ? true : false;
  };

  renderErrorMessage = ({ touched, error }) => {
    return touched && error ? error : "";
  };

  onSubmit = (formValues) => {
    this.props.signIn(formValues, () => {
      this.props.history.push("posts/list");
    });
  };

  renderInput = ({ input, meta, label, fullWidth, type }) => {
    return (
      <>
        <TextField
          type={type}
          id={input.name}
          label={label}
          {...input}
          fullWidth
          variant="outlined"
          helperText={this.renderErrorMessage(meta)}
          error={this.renderError(meta)}
          autoComplete="off"
        />
      </>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="div" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className={classes.form}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  type="email"
                  component={this.renderInput}
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  type="password"
                  component={this.renderInput}
                  label="Password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <div className={classes.errorMessage}>
              {this.props.errorMessage}
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Please enter an email address";
  }

  if (!formValues.password) {
    errors.password = "Please enter a password";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.errorMessage };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { signIn }),
  reduxForm({
    form: "signInForm",
    validate,
  })
)(SignIn);
