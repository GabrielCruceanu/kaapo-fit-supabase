import { useState } from "react";
import { supabase } from "#/utils/supabase";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { router } from "next/client";

const enum AuthType {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    type: AuthType,
    email: string,
    password: string
  ) => {
    try {
      const {
        data: { user },
        error,
      } =
        type === AuthType.SIGN_IN
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });
      if (!error && !user) alert("Check your email for the login link!");
      if (error) console.log("Error returned: ", error.message);
    } catch (error: any) {
      console.log("Error thrown:", error.message);
      alert(error.error_description || error);
    }
    router.push("/user");
  };

  async function forgotPassword(e: { preventDefault: () => void }) {
    e.preventDefault();
    let email = prompt("Please enter your email:");
    if (email === null || email === "") {
      window.alert("You must enter your email.");
    } else {
      let { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.log("Error: ", error.message);
      } else {
        alert("Password recovery email has been sent.");
      }
    }
  }

  async function signOut(event: any) {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (error) console.log("error", error);
  }

  return (
    <section className="flex h-full w-full items-center justify-center p-16">
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            placeholder="jon@email.com"
            required={true}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="*********"
            required={true}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLogin(AuthType.SIGN_IN, email, password);
          }}
          className="mb-4"
        >
          Sign in
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLogin(AuthType.SIGN_UP, email, password);
          }}
        >
          Sign up
        </Button>
      </div>
    </section>
  );
};

export default Auth;
