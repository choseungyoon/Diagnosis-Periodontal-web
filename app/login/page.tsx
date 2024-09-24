import { Img } from "@/components/Img";

export default function LoginPage() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-indigo-900 bg-[url(/images/login/img_bg_login.png)] bg-cover bg-no-repeat py-[308px] ">
      <div className="container-md flex justify-center px-12">
        <div className="flex w-[26%] flex-col">
          <Img
            src="img_header_logo.png"
            width={200}
            height={30}
            className="mx-20 h-[30px] object-cover"
          ></Img>
          <div className="">
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-sm mb-2 block font-sans text-white-a700">
                  Login
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#0081BF]"
                    placeholder="Enter email or phone number"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="font-sans text-white-a700 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#0081BF]"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-[#0081BF] focus:ring-[#0081BF]] border-gray-300 rounded"
                  />
                  <label className="ml-3 block text-sm font-sans text-white-a700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="hover:underline font-semibold font-sans text-white-a700"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide font-sans text-white-a700 rounded-lg text-white bg-[#0081BF] hover:bg-[#8dc8e3] focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <div>
                <hr />
              </div>
              <p className="text-white-a700 font-sans text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <a
                  href="javascript:void(0);"
                  className="text-[#0081BF] font-sans hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Sign up now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
