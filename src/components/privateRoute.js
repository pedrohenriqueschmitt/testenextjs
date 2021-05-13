  
import ServerCookie from "next-cookies";
import Router from "next/router";
import React, { Component } from "react";
import { AuthToken, TOKEN_STORAGE_KEY } from "../services/auth_token";

export var AuthProps = {
  auth: AuthToken
}

export function privateRoute(WrappedComponent) {
  return class extends Component {

    static async getInitialProps(ctx) {
      
      const token = ServerCookie(ctx)[TOKEN_STORAGE_KEY];
      const auth = new AuthToken(token);
      const initialProps = { auth };
      if (auth.isExpired) {
        ctx.res.writeHead(302, {
          Location: "/login?redirected=true",
        });
        ctx.res.end();
      }
      if (WrappedComponent.getInitialProps) return WrappedComponent.getInitialProps(initialProps);
      return initialProps;
    }

    get auth() {
      // the server pass to the client serializes the token
      // so we have to reinitialize the authToken class
      //
      // @see https://github.com/zeit/next.js/issues/3536
      return new AuthToken(this.props.auth.token);
    }

    render() {
      return <WrappedComponent auth={this.auth} {...this.props} />;
    }
  };
}