"use client";

import { auth } from "./firebaseClient";
import { setCookie, deleteCookie } from "cookies-next";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// REGISTER USER
export async function registerUser(email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    setCookie("auth_token", token, {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false, // must be false for localhost
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// LOGIN USER
export async function loginUser(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    setCookie("auth_token", token, {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// LOGOUT
export async function logoutUser() {
  try {
    await signOut(auth);
    deleteCookie("auth_token", { path: "/" });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
