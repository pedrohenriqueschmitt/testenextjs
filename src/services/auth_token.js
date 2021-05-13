import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import Router from 'next/router'

export const TOKEN_STORAGE_KEY = "DTudo.authToken";

export class AuthToken {
  decodedToken;
  
  
  constructor(token) {
    this.decodedToken = { email: "", exp: 0 };
    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (e) {}
  }

  get expiresAt() {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired() {
    return new Date() > this.expiresAt;
  }

  get isAuthenticated() {
    return !this.isExpired;
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }
  static async storeToken(token, page= "") {
    Cookie.set(TOKEN_STORAGE_KEY, token);
    await Router.push("/"+page);
  }
  static getToken() {
    var t = Cookie.get(TOKEN_STORAGE_KEY);
    return new AuthToken(t);
  }
}
