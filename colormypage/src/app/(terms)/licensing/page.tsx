import React from 'react';
import Link from 'next/link';

const LicensingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 my-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Licensing Policy</h1>

      <p className="mb-4">
        All of our complimentary downloads on our website are exclusively for personal, non-commercial, and educational usage. Visitors are not permitted to redistribute, sell, or use any of the printables from <strong>ColorMyPage.com</strong> for profit or commercial purposes.
      </p>

      <p className="mb-4">
        All of our downloads adhere to the following license agreement and terms of use:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">ColorMyPage Personal Use License Agreement & Terms of Use</h2>

      <p className="mb-4">
        The following License Terms (“The Agreement”) outline the rights and responsibilities concerning the utilization of any digital content (“Items”). Please read The Agreement before downloading or using any Items.
      </p>

      <p className="mb-4">
        By downloading, purchasing, or using an Item, you agree to comply with the following license terms and conditions. The owners of <strong>ColorMyPage.com</strong> reserve the right to amend these licensing terms of use at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">License Terms</h2>

      <ul className="list-disc ml-6 space-y-2 mb-4">
        <li>You are granted unrestricted permissions for your own personal use, where you do not generate income, profit, or personal gain from the utilization of the Items downloaded or purchased at <strong>ColorMyPage.com</strong>.</li>
        <li>You <strong>may not sublicense, resell, share, transfer, or otherwise redistribute</strong> the Item, whether for free or for a price.</li>
        <li>You <strong>may not use Items for crafting products for resale, commercial use, logo design, or claim copyright or trademark rights</strong> to the Items in any manner.</li>
        <li>All Items are provided “as is” without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of non-infringement, merchantability, or fitness for a specific purpose.</li>
        <li>Neither the artists nor <strong>ColorMyPage.com</strong> guarantees that the Item will meet your requirements or intended use. You assume the complete risk as to the quality, performance, and usage of the products and services accessible at <strong>ColorMyPage.com</strong>.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions about this licensing agreement, please contact us at <Link href="/contact" className="text-blue-600 underline">Contact Us</Link>.
      </p>
    </div>
  );
};

export default LicensingPolicy;
