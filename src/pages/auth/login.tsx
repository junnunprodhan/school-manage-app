import { FormEvent, useRef, useState } from "react";
import {
  ButtonField,
  InputField,
  SelectField,
} from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { isInvalidObject } from "../../utils/validation";
import { AuthForm } from "../../components/auth";
import { USER_TYPES } from "../../constances";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { userType, setUserType, ref, handleOnSubmit } = useLoginPage();

  return (
    <AuthForm
      name="Login"
      footer={{
        name: "Signup",
        describtion: "Havn't any account?",
        href: "/auth/signup",
      }}
      onSubmit={handleOnSubmit}
    >
      <SelectField
        label="User Type"
        id="userType"
        options={USER_TYPES}
        onChange={(e) => setUserType(e.currentTarget.value)}
        ref={ref.userType}
        hidden
      />

      <InputField
        label="School ID"
        id="schoolId"
        placeholder="0001"
        ref={ref.schoolId}
        hidden
      />

      {userType === "admin" ? (
        <>
          <InputField
            label="Password"
            id="password"
            placeholder="*****"
            required
            ref={ref.password}
          />
        </>
      ) : (
        <>
          <InputField
            label="Email"
            id="email"
            placeholder="example@email.com"
            required
            ref={ref.email}
          />
          <InputField
            label="Password"
            id="password"
            placeholder="*****"
            required
            ref={ref.password}
          />
        </>
      )}

      <ButtonField type="submit">Submit</ButtonField>
    </AuthForm>
  );
}

function useLoginPage() {
  const auth = useAuth();
  const navigation = useNavigate();
  const [userType, setUserType] = useState("ADMIN");
  const ref = {
    userType: useRef({} as HTMLSelectElement),
    schoolId: useRef({} as HTMLInputElement),
    email: useRef({} as HTMLInputElement),
    password: useRef({} as HTMLInputElement),
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      userType: ref.userType.current.value,
      schoolId: Number(ref.schoolId.current.value),
      email: ref.email.current.value,
      password: ref.password.current.value,
    };

    if (isInvalidObject(data)) return;

    tauriServices.auth
      .login(data.userType, data.schoolId, data.email, data.password)
      .then((data) => auth.login(data.token))
      .then(() => navigation("/"));
  };

  return { userType, setUserType, ref, handleOnSubmit };
}
