import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import IMG from "../../Assets/Images/sign_in.png";
import LOGO from "../../Assets/Images/ssvws_logo.jpg";
import { routePaths } from "../../Assets/Data/Routes";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import axios from "axios";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { url } from "../../Address/BaseUrl";
import { Message } from "../../Components/Message";
import { motion } from "framer-motion";
import TDInputTemplateBr from "../../Components/TDInputTemplateBr";

function SigninMis() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user_type_id, setUserTypeId] = useState(0);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");

  const [loginUserDetails, setLoginUserDetails] = useState(() => "");
  useEffect(() => {
    if (user_type_id != 0) {
      setLoading(true);
      axios.get(`${url}/admin/fetch_branch`).then((res) => {
        console.log(res.data);
        setBranches(
          res.data.msg.map((item) => ({
            code: item.branch_code,
            name: item.branch_name,
          }))
        );
        setLoading(false);
      });
    }
  }, [user_type_id]);
  const initialValues = {
    user_id: "",
    password: "",
    // brnch:""
  };

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    console.log(user_type_id == 4, branch != "");
    const creds = {
      emp_id: values?.user_id,
      password: values?.password,
      // brnch:values?.brnch
    };
    if ((user_type_id == 4 || user_type_id==10) && branch != "") {
      await axios
        .post(`${url}/login_app`, creds)
        .then((res) => {
          var userDtls = res?.data?.user_dtls;
          userDtls["brn_code"] =
            user_type_id == 4
              ? branch.toString()
              : res?.data?.user_dtls?.brn_code;
          userDtls["branch_name"] =
            user_type_id == 4
              ? branches.filter((item) => item.code == branch)[0]?.name
              : res?.data?.user_dtls?.branch_name;
          if (res?.data?.suc === 1) {
            // Message("success", res?.data?.msg)
            // setLoginUserDetails(res?.data?.user_dtls)

            localStorage.setItem(
              "user_details",
              // JSON.stringify(res?.data?.user_dtls)
              JSON.stringify(userDtls)
            );

            if (res?.data?.user_dtls?.id == 1) {
              navigate(routePaths.CO_HOME);
            }

            if (res?.data?.user_dtls?.id == 2) {
              navigate(routePaths.BM_HOME);
            }

            if (res?.data?.user_dtls?.id == 3) {
              navigate(routePaths.MIS_ASSISTANT_HOME);
            }

            if (
              res?.data?.user_dtls?.id == 4 ||
              res?.data?.user_dtls?.id == 5 ||
              res?.data?.user_dtls?.id == 10
            ) {
              navigate(routePaths.ADMIN_HOME);
            }
          } else if (res?.data?.suc === 0) {
            Message("error", res?.data?.msg);
          } else {
            Message("error", "No user found!");
          }
        })
        .catch((err) => {
          console.log("PPPPPPPPP", err);
          Message("error", "Some error on server while logging in...");
        });
    } else if (user_type_id != 4 && user_type_id!=10) {
      await axios
        .post(`${url}/login_app`, creds)
        .then((res) => {
          var userDtls = res?.data?.user_dtls;
          userDtls["brn_code"] =
            user_type_id == 4
              ? branch.toString()
              : res?.data?.user_dtls?.brn_code;
          userDtls["branch_name"] =
            user_type_id == 4
              ? branches.filter((item) => item.code == branch)[0]?.name
              : res?.data?.user_dtls?.branch_name;
          if (res?.data?.suc === 1) {
            // Message("success", res?.data?.msg)
            // setLoginUserDetails(res?.data?.user_dtls)

            localStorage.setItem(
              "user_details",
              // JSON.stringify(res?.data?.user_dtls)
              JSON.stringify(userDtls)
            );

            if (res?.data?.user_dtls?.id == 1) {
              navigate(routePaths.CO_HOME);
            }

            if (res?.data?.user_dtls?.id == 2) {
              navigate(routePaths.BM_HOME);
            }

            if (res?.data?.user_dtls?.id == 3) {
              navigate(routePaths.MIS_ASSISTANT_HOME);
            }

            if (
              res?.data?.user_dtls?.id == 4 ||
              res?.data?.user_dtls?.id == 5 ||
              res?.data?.user_dtls?.id == 10
            ) {
              navigate(routePaths.ADMIN_HOME);
            }
          } else if (res?.data?.suc === 0) {
            Message("error", res?.data?.msg);
          } else {
            Message("error", "No user found!");
          }
        })
        .catch((err) => {
          console.log("PPPPPPPPP", err);
          Message("error", "Some error on server while logging in...");
        });
    }
    setLoading(false);
  };
  const validationSchema = Yup.object({
    user_id: Yup.string().required("User ID is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="bg-slate-800 p-16 flex justify-center min-h-screen min-w-screen">
      <div className="bg-white p-20 rounded-3xl flex flex-col gap-8 justify-center items-center">
        <div className="absolute top-32">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            src={LOGO}
            className="h-20"
            alt="Flowbite Logo"
          />
        </div>
        <div className="text-4xl text-center font-bold text-slate-800">
          LOGIN
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center gap-3"
        >
          <div
            style={{
              width: 280,
            }}
          >
            <TDInputTemplateBr
              placeholder="Type employee id..."
              type="text"
              label="Employee ID"
              name="user_id"
              formControlName={formik.values.user_id}
              handleChange={formik.handleChange}
              handleBlur={(e) => {
                setLoading(true);
                formik.handleBlur(e);

                axios
                  .post(`${url}/fetch_emp_type`, { emp_id: e.target.value })
                  .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    setUserTypeId(res.data?.msg[0]?.id);
                    if (res.data?.msg[0]?.id == 10) {
                      axios
                        .post(`${url}/fetch_brn_assign`, {
                          emp_id: e.target.value,
                        })
                        .then((resbrn) => {
                          console.log(resbrn);
						  if(resbrn?.data?.suc==1){

						  setBranches(resbrn?.data?.msg)
						  }
						  if(resbrn?.data?.suc==0){
							setBranches([])

                            Message('error','No branch has been assigned to this user!')
						  }
                        });
                    }
                  });
              }}
              mode={1}
            />
            {formik.errors.user_id && formik.touched.user_id ? (
              <VError title={formik.errors.user_id} />
            ) : null}
          </div>
          <div
            style={{
              width: 280,
            }}
          >
            <TDInputTemplateBr
              placeholder="*****"
              type="password"
              label="Password"
              name="password"
              formControlName={formik.values.password}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              mode={1}
            />
            {formik.errors.password && formik.touched.password ? (
              <VError title={formik.errors.password} />
            ) : null}
          </div>
          {(user_type_id == 4 || user_type_id==10) && (
            <div
              style={{
                width: 280,
              }}
            >
              <TDInputTemplateBr
                placeholder="Choose Branch"
                type="text"
                label="Branch"
                name="brnch"
                formControlName={branch}
                handleChange={(e) => setBranch(e.target.value)}
                mode={2}
                data={branches}
              />
              {(user_type_id == 4 || user_type_id==10) && !branch ? (
                <VError title={"Branch is mandatory"} />
              ) : null}
            </div>
          )}
          <div
            className="flex justify-between gap-5"
            style={{
              width: 280,
            }}
          >
            {/* <Link to={routePaths.SIGN_UP}>
							<p className="text-sm text-[#DA4167] font-bold hover:underline cursor-pointer">
								Sign Up
							</p>
						</Link>
						<Link to={routePaths.FORGOTPASS}>
							<p className="text-sm text-[#DA4167] font-bold hover:underline cursor-pointer">
								Forgot password?
							</p>
						</Link> */}
          </div>
          <Spin
            indicator={<LoadingOutlined spin />}
            size={5}
            className="text-blue-800 w-52 dark:text-gray-400"
            spinning={loading}
          >
            <div
              className="pt-2 pb-1 flex justify-center text-sm"
              style={{
                width: 280,
              }}
            >
              <button
                disabled={!formik.isValid}
                type="submit"
                className="bg-[#DA4167] hover:duration-500 w-full hover:scale-105 text-white p-3 rounded-full"
              >
                Sign In
              </button>
            </div>
          </Spin>
        </form>
      </div>
    </div>
  );
}

export default SigninMis;
