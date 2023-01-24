// libs
import React, { useEffect, useState } from "react";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";
// import AddIcon from "@material-ui/icons/Add";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-scroll";

// src

// scss
import "./CreateOrEditAudience.scss";
// import { FAETextField } from "@findanexpert-fae/components/dist/stories/FAETextField/FAETextField";
// import { FAERadioGroup } from "@findanexpert-fae/components/dist/stories/FAERadioGroup/FAERadioGroup";
// import { FAEAutoComplete } from "@findanexpert-fae/components/dist/stories/FAEAutoComplete/FAEAutoComplete";
// import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";
import MultiTextField from "../../Components/MultiTextField";
// import Pagination from "../../Components/Pagination";
import { FAETextField } from "../../Components/FAETextField/FAETextField";
import ViewGroupUserRecord from "./ViewGroupUserRecord";
import FAERadioGroup from "../../Components/FAERadioGroup";
// import SnackBar from "../../Components/SnackBar";
// import { Alert } from "@material-ui/lab";
import FAEAutoComplete from "../../Components/FAEAutoComplete";
import FAEDialogueBox from "../../Components/FAEDialogueBox";
import FAEButton from "../../Components/FAEButton";

const CreateOrEditAudience = () => {
  const [countries, setCountries] = useState([]);
  const [groups, setGroups] = useState([]);
  const [singleGroupUsers, setSingleGroupUsers] = useState([]);
  const [groupUsersBeforeSaving, setGroupUsersBeforeSaving] = useState([]);
  const [groupsCount, setGroupsCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [groupToBeUpdated, setGroupToBeUpdated] = useState({});
  const [groupToBeUpdatedId, setGroupToBeUpdatedId] = useState(null);
  const [isGroupToBeUpdated, setIsGroupToBeUpdated] = useState(false);
  const [isSearchGroupUser, setIsSearchGroupUser] = useState(false);
  const [showGroupUsersId, setShowGroupUsersId] = useState(null);
  const [groupToBeDeletedId, setGroupToBeDeletedId] = useState(null);
  // const [errors, setErrors] = useState({
  //   name: "",
  //   nameOperator: "",
  //   email: "",
  //   emailOperator: "",
  //   mobileNumber: "",
  //   mobileNumberOperator: "",
  //   groupName: "",
  // });
  // const [searchGroupData, setSearchGroupData] = useState([]);
  // const [groupData, setGroupData] = useState({});
  // const [country, setCountry] = useState(null);
  const [name, setName] = useState("");
  const [nameOperator, setNameOperator] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailOperator, setEmailOperator] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberOperator, setMobileNumberOperator] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [countryName, setCountryName] = useState({ label: "", value: "" });
  const [gender, setGender] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState("");
  const [isDeleteDialogueBox, setIsDeleteDialogueBox] = useState(false);

  useEffect(() => {
    fetch(`https://newadminapi-dev.findanexpert.net/api/Country`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countrylist);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  useEffect(() => {
    fetch(`https://marketing-dev.findanexpert.net/api/SearchGroup/Groups`, { method: "GET", mode: 'no-cors' })
      .then((response) => response.json())
      .then((data) => setGroups(data.result))
      .catch((err) => console.log(JSON.stringify(err)));
  }, [groupsCount]);

  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangeNameOperator = (value) => {
    setNameOperator(value);
  };
  const handleChangeEmail = (value) => {
    setEmail(value);
  };
  const handleChangeEmailOperator = (value) => {
    setEmailOperator(value);
  };
  const handleChangeMobileNumber = (value) => {
    setMobileNumber(value);
  };
  const handleChangeMobileNumberOperator = (value) => {
    setMobileNumberOperator(value);
  };
  const handleChangeGenderPreference = (value) => {
    setGender(value);
  };
  const handleChangeCountryName = (value) => {
    setCountryName({ label: value, value: value });
  };
  const handleChangeGroupName = (value) => {
    setGroupName(value);
  };

  const handleClearInputFields = (e) => {
    e.preventDefault();
    console.log("CALLED");
    setName("");
    setNameOperator("");
    setGender("");
    setEmail("");
    setEmailOperator("");
    setMobileNumber("");
    setMobileNumberOperator("");
    setCountryName("");
    setGroupName("");
    setNameError("");
    setEmailError("");
    setGroupNameError("");
    setIsGroupToBeUpdated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParameters = [
      {
        parameterName: "firstName",
        parameterValue: name,
        searchOperator: nameOperator,
        defaultOperator: name ? false : true,
      },
      {
        parameterName: "countryName",
        parameterValue: countryName.value,
        searchOperator: "=",
        defaultOperator: countryName.value ? false : true,
      },
      {
        parameterName: "email",
        parameterValue: email,
        searchOperator: emailOperator,
        defaultOperator: email ? false : true,
      },
      {
        parameterName: "mobile",
        parameterValue: mobileNumber,
        searchOperator: mobileNumberOperator,
        defaultOperator: mobileNumber ? false : true,
      },
      {
        parameterName: "gender",
        parameterValue: gender,
        searchOperator: "=",
        defaultOperator: gender ? false : true,
      },
    ];

    const filteredSearchParameters = searchParameters.filter(
      (data) =>
        data.parameterValue !== "" &&
        data.searchOperator !== "" &&
        data.defaultOperator === false
    );

    if (
      (name !== "" && nameOperator === "") ||
      (name === "" && nameOperator !== "")
    ) {
      setNameError("Input Field & Operator are Required");
      return;
    } else {
      setNameError("");
    }

    if (
      (email !== "" && emailOperator === "") ||
      (email === "" && emailOperator !== "")
    ) {
      setEmailError("Input Field & Operator are Required");
      return;
    } else {
      setEmailError("");
    }

    if (
      (mobileNumber !== "" && mobileNumberOperator === "") ||
      (mobileNumber === "" && mobileNumberOperator !== "")
    ) {
      setMobileNumberError("Input Field & Operator are Required");
      return;
    } else {
      setMobileNumberError("");
    }

    if (groupName === "") {
      setGroupNameError("Group name is required");
      return;
    } else {
      setGroupNameError("");
    }

    if (filteredSearchParameters.length === 0) return;

    const groupData = {
      searchGroupName: groupName,
      searchParameters: filteredSearchParameters,
    };

    fetch(
      `https://marketing-dev.findanexpert.net/api/SearchGroup/AddSearchGroup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(groupData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setGroupsCount(groups.length + 1);
        handleClearInputFields(e);
      })
      .catch((err) => console.log(err));
    console.log(groupData);
  };

  const handleShowGroupsUsers = (id) => {
    setIsSearchGroupUser(false);
    setShowGroupUsersId(id);
    fetch(
      `https://marketing-dev.findanexpert.net/api/SearchUsers/SearchUserById/${id}`
    )
      .then((response) => response.json())
      .then((data) => setSingleGroupUsers(data.result))
      .catch((err) => console.log(err));
  };

  const handleGroupToBeUpdated = (e, group) => {
    const { id, searchGroupName, criteria } = group;
    handleClearInputFields(e);
    setIsGroupToBeUpdated(true);
    setGroupToBeUpdatedId(id);
    setGroupName(searchGroupName);
    criteria.map((group) => {
      const { parameterName, parameterValue, searchOperator } = group;
      if (parameterName === "firstName") {
        setName(parameterValue);
        setNameOperator(searchOperator);
      } else if (parameterName === "email") {
        setEmail(parameterValue);
        setEmailOperator(searchOperator);
      } else if (parameterName === "mobile") {
        setMobileNumber(parameterValue);
        setMobileNumberOperator(searchOperator);
      } else if (parameterName === "countryName") {
        setCountryName({ label: parameterValue, value: parameterValue });
      } else if (parameterName === "gender") {
        setGender(parameterValue);
      }
    });

    console.log(groupToBeUpdatedId);
  };

  const handleGroupUpdate = (e) => {
    e.preventDefault();

    const searchParameters = [
      {
        parameterName: "firstName",
        parameterValue: name,
        searchOperator: nameOperator,
        defaultOperator: name ? false : true,
      },
      {
        parameterName: "countryName",
        parameterValue: countryName.value,
        searchOperator: "=",
        defaultOperator: countryName.value ? false : true,
      },
      {
        parameterName: "email",
        parameterValue: email,
        searchOperator: emailOperator,
        defaultOperator: email ? false : true,
      },
      {
        parameterName: "mobile",
        parameterValue: mobileNumber,
        searchOperator: mobileNumberOperator,
        defaultOperator: mobileNumber ? false : true,
      },
      {
        parameterName: "gender",
        parameterValue: gender,
        searchOperator: "=",
        defaultOperator: gender ? false : true,
      },
    ];

    const filteredSearchParameters = searchParameters.filter(
      (data) =>
        data.parameterValue !== "" &&
        data.searchOperator !== "" &&
        data.defaultOperator === false
    );

    if (filteredSearchParameters.length === 0) return;

    if (
      (name !== "" && nameOperator === "") ||
      (name === "" && nameOperator !== "")
    ) {
      setNameError("Input Field & Operator are Required");
      return;
    } else {
      setNameError("");
    }

    if (
      (email !== "" && emailOperator === "") ||
      (email === "" && emailOperator !== "")
    ) {
      setEmailError("Input Field & Operator are Required");
      return;
    } else {
      setEmailError("");
    }

    if (
      (mobileNumber !== "" && mobileNumberOperator === "") ||
      (mobileNumber === "" && mobileNumberOperator !== "")
    ) {
      setMobileNumberError("Input Field & Operator are Required");
      return;
    } else {
      setMobileNumberError("");
    }

    if (groupName === "") {
      setGroupNameError("Group name is required");
      return;
    } else {
      setGroupNameError("");
    }

    const groupData = {
      searchGroupId: groupToBeUpdatedId,
      searchGroupName: groupName,
      searchParameters: filteredSearchParameters,
    };

    fetch(
      `https://marketing-dev.findanexpert.net/api/SearchGroup/UpdateSearchGroup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(groupData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setGroupsCount(groups.length + 1);
        handleClearInputFields(e);
        setIsGroupToBeUpdated(false);
      })
      .catch((err) => console.log(err));
    console.log(groupData);
  };

  const handleGroupToBeDeleted = (id) => {
    fetch(`https://marketing-dev.findanexpert.net/api/SearchGroup/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGroups(groups.filter((group) => group.id !== id));
        setIsDeleteDialogueBox(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSearchGroupUserseforeSaving = (e) => {
    e.preventDefault();
    setIsSearchGroupUser(true);

    const searchParameters = [
      {
        parameterName: "firstName",
        parameterValue: name,
        searchOperator: nameOperator,
        defaultOperator: name ? false : true,
      },
      {
        parameterName: "countryName",
        parameterValue: countryName.value,
        searchOperator: "=",
        defaultOperator: countryName.value ? false : true,
      },
      {
        parameterName: "email",
        parameterValue: email,
        searchOperator: emailOperator,
        defaultOperator: email ? false : true,
      },
      {
        parameterName: "mobile",
        parameterValue: mobileNumber,
        searchOperator: mobileNumberOperator,
        defaultOperator: mobileNumber ? false : true,
      },
      {
        parameterName: "gender",
        parameterValue: gender,
        searchOperator: "=",
        defaultOperator: gender ? false : true,
      },
    ];

    const filteredSearchParameters = searchParameters.filter(
      (data) =>
        data.parameterValue !== "" &&
        data.searchOperator !== "" &&
        data.defaultOperator === false
    );

    if (
      (name !== "" && nameOperator === "") ||
      (name === "" && nameOperator !== "")
    ) {
      setNameError("Input Field & Operator are Required");
      return;
    } else {
      setNameError("");
    }

    if (
      (email !== "" && emailOperator === "") ||
      (email === "" && emailOperator !== "")
    ) {
      setEmailError("Input Field & Operator are Required");
      return;
    } else {
      setEmailError("");
    }

    if (
      (mobileNumber !== "" && mobileNumberOperator === "") ||
      (mobileNumber === "" && mobileNumberOperator !== "")
    ) {
      setMobileNumberError("Input Field & Operator are Required");
      return;
    } else {
      setMobileNumberError("");
    }

    console.log(filteredSearchParameters);

    if (filteredSearchParameters.length > 0) {
      fetch(
        `https://marketing-dev.findanexpert.net/api/SearchUsers/SearchByParameters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(filteredSearchParameters),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGroupUsersBeforeSaving(data.result);
          console.log(data.result);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="create-or-edit-audience-container dpl dpr">
        <div className="create-or-edit-audience-wrapper">
          <FAEDialogueBox
            title="Confirmation"
            content="Are you sure you want to delete the audience group?"
            open={isDeleteDialogueBox}
            buttons={[
              {
                label: "Confirm",
                onClick: () => handleGroupToBeDeleted(groupToBeDeletedId),
              },
              {
                label: "Cancel",
                onClick: () => setIsDeleteDialogueBox(false),
              },
            ]}
          />
          <div className="create-new-audience-container dpt dpb">
            <div className="create-new-audience-wrapper">
              <div className="create-new-audience-header">
                <FAEText>Add Audience</FAEText>
              </div>
              <div className="create-new-audience-body">
                <form className="create-new-audience-form dpt dpb">
                  <div className="create-new-audience-two-column-layout">
                    <div>
                      <p className="login-error-message">
                        {nameError && nameError}
                      </p>
                      <MultiTextField
                        getInputValue={handleChangeName}
                        getSelectValue={handleChangeNameOperator}
                        type="text"
                        inputFieldValue={name ? name : ""}
                        selectFieldValue={nameOperator}
                        placeholder="Name"
                        selectOptions={[
                          {
                            value: "",
                            label: "None",
                          },
                          {
                            value: "=",
                            label: "Equal To",
                          },
                          {
                            value: "Like",
                            label: "Contains",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="login-error-message">
                        {emailError && emailError}
                      </p>

                      <MultiTextField
                        type="text"
                        inputFieldValue={email}
                        selectFieldValue={emailOperator}
                        placeholder="Email"
                        getInputValue={handleChangeEmail}
                        getSelectValue={handleChangeEmailOperator}
                        selectOptions={[
                          {
                            value: "",
                            label: "None",
                          },
                          {
                            value: "=",
                            label: "Equal To",
                          },
                          {
                            value: "Like",
                            label: "Contains",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="create-new-audience-two-column-layout">
                    <div>
                      <p className="login-error-message">
                        {mobileNumberError && mobileNumberError}
                      </p>
                      <MultiTextField
                        type="number"
                        inputFieldValue={mobileNumber}
                        selectFieldValue={mobileNumberOperator}
                        placeholder="Mobile Number"
                        getInputValue={handleChangeMobileNumber}
                        getSelectValue={handleChangeMobileNumberOperator}
                        selectOptions={[
                          {
                            value: "",
                            label: "None",
                          },
                          {
                            value: "=",
                            label: "Equal To",
                          },
                          {
                            value: "Like",
                            label: "Contains",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="login-error-message"></p>
                      <FAEAutoComplete
                        className="create-new-audience-input-field"
                        placeholder="choose country"
                        value={countryName}
                        values={countries.map((country) => ({
                          label: country.name,
                          value: country.name,
                        }))}
                        getSelectedValue={handleChangeCountryName}
                      />
                    </div>
                  </div>
                  <p className="login-error-message"></p>
                  <FAERadioGroup
                    label="Gender"
                    value={gender}
                    values={[
                      {
                        value: "Male",
                        label: "Male",
                      },
                      {
                        value: "Female",
                        label: "Female",
                      },
                    ]}
                    getSelectedValue={handleChangeGenderPreference}
                  />
                  <p className="login-error-message">
                    {groupNameError && groupNameError}
                  </p>
                  <FAETextField
                    getValue={handleChangeGroupName}
                    value={groupName}
                    placeholder="Save As"
                    label="Save As"
                    type="text"
                    className="create-new-audience-input-field"
                    required
                  />
                  <div className="create-new-audience-form-btn dpt">
                    {!isGroupToBeUpdated && (
                      <FAEButton onClick={handleSubmit}>Save</FAEButton>
                    )}
                    {!isGroupToBeUpdated && (
                      <Link to="table-result" spy={true} smooth={true}>
                        <FAEButton onClick={handleSearchGroupUserseforeSaving}>
                          Search
                        </FAEButton>
                      </Link>
                    )}
                    {isGroupToBeUpdated && (
                      <FAEButton onClick={handleGroupUpdate}>Update</FAEButton>
                    )}
                    <FAEButton onClick={handleClearInputFields}>
                      Cancel
                    </FAEButton>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="audience-created-container dpb">
            {groups.map((group) => (
              <p className="audience-created" key={group.id}>
                {group.searchGroupName}
                <span
                  className="audience-created-edit-icon-container"
                  onClick={(e) => handleGroupToBeUpdated(e, group)}
                >
                  <EditOutlinedIcon className="audience-created-edit-icon" />
                </span>
                <Link to="table-result" spy={true} smooth={true}>
                  <span
                    className="audience-created-edit-icon-container"
                    onClick={() => handleShowGroupsUsers(group.id)}
                  >
                    <VisibilityIcon className="audience-created-edit-icon" />
                  </span>
                </Link>
                <span
                  className="audience-created-edit-icon-container"
                  onClick={() => {
                    setIsDeleteDialogueBox(true);
                    setGroupToBeDeletedId(group.id);
                  }}
                >
                  <DeleteIcon className="audience-created-delete-icon" />
                </span>
              </p>
            ))}
          </div>

          {showGroupUsersId !== groupToBeDeletedId ||
            showGroupUsersId === null ||
            groupToBeDeletedId === null ? (
            <div id="table-result">
              <ViewGroupUserRecord
                isSearchGroupUser={isSearchGroupUser}
                data={
                  isSearchGroupUser ? groupUsersBeforeSaving : singleGroupUsers
                }
                rowsPerPage={rowsPerPage}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CreateOrEditAudience;
