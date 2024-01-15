import React, { useState } from "react";
import useMailAPI from "../hooks/useMailApi";
import { toast } from "react-toastify";

const Compose = () => {
  const fromEmail = import.meta.env.VITE_FROM_EMAIL
  const [toEmail, setToEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [textBody, setTextBody] = useState("")
  const {sendEmail} = useMailAPI()

  const handleSend = (e) => {
    e.preventDefault()
    const emailData = {
      from: fromEmail,
      to: toEmail,
      subject,
      textBody
    }
    sendEmail(emailData).then(res => {
      if (res.Message === "OK"){
        toast.success('Message sent!')
      }
    }).catch((error) => {
      toast.error('Message failed!')
    })
  }

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-neutral btn-wide"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Compose
      </button>
      <dialog id="my_modal_1" className="modal z-10">
        <div className="modal-box">
        <h2 className="ml-2 text-base font-medium tracking-wide">New Message</h2>
          <div className="modal-action m-0 py-2">
            <form method="dialog" className="w-full space-y-2">
              <input
                type="text"
                placeholder="To"
                className="input input-bordered input-sm w-full"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered input-sm w-full"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                className="textarea textarea-bordered textarea-sm w-full min-h-60 rounded-box"
                value={textBody}
                onChange={(e) => setTextBody(e.target.value)}
              ></textarea>
              {/* md */}
              <div className="flex gap-2">
                <button type="button" onClick={handleSend} className="btn btn-sm btn-neutral text-base-300">
                  Send
                </button>
                <button className="btn btn-sm">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Compose;
