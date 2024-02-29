
import React, { useState, useEffect } from 'react'
import { PayPalButton } from "react-paypal-button-v2"
import axios from 'axios'

import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

function Donate() {
  const [amount, setAmount] = useState(0)
  const [done, setDone] = useState(false)
  const [error, setError] = useState()

  const handleApprove = () => {
    setDone(true)
  }

  if (done) {
    alert("Cảm ơn bạn")
    console.log("Cảm ơn bạn")
  }

  if (error) {
    alert(error)
  }

  return (
    <div style={{ marginTop: '200px' }}>
      <h1>Donate</h1>


      <div style={{ marginTop: '200px' }}>

      <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />


        <PayPalButton style={{
          color: "silver",
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill"
        }}

          amount={amount}
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);

            console.log(details.id, details.payer.email_address, details)

            // OPTIONAL: Call your server to save the transaction
            return fetch("http://localhost:5000/api/donate/new", {
              method: "post",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: details.id,
                amount: amount,
                payerEmail: details.payer.email_address,
              })
            });
          }}
          options={{
            clientId: "AfiUbzCDr3ufP6Mr3JYoKIucxDBniL_yhwfG3ZL7PSsA1rZW6NWDoiGC9BaBfXNns5eQC2vPEcT78iy6",
            currency: "USD",
          }}
          onApprove={async (data, action) => {
            handleApprove()
          }}
        // onError={(err) => {
        //   setError(err)
        // }}
        />
       
      </div>
    </div>
  )
}

export default Donate