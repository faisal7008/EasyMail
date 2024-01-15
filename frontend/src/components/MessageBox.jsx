import React, { useEffect, useState } from "react";
import useMailAPI from "../hooks/useMailApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { GoBackIcon } from "../icons/GoBackIcon";
import { TrashIcon } from "../icons/TrashIcon";
import moment from "moment";

const MessageBox = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const { getMessageByID, isLoading } = useMailAPI();
  const [message, setMessage] = useState(null);
  console.log(message);
  useEffect(() => {
    getMessageByID(messageId).then((res) => setMessage(res));
  }, [messageId]);

  return (
    <>
      <div className="p-1 h-full">
        <div className="h-full bg-white rounded-box shadow-lg">
          {isLoading && <Loader />}
          {message && (
            <div className="p-4 flex flex-col gap-2 h-full">
              <div className="h-10 px-2 flex gap-4 justify-between items-center">
                <button onClick={() => navigate(-1)}>
                  <GoBackIcon className={"w-5"} />
                </button>
                <button>
                  <TrashIcon className={"w-5"} />
                </button>
              </div>
              <div className="h-full grow">
                <div className="space-y-3">
                  <div className="text-center text-2xl">{message.Subject}</div>
                  <div className="flex flex-col gap-2 lg:flex-row items-start lg:justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/docs/images/people/profile-picture-5.jpg"
                        alt=""
                      />
                      <div className="font-medium">
                        <div>{message.From}</div>
                        <div className="text-sm text-gray-500">
                          to{" "}
                          <span>
                            {message.To[0].Name || message.To[0].Email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-medium tracking-wide">
                      {moment(message.ReceivedAt).calendar()}
                    </div>
                  </div>

                  {message.HtmlBody ? (
                    <div className="h-[65vh] overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: message.HtmlBody }}
                    />
                  ) : (
                    <div className="p-2">{message.TextBody}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
