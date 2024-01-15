import useMailAPI from "../hooks/useMailApi";
import moment from "moment/moment";
import Loader from "./Loader";
import { TrashIcon } from "../icons/TrashIcon";

const MailBox = () => {
  const { messages, isLoading } = useMailAPI();

  return (
    <div className="p-1 h-full">
      <div className="h-full bg-white rounded-box shadow-lg">
        {isLoading && <Loader />}
        {messages && (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-12">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th className="w-1/4">
                    
                  </th>
                  <th className="w-max">
                    <div className="flex items-center justify-end">
                      <button type="button"><TrashIcon className={"w-5"}/></button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages?.map((message) => (
                  <tr
                    key={message.MessageID}
                    className=" cursor-pointer hover:bg-base-100"
                  >
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>{message.From}</td>
                    <td>
                      <div>
                        <div className="font-semibold">{message.Subject}</div>
                        <div className="text-sm opacity-50">
                          {moment(message.ReceivedAt).calendar()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailBox;
