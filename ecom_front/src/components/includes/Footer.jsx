import React, { useState } from 'react';

const Footer = ({ propsBackground }) => {


  return (
    <footer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#15202B" fillOpacity="1" d="M0,192L34.3,197.3C68.6,203,137,213,206,218.7C274.3,224,343,224,411,213.3C480,203,549,181,617,186.7C685.7,192,754,224,823,240C891.4,256,960,256,1029,256C1097.1,256,1166,256,1234,224C1302.9,192,1371,128,1406,96L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>


      <section className='bgColor2'>

        <div className='flex justify-around mb-10'>
          <div>
            <h2 className='mb-5 text-white text-3xl font-bold sm:font-semibold'>Liens utiles</h2>
            <ul className="rounded-lg w-96 text-white">
              <li className="px-6 py-2 w-full">An item</li>
              <li className="px-6 py-2 w-full">A second item</li>
              <li className="px-6 py-2 w-full">A third item</li>
              <li className="px-6 py-2 w-full">A fourth item</li>
              <li className="px-6 py-2 w-full">And a fifth one</li>
            </ul>
          </div>
          <div>
            <h2 className='mb-5 text-white text-3xl font-bold'>Informations légales</h2>
            <ul className="rounded-lg w-96 text-white">
              <li className="px-6 py-2 w-full">Conditions Générales de Vente</li>
              <li className="px-6 py-2 w-full">Conditions Générales d’Utilisation Marketplace</li>
              <li className="px-6 py-2 w-full">Référencement et classement des offres</li>
              <li className="px-6 py-2 w-full">Protection de la vie privée et cookies</li>
              <li className="px-6 py-2 w-full rounded-b-lg">Mentions légales</li>
            </ul>
          </div>
        </div>
        <div className="text-white text-center p-4">
          © 2022 Copyright :
          <a className='' href="https://clementpaquentin.me/" target="_BLANK" rel="noreferrer"> Clementpaquentin.me</a>
        </div>
      </section>

    </footer>
  );
};

export default Footer;