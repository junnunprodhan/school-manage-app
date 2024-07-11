import { FormEvent, useRef } from "react";
import { ButtonField, InputField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { isInvalidObject } from "../../utils/validation";
import { AuthForm } from "../../components/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GENDERS } from "../../constances";

export default function SignupPage() {
  const { ref, handleOnSubmit } = useSignupPage();

  return (
    <AuthForm
      name="Signup"
      footer={{
        name: "Login",
        describtion: "Have an account?",
        href: "/auth/login",
      }}
      onSubmit={handleOnSubmit}
    >
      <InputField
        label="School Name"
        id="schoolName"
        placeholder="ABCD High School"
        required
        ref={ref.schoolName}
      />
      <InputField
        label="Address"
        id="schoolAddress"
        placeholder="Dhaka, Banladesh"
        required
        ref={ref.address}
      />
      <InputField
        label="Date Of Birth"
        id="schoolBrith"
        type="date"
        required
        ref={ref.birth}
      />
      <InputField
        label="Number"
        id="schoolNumber"
        placeholder="+880 12345678912"
        required
        ref={ref.number}
      />
      <InputField
        label="Email"
        id="schoolEmail"
        type="email"
        placeholder="example@email.com"
        required
        ref={ref.email}
      />
      <InputField
        label="Password"
        id="schoolPassword"
        type="password"
        placeholder="*****"
        required
        ref={ref.password}
      />

      <ButtonField type="submit">Signup</ButtonField>
    </AuthForm>
  );
}

function useSignupPage() {
  const auth = useAuth();
  const navigation = useNavigate();
  const ref = {
    schoolName: useRef({} as HTMLInputElement),
    address: useRef({} as HTMLInputElement),
    birth: useRef({} as HTMLInputElement),
    number: useRef({} as HTMLInputElement),
    email: useRef({} as HTMLInputElement),
    password: useRef({} as HTMLInputElement),
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: ref.schoolName.current.value,
      img: "DEFAULT_USER_IMG",
      birth: ref.birth.current.value,
      gender: GENDERS[2].value,
      address: ref.address.current.value,
      number: ref.number.current.value,
      email: ref.email.current.value,
      password: ref.password.current.value,
    };

    if (isInvalidObject(data)) return;

    tauriServices.auth
      .signup(
        data.name,
        data.img,
        data.birth,
        data.gender,
        data.address,
        data.number,
        data.email,
        data.password
      )
      .then((res) => auth.login(res.token))
      .then(() => navigation("/"));
  };

  return { ref, handleOnSubmit };
}
