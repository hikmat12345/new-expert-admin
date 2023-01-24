// libs
import React, { useEffect, useState } from "react";
import FAEButton from "../../Components/FAEButton";
import FAECheckBoxGroup from "../../Components/FAECheckBoxGroup";

// src
import { FAETextField } from "../../Components/FAETextField/FAETextField";

// scss
import "./PushNotification.scss";

const PushNotification = () => {
  const [groups, setGroups] = useState([]);
  const [customizedGroups, setCustomizedGroups] = useState([]);
  const [text, setText] = useState("");
  const [deeplink, setDeeplink] = useState("");
  const [audience, setAudience] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetch(`https://marketing-dev.findanexpert.net/api/SearchGroup/Groups`)
      .then((response) => response.json())
      .then((data) => {
        setGroups(data.result);
        data.result.map((group) => {
          const { id, searchGroupName } = group; // Get Group Name
          fetch(
            `https://marketing-dev.findanexpert.net/api/SearchUsers/SearchUserById/${id}`
          )
            .then((response) => response.json())
            .then((data) => {
              const groupLength = data.result.length;
              const groupData = {
                id: id,
                groupName: searchGroupName,
                users: data.result,
                totalUsers: groupLength,
              };
              setCustomizedGroups((c) => [...c, groupData]);
              //   console.log(customizedGroups);
            })
            .catch((err) => console.log(err));
          //   console.log(id, searchGroupName);
        });
        console.log(data.result);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  useEffect(() => {
    audience.map(({ users }) => setSelectedUsers([...selectedUsers, ...users]));
  }, [audience]);

  // useEffect(() => {
  //   console.log(selectedUsers);
  // }, [selectedUsers]);

  const handleChangeText = (value) => {
    setText(value);
  };
  const handleChangeDeeplink = (value) => {
    setDeeplink(value);
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleChangeAudience = (values) => {
    setAudience(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedUsers.map((user) => {
      const { pushToken, devicePlatform } = user;
      const data = {
        push_token: pushToken,
        title: text,
        body: text,
        device_platform: devicePlatform,
      };
      fetch(
        `https://expertcrmapi-dev.findanexpert.net/api/PushNotification/sendpushnotificationcustomer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    });
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    console.log(formData);

    // fetch(
    // 	'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
    // 	{
    // 		method: 'POST',
    // 		body: formData,
    // 	}
    // )
    // 	.then((response) => response.json())
    // 	.then((result) => {
    // 		console.log('Success:', result);
    // 	})
    // 	.catch((error) => {
    // 		console.error('Error:', error);
    // 	});
  };

  return (
    <>
      <div className="push-notification-container dpl dpr">
        <div className="push-notification-wrapper">
          <div className="push-notification-inner-container dpt dpb">
            <div className="push-notification-inner-wrapper">
              <div className="push-notification-header">
                <p>Push Notification</p>
              </div>
              <div className="push-notification-body">
                <form
                  className="push-notification-form dpt dpb"
                  onSubmit={handleSubmit}
                >
                  <FAETextField
                    getValue={handleChangeText}
                    // value={isGroupToBeUpdated ? groupName : ""}
                    // value={groupName === "" ? "groupName" : "No"}
                    value={text}
                    placeholder="Text"
                    label="Text"
                    type="text"
                    className="push-botification-input-field"
                    required
                  />
                  <FAETextField
                    getValue={handleChangeDeeplink}
                    // value={isGroupToBeUpdated ? groupName : ""}
                    // value={groupName === "" ? "groupName" : "No"}
                    // value={groupName}
                    placeholder="Deeplink"
                    label="Deeplink"
                    type="text"
                    className="push-botification-input-field"
                    // required
                  />
                  {/* <div className="push-notification-file-upload-container dpt">
                    <label
                      htmlFor="push-notification-file-upload"
                      className="push-notification-file-upload"
                    >
                      File Upload
                    </label>
                    <input
                      type="file"
                      id="push-notification-file-upload"
                      name="file"
                      onChange={changeHandler}
                    />
                    {isFilePicked ? (
                      <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                          lastModifiedDate:{" "}
                          {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <p>Select a file to show details</p>
                    )}
                    <button onClick={handleSubmission}>Submit</button>
                  </div> */}
                  <div className="push-notification-audience">
                    <FAECheckBoxGroup
                      label="Audience"
                      getSelectedValues={handleChangeAudience}
                      className="push-botification-checkbox-field"
                      values={customizedGroups?.map((group) => ({
                        value: group.groupName,
                        label: group.groupName,
                        users: group.users,
                        count: group.totalUsers,
                      }))}
                    />
                    <div className="push-notification-audience-total">
                      <p>Total</p>
                      {audience.reduce((n, { count }) => n + count, 0)}
                    </div>
                  </div>
                  <div className="push-notification-button dpt">
                    <FAEButton>Send Notification</FAEButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PushNotification;
