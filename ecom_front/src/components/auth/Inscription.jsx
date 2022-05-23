import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {

  const inputCss = "appearance-none block w-2/4 bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const navigation = useNavigate();
  const [pass, setPass] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const [emailExist, setEmailExist] = useState("");

  //data form
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {

    password !== confirmPassword ? setPass(true) : setPass(false);
  }, [password, confirmPassword])


  const handleForm = (e) => {
    e.preventDefault();

    if (!pass) {

      axios.post("https://localhost:8000/api/customer", {

        name,
        firstName,
        email,
        password,
        address,
        city,
        postalCode,
        tel,
      }).then((res) => {

        if ((typeof res.data.violations !== 'undefined') && (res.data.violations.length > 0)) {

          setError(res.data.violations);
          setEmailExist("");
        } else if (res.data === "Cette email est déjà utilisée") {

          setError([]);
          setEmailExist(res.data);
        } else {

          setEmailExist("");
          setError([]);
          setPass(false);
          setData(res.data);

          setName("");
          setFirstName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setAddress("");
          setCity("");
          setPostalCode("");
          setTel("");

          localStorage.setItem('user', res.data.uuid);
          navigation('/');

        }
      }).catch((error) => {

        console.log(error);
      })
    }

  }

  return (
    <form onSubmit={handleForm} className='w-full flex flex-col items-center justify-center relative'>
      {emailExist &&

        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-3" role="alert">
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
          <p>{emailExist}</p>
        </div>
      }

      <h2 className='text-4xl text-white mb-16'>Inscription</h2>

      {(pass || error.length > 0) &&
        <div className="bg-red-500 border border-red-500 text-white px-4 py-3 rounded relative mb-3 flex flex-col text-xs" role="alert">

          {error.map((target) => {

            return <span key={target.title} className="block sm:inline my-1">- {target.title}</span>
          })}
          {(pass) && <span className="block sm:inline my-1">- Les mots de passe ne correspondent pas</span>}
        </div>
      }


      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputCss} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={!pass ? inputCss : "border-2 border-red-700 " + inputCss} required />
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className={!pass ? inputCss : "border-2 border-red-700 " + inputCss} />

      <h3 className='text-xl  my-5 text-white text-left'>Yours informations</h3>

      <div className='flex justify-between w-2/4'>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="first name" className={inputCss} />
        <span className='mx-1.5'></span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="last name" className={inputCss} />
      </div>

      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address" className={inputCss} />

      <div className='flex justify-between w-2/4'>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="cod post" className={inputCss} />
        <span className='mx-1.5'></span>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputCss} />
      </div>

      <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="telephone" className={inputCss} />

      <button type='submit' className={btnCss}>
        <span className='mr-2 align-middle text-xl'><ion-icon name="open"></ion-icon></span>Inscription
      </button>
    </form >
  );
};

export default Inscription;