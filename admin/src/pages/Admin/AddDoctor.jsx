// import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [experience, setExperience] = useState("1 Year");
//   const [fees, setFees] = useState("");
//   const [speciality, setSpeciality] = useState("General Physician");
//   const [degree, setDegree] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [about, setAbout] = useState("");

//   const { backendurl, admintoken } = useContext(AdminContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!docImg) {
//         return toast.error("Image not selected");
//       }
//       const formData = new FormData();
//       formData.append("image", docImg);
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("experience", experience);
//       formData.append("fees", Number(fees));
//       formData.append("speciality", speciality);
//       formData.append("degree", degree);
//       formData.append(
//         "address",
//         JSON.stringify({ lin1: address1, line2: address2 })
//       );
//       formData.append("about", about);

//       // console log form data
//       formData.forEach((value, key) => {
//         console.log(`${key}:${value}`);
//       });

//       const { data } = await axios.post(
//         backendurl + "/api/admin/add-doctor",
//         formData,
//         { headers: { admintoken } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         setDocImg(false);
//         setName("");
//         setEmail("");
//         setPassword("");
//         setExperience("1 Year");
//         setFees("");
//         setSpeciality("General Physician");
//         setDegree("");
//         setAddress1("");
//         setAddress2("");
//         setAbout("");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="m-5 w-full">
//       <p className="mb-3 text-lg font-medium">Add Doctor</p>
//       <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
//         <div className="flex items-center gap-4 mb-8 text-gray-800">
//           <label htmlFor="doc-img">
//             <img
//               className="w-16 bg-gray-100 rounded-full cursor-pointer"
//               src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
//               alt="Doctor Image Upload Preview"
//             />
//           </label>
//           <input
//             type="file"
//             id="doc-img"
//             hidden
//             onChange={(e) => setDocImg(e.target.files[0])}
//           />
//           <p>
//             Upload doctor <br /> picture
//           </p>
//         </div>
//         <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
//           <div>
//             <div>
//               <p>Doctor Name</p>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Name"
//               />
//             </div>
//             <div>
//               <p>Doctor Email</p>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Email"
//               />
//             </div>
//             <div>
//               <p>Doctor Password</p>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Password"
//               />
//             </div>
//             <div>
//               <p>Experience</p>
//               <select
//                 id="experience"
//                 name="experience"
//                 required
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//               >
//                 {Array.from({ length: 30 }, (_, i) => (
//                   <option key={i + 1} value={`${i + 1} Year`}>
//                     {i + 1} Year
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <p>Fees</p>
//               <input
//                 type="number"
//                 min="0"
//                 placeholder="100"
//                 required
//                 value={fees}
//                 onChange={(e) => setFees(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Fees"
//               />
//             </div>
//           </div>
//           <div>
//             <div>
//               <p>Speciality</p>
//               <select
//                 id="speciality"
//                 name="speciality"
//                 required
//                 value={speciality}
//                 onChange={(e) => setSpeciality(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//               >
//                 {[
//                   "General Physician",
//                   "Gynocologist",
//                   "Dermatologist",
//                   "Pediatricians",
//                   "Neurologist",
//                   "Gastroentologist",
//                 ].map((specialty, index) => (
//                   <option key={index} value={specialty}>
//                     {specialty}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <p>Education</p>
//               <input
//                 type="text"
//                 placeholder="Education"
//                 required
//                 value={degree}
//                 onChange={(e) => setDegree(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Education"
//               />
//             </div>
//             <div>
//               <p>Address</p>
//               <input
//                 type="text"
//                 placeholder="Address Line 1"
//                 required
//                 value={address1}
//                 onChange={(e) => setAddress1(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Address Line 1"
//               />
//               <input
//                 type="text"
//                 placeholder="Address Line 2"
//                 value={address2}
//                 onChange={(e) => setAddress2(e.target.value)}
//                 className="border border-gray-300 rounded p-2 w-full mt-1"
//                 aria-label="Doctor Address Line 2"
//               />
//             </div>
//           </div>
//         </div>
//         <div>
//           <p>About Doctor</p>
//           <textarea
//             placeholder="Write about doctor"
//             rows={5}
//             required
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full mt-1"
//             aria-label="About Doctor"
//           />
//         </div>
//         <button
//           type="submit"
//           className="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark"
//         >
//           Add Doctor
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;

import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendurl, admintoken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      const { data } = await axios.post(
        backendurl + "/api/admin/add-doctor",
        formData,
        { headers: { admintoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-6 py-6 sm:px-8 sm:py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 text-gray-800 flex-wrap">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-14 sm:w-16 bg-gray-100 rounded-full"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor Image Upload Preview"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p className="text-sm sm:text-base text-gray-600">
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-wrap gap-6 lg:flex-nowrap lg:gap-10 text-gray-600">
          <div className="w-full lg:w-1/2">
            <div>
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Name"
              />
            </div>
            <div>
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Email"
              />
            </div>
            <div>
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Password"
              />
            </div>
            <div>
              <p>Experience</p>
              <select
                id="experience"
                name="experience"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Fees</p>
              <input
                type="number"
                min="0"
                placeholder="100"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Fees"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div>
              <p>Speciality</p>
              <select
                id="speciality"
                name="speciality"
                required
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
              >
                {[
                  "General Physician",
                  "Gynocologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroentologist",
                ].map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Education"
              />
            </div>
            <div>
              <p>Address</p>
              <input
                type="text"
                placeholder="Address Line 1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Address Line 1"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1"
                aria-label="Doctor Address Line 2"
              />
            </div>
          </div>
        </div>
        <div>
          <p>About Doctor</p>
          <textarea
            placeholder="Write about doctor"
            rows={5}
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mt-1"
            aria-label="About Doctor"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark w-full sm:w-auto"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
