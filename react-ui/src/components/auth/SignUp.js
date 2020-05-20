import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

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
  form: {
    width: "100%", //Fix IE 11 Issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {
  renderError = ({ touched, error }) => {
    return touched && error ? true : false;
  };

  renderErrorMessage = ({ touched, error }) => {
    return touched && error ? error : "";
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
          autoFocus
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
            Sign up
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  type="text"
                  component={this.renderInput}
                  label="Username"
                  fullWidth
                />
              </Grid>
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
              Sign up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "Please enter an username";
  }

  if (!formValues.email) {
    errors.email = "Please enter an email address";
  }

  if (!formValues.password) {
    errors.password = "Please enter a password";
  }

  return errors;
};

const signUpForm = reduxForm({
  form: "signUpForm",
  validate,
})(SignUp);

export default withStyles(useStyles)(signUpForm);
